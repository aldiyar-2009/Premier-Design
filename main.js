// Premier Design - Main JavaScript File
// Interactive components and animations

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initMobileMenu();
    initScrollReveal();
    initSplideSlider(); // New: Initialize Splide Slider
    initContactForm();  // New: Initialize Contact Form Handler
    initSmoothScroll();
    initAnimations();
    initScrollToTop(); // NEW: Initialize Scroll to Top Button
    
    // Mobile Menu Toggle
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
            // Close menu on link click
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    }
    
    // Splide Slider Initialization
    function initSplideSlider() {
        const splideElement = document.querySelector('.splide');
        if (splideElement && typeof Splide !== 'undefined') {
            new Splide(splideElement, {
            type: 'loop',
            perPage: 3,
            gap: '2rem',
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            // Удалено lazyLoad, чтобы изображения подгружались сразу
            breakpoints: {
                1024: { perPage: 2, gap: '1rem' },
                640: { perPage: 1, gap: '1rem' }
            }
        }).mount();
    }
}

    // Contact Form Submission Handler
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const formMessage = document.getElementById('form-message');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simple validation
                if (!validateForm(form)) {
                    formMessage.textContent = 'Пожалуйста, заполните все обязательные поля.';
                    formMessage.className = 'text-center text-sm mt-3 text-red-500';
                    formMessage.classList.remove('hidden');
                    return;
                }
                
                const name = form.elements['name'].value;
                const phone = form.elements['phone'].value;
                const message = form.elements['message'].value;
                
                // Construct WhatsApp message
                const whatsappMsg = `Здравствуйте, Premier Design! Я ${name}. Меня интересует проект: "${message}". Мой номер для связи: ${phone}.`;
                const whatsappUrl = `https://wa.me/77078816898?text=${encodeURIComponent(whatsappMsg)}`;

                // Simulate form submission and redirect to WhatsApp
                anime({
                    targets: form.querySelector('button'),
                    scale: [1, 0.98],
                    duration: 100,
                    easing: 'easeInOutQuad',
                    complete: function() {
                        formMessage.textContent = 'Спасибо! Перенаправляем вас в WhatsApp для продолжения.';
                        formMessage.className = 'text-center text-sm mt-3 text-green-600';
                        formMessage.classList.remove('hidden');
                        
                        setTimeout(() => {
                            window.open(whatsappUrl, '_blank');
                            form.reset();
                            formMessage.classList.add('hidden');
                        }, 500);
                    }
                });
            });
        }
    }
    
    // Form Validation Utility
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('border-red-500');
                isValid = false;
            } else {
                field.classList.remove('border-red-500');
            }
        });
        
        return isValid;
    }


    // Scroll Reveal Animation (Kept as is)
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-element');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Smooth Scroll for anchor links (Kept as is)
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Adjusted offset for taller fixed header
                    const offsetTop = targetElement.offsetTop - 100; 
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Advanced Animations (Updated to remove unused logic)
    function initAnimations() {
        // Hero text gradient animation - Adjusted CSS handles this better
        
        // Floating elements animation (Kept as is)
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            anime({
                targets: element,
                translateY: [-20, 20],
                rotate: [0, 1], // Added slight rotation
                duration: 4000 + (index * 700), // Slower animation
                easing: 'easeInOutSine',
                loop: true,
                direction: 'alternate'
            });
        });
        
        // Card hover animations (Updated to use translateY and box-shadow only, as per new CSS)
        const cards = document.querySelectorAll('.card-hover');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    translateY: -8,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
            
            card.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    translateY: 0,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });
        
        // Button hover animations (Kept as is)
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
             button.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    translateY: -2,
                    scale: 1.02, // Subtle scale change
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
            
            button.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    translateY: 0,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
        });
        
        // Sticky Navigation Effect (Simplified)
        const nav = document.querySelector('nav');
        window.addEventListener('scroll', Utils.throttle(() => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100) {
                nav.classList.add('nav-blur');
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('nav-blur');
                nav.classList.remove('shadow-lg');
            }
        }, 100));
        
        // Counter Animation (Kept as is)
        function animateCounter(element, target, duration = 2000) {
            anime({
                targets: { count: 0 },
                count: target,
                duration: duration,
                easing: 'easeOutCubic',
                update: function(anim) {
                    element.textContent = Math.floor(anim.animations[0].currentValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Added thousand separator
                }
            });
        }
        
        // Initialize counter animations when elements are visible
        const counterElements = document.querySelectorAll('[data-counter]');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-counter'));
                    const suffix = entry.target.textContent.includes('%') ? '%' : 
                                   entry.target.textContent.includes('+') ? '+' : '';
                                   
                    entry.target.textContent = suffix; // Clear and show suffix only before animation
                    
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterElements.forEach(element => {
            counterObserver.observe(element);
        });

        // Parallax Effect for Hero Section (Kept as is)
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            window.addEventListener('scroll', Utils.throttle(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3; // Slower rate for subtle effect
                heroImage.style.transform = `translateY(${rate}px)`;
            }, 50));
        }
    }
    
    // Scroll-to-Top Button Handler
    function initScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTopBtn');
        if (!scrollBtn) return;
        
        // Function to check scroll position and toggle button visibility
        const toggleVisibility = () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollBtn.classList.add('opacity-100');
            } else {
                scrollBtn.classList.remove('opacity-100');
                scrollBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        };
        
        // Toggle visibility on scroll (throttled for performance)
        window.addEventListener('scroll', Utils.throttle(toggleVisibility, 150));
        
        // Scroll to top on click
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initial check in case the user reloads while scrolled down
        toggleVisibility();
    }
    
    // Performance Optimization - Lazy Loading (Kept as is, but Splide handles its own lazy loading)
    // The previous implementation is okay, but I'll remove the data-src logic to keep it clean.
    
    // Utility Functions (Kept as is)
    const Utils = {
        debounce: function(func, wait, immediate) {
            let timeout;
            return function executedFunction() {
                const context = this;
                const args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };
    
});