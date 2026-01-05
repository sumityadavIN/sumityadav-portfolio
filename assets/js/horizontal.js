document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".horizontal-section");
    const container = document.querySelector(".horizontal-scroll-container");

    if (section && container) {

        let isTicking = false;

        // --- COLORS CONFIG ---
        // Start: Almost Black (#050505)
        // End: Deep Wine Red (#3a0005) or Dark Grey (#1a1a1a)
        // You can change "endColor" to whatever matches your vibe
        const startColor = { r: 5, g: 5, b: 5 };
        const endColor = { r: 58, g: 0, b: 5 }; // Deep Dark Red

        // --- DIMENSIONS ---
        // We'll store these to share between init and animate
        let timelineParams = {
            distanceToTravel: 0,
            lockBuffer: 0,
            startX: 0,
            endX: 0
        };

        const initDimensions = () => {
            if (window.innerWidth <= 900) {
                section.style.height = 'auto';
                return;
            }

            const startX = window.innerWidth * 0.35;
            const endX = -(container.scrollWidth - window.innerWidth);
            const distanceToTravel = startX - endX;
            const lockBuffer = window.innerHeight * 1.0; // 1 screen height of "locking" time

            // Update params
            timelineParams.distanceToTravel = distanceToTravel;
            timelineParams.lockBuffer = lockBuffer;
            timelineParams.startX = startX;
            timelineParams.endX = endX;

            section.style.height = (distanceToTravel + lockBuffer + window.innerHeight) + 'px';
        };

        initDimensions();
        window.addEventListener('resize', initDimensions);
        window.addEventListener('load', initDimensions);

        // --- ANIMATION LOOP ---
        window.addEventListener("scroll", () => {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    animateTimeline();
                    isTicking = false;
                });
                isTicking = true;
            }
        });

        function animateTimeline() {
            if (window.innerWidth <= 900) return;

            const viewportH = window.innerHeight;
            const viewportW = window.innerWidth;
            const sectionTop = section.offsetTop;
            const currentScroll = window.scrollY;

            const startEntrance = sectionTop - (viewportH * 0.95);
            const startPin = sectionTop;

            // The point where horizontal scrolling finishes
            const scrollEndInfo = startPin + timelineParams.distanceToTravel;

            // The absolute end of the section's sticky area
            const endScroll = sectionTop + (section.offsetHeight - viewportH);

            let progress = 0; // 0 to 1 representing horizontal progress

            // LOGIC FOR SCROLL & PROGRESS
            if (currentScroll >= startEntrance && currentScroll < startPin) {
                // Phase 1: Entrance
                const entranceDuration = startPin - startEntrance;
                const p = (currentScroll - startEntrance) / entranceDuration;

                const startX = viewportW;
                const endX = timelineParams.startX;
                const currentX = startX - ((startX - endX) * p);
                container.style.transform = `translate3d(${currentX}px, 0, 0)`;

                progress = 0;
            }
            else if (currentScroll >= startPin && currentScroll < scrollEndInfo) {
                // Phase 2: Active Horizontal Scroll
                const scrollDuration = timelineParams.distanceToTravel;
                // Avoid divide by zero if something weird happens
                if (scrollDuration > 0) {
                    progress = (currentScroll - startPin) / scrollDuration;
                } else {
                    progress = 1;
                }

                const startX = timelineParams.startX;
                const maxTranslate = timelineParams.endX;
                const currentX = startX - ((startX - maxTranslate) * progress);
                container.style.transform = `translate3d(${currentX}px, 0, 0)`;
            }
            else if (currentScroll >= scrollEndInfo && currentScroll <= endScroll) {
                // Phase 3: Locked (wait time)
                // Keep translate at max
                const maxTranslate = timelineParams.endX;
                container.style.transform = `translate3d(${maxTranslate}px, 0, 0)`;

                progress = 1;
            }
            else if (currentScroll > endScroll) {
                // Phase 4: Left the section
                const maxTranslate = timelineParams.endX;
                container.style.transform = `translate3d(${maxTranslate}px, 0, 0)`;
                progress = 1;
            }
            else {
                // Reset (before section)
                container.style.transform = `translate3d(${viewportW}px, 0, 0)`;
                progress = 0;
            }

            // --- BACKGROUND COLOR INTERPOLATION ---
            // Calculate current RGB based on progress
            const r = Math.round(startColor.r + (endColor.r - startColor.r) * progress);
            const g = Math.round(startColor.g + (endColor.g - startColor.g) * progress);
            const b = Math.round(startColor.b + (endColor.b - startColor.b) * progress);

            // Apply to section background
            section.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
    }
});