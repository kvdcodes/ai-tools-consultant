// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    navActions.classList.toggle('show');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      navLinks.classList.remove('show');
      navActions.classList.remove('show');
    }
  });
});

// Fade-in on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .work-item, .stat').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .nav-links.show,
  .nav-actions.show {
    display: flex !important;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--cream);
    padding: 1.5rem;
    gap: 1rem;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    align-items: flex-start;
  }
`;
document.head.appendChild(style);
