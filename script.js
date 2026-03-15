// ==========================================
// ZION AI SOLUTIONS - Particle & Animation Engine
// ==========================================

(function () {
    'use strict';

    // --- Floating Particles ---
    const particlesContainer = document.getElementById('particles');
    const PARTICLE_COUNT = 35;

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const x = Math.random() * 100;
        const duration = 6 + Math.random() * 10;
        const delay = Math.random() * 8;
        const size = 1.5 + Math.random() * 3;
        const hue = Math.random() > 0.5 ? '188' : '262'; // cyan or purple

        particle.style.left = x + '%';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        particle.style.background = `hsl(${hue}, 100%, 70%)`;

        particlesContainer.appendChild(particle);
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        createParticle();
    }

    // --- Intersection Observer for scroll animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // --- Subtle parallax on mouse move ---
    const glows = document.querySelectorAll('.bg-glow');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        glows.forEach((glow, i) => {
            const speed = (i + 1) * 8;
            glow.style.transform += ''; // keep existing animation
            requestAnimationFrame(() => {
                glow.style.marginLeft = x * speed + 'px';
                glow.style.marginTop = y * speed + 'px';
            });
        });
    });

    // --- Typing effect for the copyright year ---
    const year = new Date().getFullYear();
    const footerP = document.querySelector('.footer p');
    if (footerP) {
        footerP.innerHTML = `&copy; ${year} ZION AI SOLUTIONS. Todos os direitos reservados.`;
    }

})();
