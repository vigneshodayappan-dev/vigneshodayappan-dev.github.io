/* ==========================================================================
   CORE PRODUCTION INTERACTION & URL MANAGMENT CONTROLLER
   Vignesh Raju Odayappan - Professional Portfolio Engine
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- DOM ELEMENT SELECTORS ---
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section");
    const footerParagraph = document.querySelector(".footer p");

  /* ==========================================================================
   1. NAVIGATION DRAWER MANAGEMENT (ACCESSIBLE FLOATING CONTAINER)
   ========================================================================== */
if (menuBtn && navLinks) {
    const internalIcon = menuBtn.querySelector("i");

    // Helper function to force close the menu safely
    const closeMenu = () => {
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open"); // Restores background scroll
        menuBtn.setAttribute("aria-expanded", "false");
        if (internalIcon) {
            internalIcon.classList.add("bi-list");
            internalIcon.classList.remove("bi-x");
        }
    };

    // Toggle logic for the menu button click
    menuBtn.addEventListener("click", () => {
        const isMenuExpanded = navLinks.classList.toggle("active");
        document.body.classList.toggle("menu-open", isMenuExpanded); // Locks background scroll
        menuBtn.setAttribute("aria-expanded", isMenuExpanded);
        
        if (internalIcon) {
            internalIcon.classList.toggle("bi-list", !isMenuExpanded);
            internalIcon.classList.toggle("bi-x", isMenuExpanded);
        }
    });

    // Auto-collapse mobile navigation overlay when an anchor link is selected
    navItems.forEach(anchorElement => {
        anchorElement.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                closeMenu();
            }
        });
    });
}

    /* ==========================================================================
       2. CLEAN URL HISTORY & SMOOTH SCROLL INTEGRATION
       ========================================================================== */
    // Targets portfolio anchors (excluding download buttons or standalone links)
    const smoothScrollAnchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    smoothScrollAnchors.forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault(); // Stop standard hash jumping layout break

            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate dynamic structural padding offset depending on screen layouts
                const navbarHeightOffset = window.innerWidth <= 768 ? 75 : 90;
                const targetedElementPosition = targetSection.offsetTop - navbarHeightOffset;

                // Fire custom smooth scrolling timeline paint
                window.scrollTo({
                    top: targetedElementPosition,
                    behavior: "smooth"
                });

                // Updates address state without adding raw # tags to your path index
                const cleanStateName = targetId.replace("#", "");
                window.history.replaceState(null, null, `/${cleanStateName}`);
            }
        });
    });

    /* ==========================================================================
       3. PERFORMANCE-OPTIMIZED SCROLL ENGINE (STICKY NAV & SCROLL SPY)
       ========================================================================== */
    let animationFrameThrottler = false;

    const executeScrollCalculations = () => {
        const structuralScrollTop = window.scrollY;

        // A. Sticky Navbar State Toggle
        if (structuralScrollTop > 40) {
            navbar?.classList.add("scrolled");
        } else {
            navbar?.classList.remove("scrolled");
        }

        // B. Active Section Navigation Scroll Spy
        let calculatedCurrentId = "";
        
        sections.forEach(sectionBlock => {
            const offsetTopLimit = sectionBlock.offsetTop - 180;
            if (structuralScrollTop >= offsetTopLimit) {
                calculatedCurrentId = sectionBlock.getAttribute("id") || "";
            }
        });

        // Update navigation anchor classes based on active viewport position
        navItems.forEach(navLinkNode => {
            navLinkNode.classList.remove("active-link");
            if (navLinkNode.getAttribute("href") === `#${calculatedCurrentId}`) {
                navLinkNode.classList.add("active-link");
            }
        });

        // Release the animation throttle lock
        animationFrameThrottler = false;
    };

    // Throttling scroll executions via requestAnimationFrame to ensure fluid 60fps rendering
    window.addEventListener("scroll", () => {
        if (!animationFrameThrottler) {
            window.requestAnimationFrame(executeScrollCalculations);
            animationFrameThrottler = true;
        }
    });

    /* ==========================================================================
       4. DYNAMIC FOOTER TIME STAMP
       ========================================================================== */
    if (footerParagraph) {
        const dynamicYearValue = new Date().getFullYear();
        footerParagraph.textContent = `© ${dynamicYearValue} Vignesh Raju Odayappan. All Rights Reserved.`;
    }
});