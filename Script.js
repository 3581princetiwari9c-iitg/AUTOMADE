// --- 1. TUNNEL GENERATOR (Fixes Infinite Scroll) ---
function initTunnel() {
    const container = document.getElementById('tunnel-container');
    if (!container) return;

    const boxHeight = 300; 
    
    // Calculate exact document height
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    
    // STRICT calculation: No extra buffer (+0) to stop scrolling exactly at the end
    const count = Math.ceil(docHeight / boxHeight);

    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const box = document.createElement('div');
        if (i % 2 === 0) {
            box.className = 'box';
        } else {
            box.className = 'box box2';
        }
        container.appendChild(box);
    }
}

// Recalculate on load and resize
window.addEventListener('load', initTunnel);
window.addEventListener('resize', initTunnel);

// --- 2. PARALLAX EFFECT ---
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = 'translateY(' + (scrollPosition * 0.4) + 'px)';
        heroContent.style.opacity = 1 - (scrollPosition / 700);
    }
});

// --- 3. SCROLL REVEAL ---
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- 4. 3D TILT EFFECT FOR CARDS ---
const cards = document.querySelectorAll('.glass-card, .bento-card, .pricing-card, .split-card, .kernel-card, .contact-form-card, .contact-info-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3; 
        const rotateY = ((x - centerX) / centerX) * 3;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// --- 5. FAQ & FORMS ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// --- UPDATED FORM SUBMISSION LOGIC ---
// YOUR NEW URL IS HERE:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwR01zHRKrv03INED06rBTJZE_iI5xoVbOXI1z5h8Ugv90tGf4RMoRPux6FuA18BmnH/exec";

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 1. UI: Show Loading State
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Transmitting...';
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;

        // 2. Data Collection: Manually build the object
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // 3. Send Data via Fetch
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            // CRITICAL: Send as stringified JSON without 'Content-Type' header
            body: JSON.stringify(formData)
        })
        .then(response => response.json()) // Parse JSON response from script
        .then(response => {
            if (response.result === "success") {
                // SUCCESS
                if (formStatus) {
                    formStatus.style.display = "block";
                    formStatus.style.color = "#00ff88";
                    formStatus.textContent = "Transmission successful.";
                }
                submitBtn.textContent = "Sent";
                contactForm.reset();
            } else {
                // SCRIPT ERROR
                throw new Error(response.error || "Unknown script error");
            }
        })
        .catch(error => {
            // NETWORK/CORS ERROR
            console.error('Submission Error:', error);
            if (formStatus) {
                formStatus.style.display = "block";
                formStatus.style.color = "#ff4444";
                formStatus.textContent = "Transmission failed. Check console.";
            }
            submitBtn.textContent = "Retry";
        })
        .finally(() => {
            // RESET BUTTON AFTER DELAY
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText || "Send Message";
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                if (formStatus) formStatus.style.display = "none";
            }, 5000);
        });
    });
}