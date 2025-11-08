// Modern JavaScript for JNL Segurança & Tecnologia
document.addEventListener('DOMContentLoaded', function () {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('show');
      
      // Animate hamburger icon
      this.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Hide/show header on scroll
    if (window.scrollY > lastScrollY && window.scrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = window.scrollY;
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.service-card, .feature-card, .section-header').forEach(el => {
    observer.observe(el);
  });
  
  // Form handling
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const clearFormBtn = document.getElementById('clearForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const phone = formData.get('phone');
      const service = formData.get('service');
      const message = formData.get('message').trim();
      
      // Validation
      if (!name || !email || !service || !message) {
        showFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFeedback('Por favor, insira um e-mail válido.', 'error');
        return;
      }
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        showFeedback('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }
  
  if (clearFormBtn) {
    clearFormBtn.addEventListener('click', () => {
      if (contactForm) {
        contactForm.reset();
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback';
      }
    });
  }
  
  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Show form feedback
  function showFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = 'form-feedback';
    
    if (type === 'error') {
      formFeedback.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
      formFeedback.style.color = '#dc3545';
      formFeedback.style.border = '1px solid rgba(220, 53, 69, 0.2)';
    } else if (type === 'success') {
      formFeedback.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
      formFeedback.style.color = '#28a745';
      formFeedback.style.border = '1px solid rgba(40, 167, 69, 0.2)';
    }
  }
  
  // Update copyright year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Add loading animation to page
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});