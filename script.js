
// Premium particle system
function createPremiumParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Create floating geometric particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, #10b981, #3b82f6);
            opacity: ${Math.random() * 0.6 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            animation: floatParticle ${Math.random() * 30 + 20}s linear infinite;
            box-shadow: 0 0 ${size * 2}px rgba(16, 185, 129, 0.3);
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Enhanced CSS animations
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes counterUpdate {
        0% { transform: translateY(20px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes buttonPulse {
        0%, 100% { box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3); }
        50% { box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5), 0 0 30px rgba(16, 185, 129, 0.3); }
    }
`;
document.head.appendChild(enhancedStyle);

// Live statistics system
let stats = {
    totalDownloads: 2847,
    hourlyDownloads: 23,
    monthlyDownloads: 1284
};

function updateStatistics() {
    const totalElement = document.getElementById('total-downloads');
    const downloadCountElement = document.getElementById('download-count');
    
    if (Math.random() < 0.15) {
        stats.totalDownloads++;
        stats.hourlyDownloads++;
        
        if (totalElement) {
            totalElement.style.animation = 'counterUpdate 0.5s ease';
            totalElement.textContent = stats.totalDownloads.toLocaleString();
            setTimeout(() => {
                totalElement.style.animation = '';
            }, 500);
        }
        
        if (downloadCountElement) {
            downloadCountElement.style.animation = 'counterUpdate 0.5s ease';
            downloadCountElement.textContent = stats.totalDownloads.toLocaleString();
            setTimeout(() => {
                downloadCountElement.style.animation = '';
            }, 500);
        }
    }
}

// Smooth scrolling navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.premium-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced button interactions
function initializeButtons() {
    const downloadBtn = document.querySelector('.download-btn');
    const docsBtn = document.querySelector('.docs-btn');
    const downloadLink = document.querySelector('.btn-download');
    
    // Download button with enhanced effects
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Scroll to download section
            setTimeout(() => {
                document.getElementById('download').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        });
    }
    
    // Documentation button
    if (docsBtn) {
        docsBtn.addEventListener('click', function() {
            document.getElementById('installation').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Download link with success feedback
    if (downloadLink) {
        downloadLink.addEventListener('click', function(e) {
            const originalText = this.querySelector('span').textContent;
            const span = this.querySelector('span');
            
            // Update button state
            span.textContent = 'Downloading...';
            this.style.background = 'linear-gradient(135deg, #059669, #2563eb)';
            
            setTimeout(() => {
                span.textContent = 'Download Complete ✓';
                this.style.background = 'linear-gradient(135deg, #059669, #059669)';
            }, 1500);
            
            setTimeout(() => {
                span.textContent = originalText;
                this.style.background = 'linear-gradient(135deg, #10b981, #3b82f6)';
            }, 4000);
        });
    }
}

// Parallax and scroll effects
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        // Floating cube rotation speed based on scroll
        const floatingCube = document.querySelector('.floating-cube');
        if (floatingCube) {
            const rotation = scrolled * 0.1;
            floatingCube.style.transform = `rotateX(${rotation}deg) rotateY(${rotation}deg)`;
        }
        
        // Navigation background opacity
        const nav = document.querySelector('.premium-nav');
        if (nav) {
            const opacity = Math.min(scrolled / 100, 0.95);
            nav.style.backgroundColor = `rgba(10, 14, 26, ${opacity})`;
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

// Feature cards intersection observer
function initializeIntersectionObserver() {
    const cards = document.querySelectorAll('.feature-card, .step-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}

// Enhanced cursor effects for premium feel
function initializeCursorEffects() {
    const interactiveElements = document.querySelectorAll(
        '.btn-primary, .btn-secondary, .feature-card, .nav-links a, .btn-download, .btn-github'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        element.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });
    });
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Typing effect for hero subtitle
function initializeTypingEffect() {
    const subtitle = document.querySelector('.title-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid #10b981';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createPremiumParticles();
    initializeNavigation();
    initializeButtons();
    initializeScrollEffects();
    initializeIntersectionObserver();
    initializeCursorEffects();
    initializeTypingEffect();
    
    // Start statistics updates
    setInterval(updateStatistics, 12000);
    
    // Add smooth entrance animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add pulse animation to primary buttons
    const primaryButtons = document.querySelectorAll('.btn-primary, .btn-download');
    primaryButtons.forEach(btn => {
        btn.style.animation = 'buttonPulse 3s ease-in-out infinite';
    });
});

// Performance optimizations
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Non-critical animations
        const decorativeElements = document.querySelectorAll('.cube-face');
        decorativeElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Clear any running intervals or timeouts
    const intervals = [updateStatistics];
    intervals.forEach(interval => {
        if (interval.id) {
            clearInterval(interval.id);
        }
    });
});
