// Premier Design - Main JavaScript File
// Interactive components and animations

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initMobileMenu();
    initScrollReveal();
    initProductFilter();
    initSmoothScroll();
    initAnimations();
    
    // Mobile Menu Toggle
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
    
    // Scroll Reveal Animation
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
    
    // Product Filter System
    function initProductFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');
        
        if (filterButtons.length > 0 && productCards.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter products with animation
                    productCards.forEach((card, index) => {
                        const category = card.getAttribute('data-category');
                        
                        setTimeout(() => {
                            if (filter === 'all' || category === filter) {
                                card.classList.remove('hidden');
                                anime({
                                    targets: card,
                                    opacity: [0, 1],
                                    scale: [0.8, 1],
                                    duration: 500,
                                    easing: 'easeOutCubic'
                                });
                            } else {
                                anime({
                                    targets: card,
                                    opacity: [1, 0],
                                    scale: [1, 0.8],
                                    duration: 300,
                                    easing: 'easeInCubic',
                                    complete: function() {
                                        card.classList.add('hidden');
                                    }
                                });
                            }
                        }, index * 50);
                    });
                });
            });
        }
    }
    
    // Smooth Scroll for anchor links
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Advanced Animations
    function initAnimations() {
        // Hero text gradient animation
        const heroText = document.querySelector('.text-gradient');
        if (heroText) {
            anime({
                targets: heroText,
                backgroundPosition: ['0% 50%', '100% 50%'],
                duration: 3000,
                easing: 'easeInOutSine',
                loop: true,
                direction: 'alternate'
            });
        }
        
        // Floating elements animation
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            anime({
                targets: element,
                translateY: [-20, 20],
                duration: 3000 + (index * 500),
                easing: 'easeInOutSine',
                loop: true,
                direction: 'alternate'
            });
        });
        
        // Card hover animations
        const cards = document.querySelectorAll('.card-hover');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    translateY: -8,
                    rotateX: 5,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
            
            card.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    translateY: 0,
                    rotateX: 0,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });
        
        // Button hover animations
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    translateY: -2,
                    scale: 1.05,
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
    }
    
    // WhatsApp Integration
    window.openWhatsApp = function(productName) {
        const phoneNumber = '77078816898';
        const message = encodeURIComponent(`Здравствуйте! Меня интересует ${productName}. Можно ли получить более подробную информацию и консультацию?`);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Add click animation
        const button = event.target;
        anime({
            targets: button,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeInOutQuad',
            complete: function() {
                window.open(whatsappUrl, '_blank');
            }
        });
    };
    
    // Sticky Navigation Effect
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.classList.add('nav-blur');
        } else {
            nav.classList.remove('nav-blur');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Counter Animation (for statistics)
    function animateCounter(element, target, duration = 2000) {
        anime({
            targets: { count: 0 },
            count: target,
            duration: duration,
            easing: 'easeOutCubic',
            update: function(anim) {
                element.textContent = Math.floor(anim.animations[0].currentValue);
            }
        });
    }
    
    // Initialize counter animations when elements are visible
    const counterElements = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-counter'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counterElements.forEach(element => {
        counterObserver.observe(element);
    });
    
    // Parallax Effect for Hero Section
    const heroSection = document.querySelector('.hero-image');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Loading Animation
    window.addEventListener('load', function() {
        const loadingElements = document.querySelectorAll('.reveal-element');
        loadingElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('revealed');
            }, index * 100);
        });
    });
    
    // Error Handling for Images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
    
    // Performance Optimization - Lazy Loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Accessibility Enhancements
    document.addEventListener('keydown', function(e) {
        // Skip to main content with Tab key
        if (e.key === 'Tab' && !e.shiftKey) {
            const focusableElements = document.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
            
            if (document.activeElement === focusableElements[focusableElements.length - 1]) {
                e.preventDefault();
                focusableElements[0].focus();
            }
        }
    });
    
    // Form Validation (if forms are added)
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    // Console Welcome Message
    console.log('%c🏠 Premier Design - Мебель на заказ в Астане', 'color: #C4704A; font-size: 16px; font-weight: bold;');
    console.log('%c💬 WhatsApp: +7 707 881 6898', 'color: #2C2C2C; font-size: 14px;');
    console.log('%c🌐 Сайт разработан с любовью к дизайну и качеству', 'color: #666; font-size: 12px;');
    
});

// Utility Functions
const Utils = {
    // Debounce function for performance
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
    
    // Throttle function for scroll events
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
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}