// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }
    
    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateIcon(theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    updateIcon(theme) {
        this.themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = this.hamburger.querySelectorAll('.bar');
        if (this.hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        
        const bars = this.hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Keep the red brand color consistent on scroll
        if (scrollY > 50) {
            this.navbar.style.background = 'rgba(120, 0, 0, 0.98) !important';
            this.navbar.style.backdropFilter = 'blur(20px)';
        } else {
            this.navbar.style.background = 'rgba(120, 0, 0, 0.95) !important';
            this.navbar.style.backdropFilter = 'blur(20px)';
        }
    }
    
    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScroller {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.service-card, .stat-box, .contact-item, .feature-item'
        );
        
        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }
}

// Parallax Effect
class ParallaxManager {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleParallax());
    }
    
    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.init();
    }
    
    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showSuccessMessage();
            this.contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message glass-panel';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you! Your message has been sent successfully.</p>
        `;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            padding: 2rem;
            text-align: center;
            color: var(--text-primary);
            animation: slideInDown 0.5s ease-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOutUp 0.5s ease-out';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    }
}

// Typing Animation
class TypingAnimation {
    constructor() {
        this.init();
    }
    
    init() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            this.typeWriter(heroTitle);
        }
    }
    
    typeWriter(element) {
        const text = element.innerHTML;
        element.innerHTML = '';
        element.style.borderRight = '2px solid var(--accent-primary)';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                element.style.borderRight = 'none';
            }
        }, 50);
    }
}

// Counter Animation
class CounterAnimation {
    constructor() {
        this.init();
    }
    
    init() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = element.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                element.textContent = element.textContent.replace(/\d+/, Math.floor(current));
            }
        }, 30);
    }
}

// Particle Background Effect
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.handleResize());
    }
    
    setupCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';
        
        document.body.appendChild(this.canvas);
        this.handleResize();
    }
    
    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(120, 0, 0, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Loading Screen
class LoadingScreen {
    constructor() {
        this.createLoadingScreen();
    }
    
    createLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'loading-screen';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">
                    <img src="Assets/favicon.PNG" alt="CredO Logo" style="width: 80px; height: 80px; object-fit: contain;">
                </div>
                <div class="loader-spinner"></div>
                <div class="loader-text">Loading amazing experience...</div>
            </div>
        `;
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(loader);
        
        // Hide loader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 1000);
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    new ThemeManager();
    new NavigationManager();
    new SmoothScroller();
    new AnimationObserver();
    new ParallaxManager();
    new FormHandler();
    new CounterAnimation();
    new LoadingScreen();
    
    // Initialize particle background (optional, can be disabled for performance)
    if (window.innerWidth > 768) {
        new ParticleBackground();
    }
    
    // Add custom CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-logo {
            font-family: var(--font-secondary);
            font-size: 3rem;
            font-weight: 700;
            color: #4f000b;
            margin-bottom: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(120, 0, 0, 0.3);
            border-top: 3px solid #4f000b;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        .loader-text {
            color: #b8b8b8;
            font-size: 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        
        @keyframes slideOutUp {
            from {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
        }
        
        .success-message i {
            color: #6bcf7f;
            font-size: 2rem;
            margin-bottom: 1rem;
            display: block;
        }
    `;
    document.head.appendChild(style);
});

// Utility Functions
const utils = {
    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: (func, limit) => {
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
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// O Intelligence Animated Section
function initializeOIntelligenceFeatures() {
    const animatedSection = document.querySelector('.o-intelligence-animated');
    const miniCards = document.querySelectorAll('.feature-card-mini');
    
    if (!animatedSection) return;
    
    let animationTriggered = false;
    
    // Intersection Observer for scroll-triggered animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationTriggered) {
                animationTriggered = true;
                triggerOIntelligenceAnimation();
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(animatedSection);
    
    // Enhanced hover effects for mini feature cards
    miniCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '5px';
            ripple.style.height = '5px';
            ripple.style.background = 'rgba(79, 0, 11, 0.4)';
            ripple.style.borderRadius = '50%';
            ripple.style.top = '50%';
            ripple.style.left = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.animation = 'rippleExpand 0.6s ease-out forwards';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
        
        // Click effect
        card.addEventListener('click', function() {
            const feature = this.dataset.feature;
            console.log(`O Intelligence feature clicked: ${feature}`);
            
            // Add click animation
            const currentTransform = this.style.transform;
            this.style.transform = 'translateY(-4px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = currentTransform || '';
            }, 150);
        });
    });
}

function triggerOIntelligenceAnimation() {
    console.log('🎬 Triggering O Intelligence animation sequence');
    
    // Stage 1: Main statement pops up (0s)
    setTimeout(() => {
        const mainStatement = document.querySelector('.main-statement');
        const stage1 = document.querySelector('.stage-1');
        if (mainStatement && stage1) {
            stage1.classList.add('animate');
            mainStatement.classList.add('animate');
        }
    }, 0);
    
    // Stage 2: Dot appears first (0.8s)
    setTimeout(() => {
        const stage2 = document.querySelector('.stage-2');
        const centerDot = document.querySelector('.center-dot');
        
        if (stage2) stage2.classList.add('animate');
        if (centerDot) centerDot.classList.add('animate');
    }, 800);
    
    // Stage 2b: Text slides in from left and right (1.2s)
    setTimeout(() => {
        const statementLeft = document.querySelector('.statement-left');
        const statementRight = document.querySelector('.statement-right');
        
        if (statementLeft) statementLeft.classList.add('animate');
        if (statementRight) statementRight.classList.add('animate');
    }, 1200);
    
    // Stage 3: Move text up and show cards (2s)
    setTimeout(() => {
        const stage3 = document.querySelector('.stage-3');
        if (stage3) {
            stage3.classList.add('animate');
            
            // Add crushing effect to text
            const mainStatement = document.querySelector('.main-statement');
            const statementLeft = document.querySelector('.statement-left');
            const statementRight = document.querySelector('.statement-right');
            const centerDot = document.querySelector('.center-dot');
            
            if (mainStatement) {
                mainStatement.classList.add('crush-text');
            }
            if (statementLeft) {
                statementLeft.classList.add('crush-text');
            }
            if (statementRight) {
                statementRight.classList.add('crush-text');
            }
            if (centerDot) {
                centerDot.classList.add('crush-text');
            }
        }
    }, 2000);
    
    // Feature cards pop up with staggered delays (2.2s - 3.0s)
    const featureCards = document.querySelectorAll('.feature-card-mini');
    featureCards.forEach((card, index) => {
        const delay = parseFloat(card.dataset.delay) * 1000;
        setTimeout(() => {
            card.classList.add('animate');
        }, 2200 + delay);
    });
    
    // Context description fades in (3.2s)
    setTimeout(() => {
        const contextDescription = document.querySelector('.context-description');
        if (contextDescription) {
            contextDescription.classList.add('animate');
        }
    }, 3200);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleExpand {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(40);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// POV Flipping Cards Management
class POVCardsManager {
    constructor() {
        this.cards = document.querySelectorAll('.flip-card');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentCard = 0;
        this.autoFlipInterval = null;
        this.imageStageTimeout = null;
        this.autoFlipDelay = 7000; // 7 seconds total (3s content + 3s image + 1s flip)
        this.isFlipping = false;
        this.currentPhase = 'content-stage'; // 'content-stage' | 'image-stage' | 'flipping'
        
        this.init();
    }
    
    init() {
        if (!this.cards.length) return;
        
        // Add click listeners to indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToCard(index));
        });
        
        // Start auto-flip
        this.startAutoFlip();
        
        // Pause on hover
        const container = document.querySelector('.flip-cards-container');
        if (container) {
            container.addEventListener('mouseenter', () => this.pauseAutoFlip());
            container.addEventListener('mouseleave', () => this.startAutoFlip());
        }
        
        // Initialize intersection observer for animation
        this.initIntersectionObserver();
    }
    
    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startAutoFlip();
                } else {
                    this.pauseAutoFlip();
                }
            });
        }, {
            threshold: 0.3
        });
        
        const section = document.querySelector('.pov-cards-section');
        if (section) {
            observer.observe(section);
        }
    }
    
    goToCard(targetIndex) {
        if (this.isFlipping || targetIndex === this.currentCard) return;
        
        this.isFlipping = true;
        
        const currentCardElement = this.cards[this.currentCard];
        const targetCardElement = this.cards[targetIndex];
        
        // Clear any existing timeouts
        this.pauseAutoFlip();
        
        // Determine flip direction
        const direction = targetIndex > this.currentCard ? 'next' : 'prev';
        
        // Keep current card in image-stage during flip to avoid glitch
        // Do NOT reset to normal state before flipping
        
        // Animate current card out
        this.animateCardOut(currentCardElement, direction);
        
        // Store current card index before updating
        const outgoingCardIndex = this.currentCard;
        
        // Animate new card in
        setTimeout(() => {
            this.updateActiveCard(targetIndex);
            this.animateCardIn(targetCardElement, direction);
        }, 400);
        
        setTimeout(() => {
            // Reset the outgoing card to normal state after flip is complete
            this.setCardPhase(outgoingCardIndex, 'normal');
            
            this.isFlipping = false;
            // Start new sequence for the new card
            this.startCardSequence();
        }, 800);
    }
    
    animateCardOut(card, direction) {
        card.classList.add('flipping-out');
        
        if (direction === 'next') {
            card.style.transform = 'rotateY(-90deg) translateX(-50%)';
        } else {
            card.style.transform = 'rotateY(90deg) translateX(50%)';
        }
    }
    
    animateCardIn(card, direction) {
        card.classList.remove('flipping-out');
        card.classList.add('active', 'flipping-in');
        
        if (direction === 'next') {
            card.style.transform = 'rotateY(0deg) translateX(0%)';
        } else {
            card.style.transform = 'rotateY(0deg) translateX(0%)';
        }
        
        setTimeout(() => {
            card.classList.remove('flipping-in');
            card.style.transform = '';
        }, 400);
    }
    
    updateActiveCard(newIndex) {
        // Update cards
        this.cards[this.currentCard].classList.remove('active');
        this.cards[newIndex].classList.add('active');
        
        // Update indicators
        this.indicators[this.currentCard].classList.remove('active');
        this.indicators[newIndex].classList.add('active');
        
        this.currentCard = newIndex;
    }
    
    nextCard() {
        const nextIndex = (this.currentCard + 1) % this.cards.length;
        this.goToCard(nextIndex);
    }
    
    startAutoFlip() {
        this.pauseAutoFlip();
        this.startCardSequence();
    }
    
    startCardSequence() {
        // Stage 1: Show full content popping from center
        this.setCardPhase(this.currentCard, 'content-stage');
        
        // Start the sequence timer
        this.autoFlipInterval = setTimeout(() => {
            this.executeImageStage();
        }, 3000); // Show content for 3 seconds
    }
    
    executeImageStage() {
        if (this.isFlipping) return;
        
        // Stage 2: Content disappears, image pops from center
        this.setCardPhase(this.currentCard, 'image-stage');
        
        // After showing image, flip to next card
        this.imageStageTimeout = setTimeout(() => {
            this.nextCard();
        }, 3000); // Show image for 3 seconds
    }
    
    setCardPhase(cardIndex, phase) {
        const card = this.cards[cardIndex];
        if (!card) return;
        
        // Remove all phase classes
        card.classList.remove('content-stage', 'image-stage');
        
        // Add new phase class
        if (phase !== 'normal') {
            card.classList.add(phase);
        }
        
        this.currentPhase = phase;
    }
    
    pauseAutoFlip() {
        if (this.autoFlipInterval) {
            clearTimeout(this.autoFlipInterval);
            this.autoFlipInterval = null;
        }
        if (this.imageStageTimeout) {
            clearTimeout(this.imageStageTimeout);
            this.imageStageTimeout = null;
        }
    }
}

// Typewriter Animation Class
class TypewriterAnimation {
    constructor(element, options = {}) {
        this.element = element;
        this.text = element.getAttribute('data-text') || element.textContent;
        this.speed = options.speed || 50; // milliseconds between each letter
        this.delay = options.delay || 0; // delay before starting
        this.currentIndex = 0;
        this.isComplete = false;
        
        // Clear the original text
        this.element.textContent = '';
        
        this.init();
    }
    
    init() {
        // Create intersection observer to trigger when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isComplete) {
                    setTimeout(() => {
                        this.startTyping();
                    }, this.delay);
                    observer.unobserve(this.element);
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(this.element);
    }
    
    startTyping() {
        this.typeNextLetter();
    }
    
    typeNextLetter() {
        if (this.currentIndex < this.text.length) {
            const char = this.text[this.currentIndex];
            const span = document.createElement('span');
            span.className = 'letter';
            
            if (char === ' ') {
                span.className += ' space';
                span.innerHTML = '&nbsp;';
            } else {
                span.textContent = char;
            }
            
            // Set animation delay
            span.style.animationDelay = '0ms';
            
            this.element.appendChild(span);
            this.currentIndex++;
            
            setTimeout(() => {
                this.typeNextLetter();
            }, this.speed);
        } else {
            // Typing complete
            this.isComplete = true;
            setTimeout(() => {
                this.element.classList.add('typing-complete');
            }, 1000); // Keep cursor for 1 second after completion
        }
    }
}

// Initialize O Intelligence features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeOIntelligenceFeatures();
    
    // Initialize POV Cards Manager
    new POVCardsManager();
    
    // Initialize typewriter animations
    const typewriterElements = document.querySelectorAll('.typewriter-text');
    typewriterElements.forEach(element => {
        new TypewriterAnimation(element, {
            speed: 30, // Faster typing for long text
            delay: 500 // Small delay before starting
        });
    });
});
