/* =====================================================
   SPLIT TEXT + SCROLL-DRIVEN LETTER ANIMATION
   Inspired by editorial typography (Art Yakushev style)
===================================================== */

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPLIT_SELECTOR = ".js-split-text";
    const animatedItems = [];

    /* -------------------------------
       1. Split text & Cache Elements
    -------------------------------- */
    function initSplitText(element) {
      // Accessibility: Preserve original text for screen readers
      const originalText = element.textContent.trim();
      element.setAttribute("aria-label", originalText);
      element.setAttribute("aria-hidden", "false"); // Wrapper is visible to SR

      const nodes = [...element.childNodes];
      element.innerHTML = ""; // Clear content

      nodes.forEach(node => {
        if (node.nodeType === 3) { // Text Node
          const text = node.textContent;
          let currentWord = null;

          [...text].forEach(char => {
            // Treat spaces, tabs, newlines as separators
            if (char.match(/\s/)) {
              if (currentWord) {
                element.appendChild(currentWord);
                currentWord = null;
              }
              element.appendChild(document.createTextNode(char));
            } else {
              if (!currentWord) {
                currentWord = document.createElement("span");
                currentWord.className = "word";
              }
              const span = document.createElement("span");
              span.className = "char";
              span.textContent = char;
              span.setAttribute("aria-hidden", "true"); // Hide individual chars from SR
              currentWord.appendChild(span);
            }
          });
          
          // Append any remaining word
          if (currentWord) {
            element.appendChild(currentWord);
          }
        } else {
          // Preserve <br> and other elements
          element.appendChild(node.cloneNode(true));
        }
      });

      // Cache elements for the animation loop (Performance Fix)
      animatedItems.push({
        element: element,
        chars: element.querySelectorAll(".char")
      });
    }

    // Initialize
    document.querySelectorAll(SPLIT_SELECTOR).forEach(initSplitText);

    if (prefersReducedMotion) {
      document.querySelectorAll(".char").forEach(char => {
        char.style.opacity = 1;
        char.style.filter = "none";
        char.style.transform = "none";
      });
      return;
    }

    /* -------------------------------
       2. Animation Loop
    -------------------------------- */
    function animate() {
      const viewportHeight = window.innerHeight;

      animatedItems.forEach(({ element, chars }) => {
        const rect = element.getBoundingClientRect();
        
        // Skip if not in view (Optimization)
        if (rect.top > viewportHeight || rect.bottom < 0) return;

        // Progress: 0 (entering bottom) -> High Value (as it moves up)
        // Adjusted denominator to 0.6 so the animation is smoother and lasts longer
        const rawProgress = (viewportHeight - rect.top) / (viewportHeight * 0.6);
        const progress = Math.max(rawProgress, 0);

        chars.forEach((char, index) => {
          // Reduced stagger from 0.02 to 0.008 for smoother long-text flow
          const stagger = index * 0.008; 
          const charProgress = Math.min(Math.max(progress - stagger, 0), 1);

          char.style.opacity = charProgress;
          char.style.filter = `blur(${10 * (1 - charProgress)}px)`;
        });
      });
    }

    // Register to global RAF
    window._rafCallbacks = window._rafCallbacks || [];
    window._rafCallbacks.push(animate);
  });
})();
