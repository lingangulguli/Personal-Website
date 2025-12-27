// Portfolio - Main JavaScript
// Theme Toggle + Interactive Timeline + Copy Phone

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavigation();
    initTimeline();
    initScrollAnimations();
});

// Copy Phone Function
function copyPhone() {
    const phones = '+1 (571) 413-7511\n+86 177-1063-7189';
    navigator.clipboard.writeText(phones).then(() => {
        const toast = document.getElementById('copyToast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 1500);
        }
    }).catch(err => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = phones;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        const toast = document.getElementById('copyToast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 1500);
        }
    });
}

// Make copyPhone globally available
window.copyPhone = copyPhone;

// Theme Toggle
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
    
    // Mobile toggle
    navToggle?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('active');
        });
    });
}

// Interactive Timeline
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            // Toggle active state
            const wasActive = item.classList.contains('active');
            
            // Close all items first
            timelineItems.forEach(i => i.classList.remove('active'));
            
            // If wasn't active, open this one
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Gallery Slider with Dots
function slideGallery(btn, direction) {
    const gallery = btn.closest('.timeline-gallery');
    const track = gallery.querySelector('.gallery-track');
    const dots = gallery.querySelectorAll('.gallery-dot');
    const images = track.querySelectorAll('img');
    const totalImages = images.length;
    
    // Get current index from active dot
    let currentIndex = 0;
    dots.forEach((dot, i) => {
        if (dot.classList.contains('active')) currentIndex = i;
    });
    
    // Calculate new index
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= totalImages) newIndex = totalImages - 1;
    
    // Move track
    track.style.transform = `translateX(-${newIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === newIndex);
    });
}

// Click on dot to go to that slide
function goToSlide(dot, index) {
    const gallery = dot.closest('.timeline-gallery');
    const track = gallery.querySelector('.gallery-track');
    const dots = gallery.querySelectorAll('.gallery-dot');
    
    track.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });
}

window.slideGallery = slideGallery;
window.goToSlide = goToSlide;
