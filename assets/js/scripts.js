document.addEventListener("DOMContentLoaded", function() {

    // --- SMOOTH SCROLLING (Lenis) ---
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            smooth: true,
            mouseMultiplier: 1,
        });
        window.lenis = lenis;
    }

    // --- TEXT REVEAL & BLUR EFFECT ---
    // Select elements that have either class
    const animTextContainers = document.querySelectorAll('.reveal-slide, .blurunblur');
    const animTextState = [];

    // 1. Split Text & Cache
    animTextContainers.forEach(container => {
        const originalText = container.textContent.trim();
        container.setAttribute("aria-label", originalText);
        
        const nodes = [...container.childNodes];
        container.innerHTML = "";
        const charsData = [];
        let wordIndex = 0;
        
        // Check which effects are enabled for this container
        const useStagger = container.classList.contains('reveal-slide');
        const useBlur = container.classList.contains('blurunblur');

        nodes.forEach(node => {
            if (node.nodeType === 3) { // Text Node
                const words = node.textContent.split(/(\s+)/);
                words.forEach(word => {
                    if (word.match(/^\s+$/)) {
                        container.appendChild(document.createTextNode(word));
                    } else {
                        const wordSpan = document.createElement("span");
                        wordSpan.style.display = "inline-block";
                        wordSpan.style.whiteSpace = "nowrap";
                        
                        [...word].forEach(char => {
                            const span = document.createElement("span");
                            span.className = "phil-char";
                            span.textContent = char;
                            wordSpan.appendChild(span);
                            charsData.push({ element: span, wordIndex: wordIndex });
                        });
                        container.appendChild(wordSpan);
                        wordIndex++;
                    }
                });
            } else {
                container.appendChild(node.cloneNode(true));
            }
        });

        animTextState.push({
            container: container,
            charsData: charsData,
            useStagger: useStagger,
            useBlur: useBlur
        });
    });
    
    function animateTextReveal() {
        const viewportHeight = window.innerHeight;

        // READ PHASE: Calculate all blurs first to avoid layout thrashing
        const updates = [];

        animTextState.forEach(({ container, charsData, useStagger, useBlur }) => {
            const containerRect = container.getBoundingClientRect();
            // Skip if container is completely out of view
            if (containerRect.bottom < 0 || containerRect.top > viewportHeight) return;

            charsData.forEach(({ element, wordIndex }) => {
                // Calculate char position relative to viewport
                // We use offsetTop (relative to container) + container's current top
                const charTop = containerRect.top + element.offsetTop;
                const charCenter = charTop + (element.offsetHeight / 2);
                
                // Normalize Y position (0 = top of screen, 1 = bottom of screen)
                const y = charCenter / viewportHeight;

                // Add Stagger if enabled
                let effectiveY = y;
                if (useStagger) {
                    const stagger = wordIndex * 0.005; 
                    effectiveY += stagger;
                }
                
                // Calculate Fade Factor (0 = visible, 1 = hidden)
                let fadeFactor = 0;

                //if (effectiveY < 0.1) {
                //    // Top 10%
                //    fadeFactor = (0.1 - effectiveY) / 0.1;
                //} else if (effectiveY > 0.50) {
                //    // Bottom: Finish by 50% (Center of screen)
                //    fadeFactor = (effectiveY - 0.50) / 0.35;
                //}
		if (effectiveY < 0) {
		    // Keep it visible at the top (0)
		    fadeFactor = 0;
		} else if (effectiveY > 0.65) {
		    // Start fading out slightly later (at 65% down the screen)
		    fadeFactor = (effectiveY - 0.65) / 0.35;
		}
                // Clamp
                fadeFactor = Math.min(Math.max(fadeFactor, 0), 1);

                // Apply Blur if enabled
                let blurAmount = 0;
                if (useBlur) {
                    blurAmount = fadeFactor * 20;
                }

                // Opacity always follows the fade factor (reveal effect)
                let opacity = 1 - fadeFactor;

                // Slide Effect: 20px down when hidden, 0px when visible
                let translateY = 0;
                if (useStagger) {
                    translateY = fadeFactor * 20;
                }

                updates.push({ element, blurAmount, opacity, translateY });
            });
        });

        // WRITE PHASE: Apply styles
        updates.forEach(({ element, blurAmount, opacity, translateY }) => {
            element.style.filter = `blur(${blurAmount}px)`;
            element.style.opacity = opacity;
            element.style.transform = `translate3d(0, ${translateY}px, 0)`;
        });
    }

    // --- WORK SECTION PARALLAX (Lazy Load & Visibility) ---
    const workSection = document.querySelector('.work-section');
    const workBg = document.querySelector('.work-bg-fixed');
    const workImg = document.querySelector('.work-img-fixed');

    if (workSection && workBg && workImg) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Load image if not loaded
                    if (!workImg.getAttribute('src') && workImg.dataset.src) {
                        workImg.src = workImg.dataset.src;
                    }
                    workBg.classList.add('is-visible');
                } else {
                    workBg.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.001 // Trigger when 0.1% is visible
        });
        observer.observe(workSection);
    }

    // --- GLOBAL ANIMATION LOOP ---
    // Runs regardless of whether Lenis is present
    function raf(time) {
        if (lenis) {
            lenis.raf(time);
        }
        
        animateTextReveal();

        if (window._rafCallbacks) {
            window._rafCallbacks.forEach((cb) => cb(time));
        }
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- TOP button in footer ---
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".footer-top-link");
  if (!btn) return;

  if (window.lenis) {
    window.lenis.scrollTo(0, {
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3)
    });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

});