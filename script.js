// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(section);
});

// Make hero section immediately visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}

// Glitch effect on hover for hero title
const glitchTitle = document.querySelector('.glitch');
if (glitchTitle) {
    glitchTitle.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch 0.3s infinite';
    });

    glitchTitle.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
}

// Add glitch animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% {
            text-shadow: 2px 2px #ff6b9d, -2px -2px #3b82f6;
        }
        25% {
            text-shadow: -2px 2px #a855f7, 2px -2px #ff6b9d;
        }
        50% {
            text-shadow: 2px -2px #3b82f6, -2px 2px #a855f7;
        }
        75% {
            text-shadow: -2px -2px #ff6b9d, 2px 2px #3b82f6;
        }
        100% {
            text-shadow: 2px 2px #ff6b9d, -2px -2px #3b82f6;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero circles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.circle');

    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.2;
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Activity cards hover effect with tilt
const activityCards = document.querySelectorAll('.activity-card');
activityCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// Social buttons pulse effect
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease';
    });

    btn.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1) translateY(-5px);
        }
        50% {
            transform: scale(1.05) translateY(-5px);
        }
    }
`;
document.head.appendChild(pulseStyle);

// Stats counter animation
const statsNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateStats();
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

function animateStats() {
    statsNumbers.forEach(stat => {
        stat.style.transform = 'scale(1.2)';
        stat.style.transition = 'transform 0.3s ease';

        setTimeout(() => {
            stat.style.transform = 'scale(1)';
        }, 300);
    });
}

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#ff6b9d';
        }
    });
});

// Prevent navigation from being hidden on page load
window.addEventListener('load', () => {
    document.querySelector('header').style.transform = 'translateY(0)';
});
