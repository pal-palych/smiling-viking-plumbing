/* ========================================
   Smiling Viking Plumbing — Scripts
   ======================================== */

// Lightbox
let currentLightboxIndex = 0;
const galleryItems = () => document.querySelectorAll('.gallery-item');

function openLightbox(el) {
    const items = galleryItems();
    currentLightboxIndex = Array.from(items).indexOf(el);
    const img = el.querySelector('img');
    const caption = el.querySelector('.gallery-caption');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    // For Google images, request full resolution by replacing =w800 with =w1600
    let src = img.src.replace('=w800', '=w1600');
    lightboxImg.src = src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    if (e.target.classList.contains('lightbox') || e.target.classList.contains('lightbox-close')) {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
    }
}

function navigateLightbox(dir, e) {
    e.stopPropagation();
    const items = galleryItems();
    currentLightboxIndex = (currentLightboxIndex + dir + items.length) % items.length;
    const item = items[currentLightboxIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');
    let src = img.src.replace('=w800', '=w1600');
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox-img').alt = img.alt;
    document.getElementById('lightbox-caption').textContent = caption ? caption.textContent : '';
}

document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
    if (e.key === 'ArrowLeft') navigateLightbox(-1, e);
    if (e.key === 'ArrowRight') navigateLightbox(1, e);
});

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
