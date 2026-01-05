document.addEventListener("DOMContentLoaded", () => {
    
    const splitSection = document.querySelector(".split-section");
    const leftPanel = document.querySelector(".panel-left");
    const rightPanel = document.querySelector(".panel-right");
    const contents = document.querySelectorAll(".panel-content");

    if (splitSection && leftPanel && rightPanel && window.innerWidth > 900) {
        
        let isTicking = false;

        window.addEventListener("scroll", () => {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    animateSplit();
                    isTicking = false;
                });
                isTicking = true;
            }
        });

        function animateSplit() {
            const sectionTop = splitSection.offsetTop;
            const sectionHeight = splitSection.offsetHeight;
            const viewHeight = window.innerHeight;
            const currentScroll = window.scrollY;

            // 1. DEFINE TRIGGER ZONE (Pinning Phase)
            // It pins when the top of the section hits the top of the viewport.
            // It stays pinned for (sectionHeight - viewHeight).
            const startScroll = sectionTop;
            const endScroll = sectionTop + (sectionHeight - viewHeight);

            // Calculate Progress (0 to 1) during the pinned phase
            let progress = (currentScroll - startScroll) / (endScroll - startScroll);
            progress = Math.max(0, Math.min(1, progress));

            // 2. MOVE PANELS
            // We want them to start "Closed" (or Open?) -> Logic from before was -50 to 0.
            // If the user wants "start vertical scroll to split section", maybe they want them to OPEN?
            // Let's assume the previous visual intent (closing in) was desired, just the TIMING was off.
            // Previous: -50 (out) to 0 (center).
            
            const leftMove = -50 + (50 * progress);
            const rightMove = 50 - (50 * progress);

            leftPanel.style.transform = `translateX(${leftMove}%)`;
            rightPanel.style.transform = `translateX(${rightMove}%)`;

            // 3. FADE CONTENT
            if (progress > 0.8) {
                contents.forEach(c => c.classList.add('is-visible'));
            } else {
                contents.forEach(c => c.classList.remove('is-visible'));
            }
        }
        
        // Run once on load to set initial state
        animateSplit();
    }
});