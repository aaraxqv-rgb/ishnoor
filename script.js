// ===== LOADER ANIMATION =====
window.addEventListener('load', function() {
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.style.display = 'none';
  }, 3000);
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===== SMOOTH SCROLL WITH NAVBAR OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const updateActiveNav = () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === currentSection) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveNav);

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.category-card, .social-card, .featured-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s ease-out';
  observer.observe(el);
});

// ===== BACK-TO-TOP BUTTON =====
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.remove('hidden');
  } else {
    backToTopBtn.classList.add('hidden');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== STAR RATING =====
const ratingInputs = document.querySelectorAll('input[name="rating"]');
let selectedRating = 5;

ratingInputs.forEach(input => {
  input.addEventListener('change', function() {
    selectedRating = this.value;
  });
});

// ===== FEEDBACK FORM HANDLING =====
const feedbackForm = document.querySelector('#feedbackForm');
const feedbackSuccess = document.querySelector('#feedbackSuccess');

feedbackForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.querySelector('#feedback-name').value;
  const email = document.querySelector('#feedback-email').value;
  const message = document.querySelector('#feedback-message').value;
  const rating = selectedRating;
  
  // Validate
  if (!name || !email || !message) {
    alert('Please fill all fields');
    return;
  }
  
  // Store in localStorage
  const feedback = {
    name: name,
    email: email,
    message: message,
    rating: rating,
    timestamp: new Date().toISOString()
  };
  
  let allFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
  allFeedback.push(feedback);
  localStorage.setItem('feedback', JSON.stringify(allFeedback));
  
  // Show success message
  feedbackSuccess.classList.add('show');
  feedbackSuccess.style.display = 'block';
  
  // Reset form
  feedbackForm.reset();
  selectedRating = 5;
  document.querySelector('#rating-5').checked = true;
  
  // Hide success message after 4 seconds
  setTimeout(() => {
    feedbackSuccess.classList.remove('show');
    setTimeout(() => {
      feedbackSuccess.style.display = 'none';
    }, 300);
  }, 4000);
});

// ===== SOCIAL CARD LINKS (Already handle clicks via anchor tags) =====
document.querySelectorAll('.social-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.textDecoration = 'none';
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== BUTTON HOVER EFFECTS =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.letterSpacing = '0.5px';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.letterSpacing = 'normal';
  });
});

// ===== PARALLAX EFFECT FOR HERO IMAGE =====
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition < 1000) {
      heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
  });
}

// ===== FORM VALIDATION IN REAL-TIME =====
const emailInput = document.querySelector('#feedback-email');

if (emailInput) {
  emailInput.addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
      this.style.borderColor = '#222222';
    } else {
      this.style.borderColor = '#cccccc';
    }
  });
}

// ===== PAGE VISIBILITY =====
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden
  } else {
    // Page is visible again
    updateActiveNav();
  }
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  backToTopBtn.classList.add('hidden');
});

// ===== PERFORMANCE OPTIMIZATION =====
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveNav();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ===== SMOOTH SCROLL FALLBACK FOR OLDER BROWSERS =====
if (!window.CSS || !window.CSS.supports('scroll-behavior', 'smooth')) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'auto' });
      }
    });
  });
}
