/* ========================================
   Smiling Viking Plumbing — Scripts
   ======================================== */

// Sticky header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile nav toggle
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');
mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile nav on link click
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Show floating CTA after scrolling past hero
const floatingCta = document.getElementById('floating-cta');
const hero = document.querySelector('.hero');
if (floatingCta && hero) {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (window.innerWidth <= 768) {
                floatingCta.style.display = entry.isIntersecting ? 'none' : 'flex';
            }
        },
        { threshold: 0 }
    );
    observer.observe(hero);
}

// Form submission handler
function handleFormSubmit(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        if (!data.name || !data.phone || !data.service) {
            return;
        }

        // Show success state
        const parent = form.parentElement;
        const isHeroForm = form.id === 'hero-form';

        parent.innerHTML = `
            <div class="form-success">
                <div class="form-success-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                </div>
                <h3>Thank You!</h3>
                <p>We received your request and will call you back within 1 hour during business hours.</p>
                <p style="margin-top: 12px; font-size: 14px; color: #64748b;">Need help now? Call <a href="tel:6505237473" style="color: #2563eb; font-weight: 600;">(650) 523-PIPE</a></p>
            </div>
        `;

        // Log for demo purposes (replace with real endpoint)
        console.log('Lead captured:', data);

        // In production, send to your backend:
        // fetch('/api/leads', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
    });
}

// Initialize forms
document.querySelectorAll('.lead-form').forEach(handleFormSubmit);

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .review-card, .why-item, .stat');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
};

// Run animations after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}
