import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js";
import { vertexShader, fragmentShader } from "./shaders.js";

const config = {
    lerpFactor: 0.035,
    parallaxStrength: 0.1,
    distortionMultiplier: 10,
    glassStrength: 2.0,
    glassSmoothness: 0.0001,
    stripesFrequency: 300,
    edgePadding: 0.1,
};

const container = document.querySelector(".hero-image-wrapper");
const imageElement = document.getElementById("glassTexture");

if (!container || !imageElement) {
    console.error('Parallax: Required elements not found');
    throw new Error('Container or image element not found');
}

const rect = container.getBoundingClientRect();

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(rect.width, rect.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const mouse = { x: 0.5, y: 0.5 };
const targetMouse = { x: 0.5, y: 0.5 };

const lerp = (start, end, factor) => start + (end - start) * factor;

const material = new THREE.ShaderMaterial({
    uniforms: {
        utexture: { value: null },
        uResolution: { value: new THREE.Vector2(rect.width, rect.height) },
        utextureSize: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(mouse.x, mouse.y) },
        uParallaxStrength: { value: config.parallaxStrength },
        uDistortionMultiplier: { value: config.distortionMultiplier },
        uGlassStrength: { value: config.glassStrength },
        uStripesFrequency: { value: config.stripesFrequency },
        uGlassSmoothness: { value: config.glassSmoothness },
        uEdgePadding: { value: config.edgePadding },
    },
    vertexShader,
    fragmentShader,
});

const geometry = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function loadImage() {
    if (!imageElement.complete) {
        imageElement.onload = loadImage;
        return;
    }

    const texture = new THREE.Texture(imageElement);
    const textureWidth = imageElement.naturalWidth || imageElement.width;
    const textureHeight = imageElement.naturalHeight || imageElement.height;

    texture.needsUpdate = true;
    material.uniforms.utexture.value = texture;
    material.uniforms.utextureSize.value.set(textureWidth, textureHeight);
}

if (imageElement.complete) {
    loadImage();
} else {
    imageElement.onload = loadImage;
}

window.addEventListener("mousemove", (e) => {
    targetMouse.x = e.clientX / window.innerWidth;
    targetMouse.y = 1.0 - e.clientY / window.innerHeight;
});

window.addEventListener("resize", () => {
    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    material.uniforms.uResolution.value.set(rect.width, rect.height);
});

function animate() {
    requestAnimationFrame(animate);

    mouse.x = lerp(mouse.x, targetMouse.x, config.lerpFactor);
    mouse.y = lerp(mouse.y, targetMouse.y, config.lerpFactor);
    material.uniforms.uMouse.value.set(mouse.x, mouse.y);

    renderer.render(scene, camera);
}

animate();
