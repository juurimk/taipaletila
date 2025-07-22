/*=================================================================
  Fast Scroll Navigation for Hugo Site
==================================================================*/

document.addEventListener('DOMContentLoaded', function() {
    
    // Fast scroll function with customizable speed
    function fastScrollTo(target, duration = 400) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80; // 80px offset for navbar
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function for smooth but fast animation
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = this.getAttribute('href');
            
            // Only proceed if it's a hash link and target exists
            if (target && target.startsWith('#') && document.querySelector(target)) {
                
                // Add visual feedback
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Fast scroll to target (300ms duration - very fast)
                fastScrollTo(target, 300);
                
                // Update URL hash without triggering scroll
                history.pushState(null, null, target);
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) navbarToggler.click();
                }
            }
        });
    });

    // Handle direct hash navigation (when someone visits a URL with hash)
    function handleHashOnLoad() {
        const hash = window.location.hash;
        if (hash && document.querySelector(hash)) {
            // Small delay to ensure page is fully loaded
            setTimeout(() => {
                fastScrollTo(hash, 600); // Slightly slower for page load
            }, 100);
        }
    }

    // Handle hash on page load
    handleHashOnLoad();

    // Handle browser back/forward with hash
    window.addEventListener('popstate', function() {
        handleHashOnLoad();
    });

    // Optional: Add active state management for navigation
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
        
        let current = '';
        const scrollPosition = window.pageYOffset + 120; // Offset for navbar + some buffer
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }

    // Update active navigation on scroll (throttled for performance)
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });
});

/*=================================================================
  Configuration Notes:
  
  - Duration: Currently set to 400ms (fast). Adjust if needed:
    * 300ms = very fast
    * 400ms = fast (recommended)
    * 600ms = moderate
    * 800ms = slower but still responsive
  
  - Easing: Uses easeInOutQuad for smooth acceleration/deceleration
  
  - Offset: Set to 80px to account for fixed navbar height
==================================================================*/