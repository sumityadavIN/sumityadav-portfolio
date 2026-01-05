export const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const fragmentShader = `
    uniform sampler2D utexture;
    uniform vec2 uResolution;
    uniform vec2 utextureSize;
    uniform vec2 uMouse;
    uniform float uParallaxStrength;
    uniform float uDistortionMultiplier;
    uniform float uGlassStrength;
    uniform float uStripesFrequency;
    uniform float uGlassSmoothness;
    uniform float uEdgePadding;

    varying vec2 vUv;

    vec2 getCoverUV(vec2 uv, vec2 textureSize) {
        if (textureSize.x < 1.0 || textureSize.y < 1.0) return uv;
        
        vec2 s = uResolution / textureSize;
        float scale = max(s.x, s.y);

        vec2 scaledSize = textureSize * scale;
        vec2 offset = (uResolution - scaledSize) * 0.5;

        return (uv * uResolution - offset) / scaledSize;
    }

    float displacement(float x, float num_stripes, float strength) {
        float modulus = 1.0 / num_stripes;
        return mod(x, modulus) * strength;
    }

    float fractalGlass(float x) {
        float d = 0.0;
        for (int i = 1; i <= 5; i++) {
            float freq = float(i) * uStripesFrequency;
            float amp = uGlassStrength / float(i);
            d += sin(x * freq + float(i) * uGlassSmoothness) * amp;
        }
        return x + d * 0.01;
    }
    
    float smoothEdge(float x, float padding) {
        float edge = padding;
        if (x < edge) {
            return smoothstep(0.0, edge, x);
        } else if (x > 1.0 - edge) {
            return smoothstep(1.0, 1.0 - edge, x);
        } 
        return 1.0;
    }
    
    void main() {
        vec2 uv = vUv;

        float originalX = uv.x;
        float edgeFactor = smoothEdge(originalX, uEdgePadding);
        
        float distortedX = fractalGlass(originalX);
        uv.x = mix(originalX, distortedX, edgeFactor);

        float distortionFactor = uv.x - originalX;
        float parallaxDirection = -sign(0.5 - uMouse.x);

        vec2 parallaxOffset = vec2(
            parallaxDirection * abs(uMouse.x - 0.5) * uParallaxStrength * (1.0 + abs(distortionFactor) * uDistortionMultiplier), 
            0.0
        );

        parallaxOffset *= edgeFactor;
        uv += parallaxOffset;

        vec2 coverUV = getCoverUV(uv, utextureSize);
        coverUV = clamp(coverUV, 0.0, 1.0);
        
        vec4 color = texture2D(utexture, coverUV);
        gl_FragColor = color;
    }
`;