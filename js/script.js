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
      this.classList.toggle('active');
    });
  }

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
      header.style.backgroundColor = 'rgba(252, 255, 89, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = 'rgba(252, 255, 89, 0.95)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    if (window.scrollY > lastScrollY && window.scrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = window.scrollY;
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // Slideshow
  function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const slideText = document.getElementById('slideText');
    const slideSubtext = document.getElementById('slideSubtext');

    const texts = [
      { title: 'Segurança e energia com excelência', subtitle: 'Soluções completas em segurança eletrônica e serviços elétricos' },
      { title: 'Protegendo o que realmente importa', subtitle: 'Segurança Eletrônica de última geração' },
      { title: 'Serviços Elétricos com qualidade e confiança', subtitle: 'Profissionais certificados e experientes' }
    ];

    let current = 0;
    function nextSlide() {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
      slideText.textContent = texts[current].title;
      slideSubtext.textContent = texts[current].subtitle;
    }
    setInterval(nextSlide, 5000);
  }
  initSlideshow();

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-in');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.service-card, .feature-card, .section-header').forEach(el => observer.observe(el));

  // === FORMULÁRIO DE CONTATO VIA WHATSAPP ===
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const clearFormBtn = document.getElementById('clearForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const phone = formData.get('phone').trim();
      const service = formData.get('service');
      const message = formData.get('message').trim();

      if (!name || !email || !service || !message) {
        showFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showFeedback('Por favor, insira um e-mail válido.', 'error');
        return;
      }

      const texto = `*Novo orçamento via site JNL:*\n\n` +
        `*Nome:* ${name}\n` +
        `*E-mail:* ${email}\n` +
        `*Telefone:* ${phone}\n` +
        `*Serviço:* ${service}\n` +
        `*Mensagem:* ${message}`;

      const numero = '5514991580947'; // SEU WHATSAPP COM DDI+DDD
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

      showFeedback('Abrindo WhatsApp...', 'success');
      window.open(url, '_blank');
      contactForm.reset();
      showFeedback("Continue no WhatsApp")

      setTimeout(() => {
  showFeedback("Obrigado por sua mensagem");
}, 3000);
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

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

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

  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  window.addEventListener('load', () => document.body.classList.add('loaded'));

  // loadFakeGallery();
  loadFakeReviews();

  loadLocalGallery()
});

// === FAKE GALLERY + FAKE REVIEWS (testes locais) ===
function loadFakeGallery() {
  const gallery = document.getElementById('galleryGrid');
  gallery.innerHTML = '';
  const fakeImages = [
    'assets/galeria/trabalho1.jpg',
    'assets/galeria/trabalho2.jpg',
    'assets/galeria/trabalho3.jpg',
    'assets/galeria/trabalho4.jpg',
    'assets/galeria/trabalho5.jpg'
  ];
  fakeImages.forEach(src => {
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-item';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Trabalho realizado';
    wrapper.appendChild(img);
    gallery.appendChild(wrapper);
  });
}

function loadFakeReviews() {
  const reviews = [
    { name: 'João Martins', date: '10/11/2025', text: 'Serviço excelente — equipe pontual e trabalho impecável. Recomendo 100%.', avatar: 'https://i.pravatar.cc/80?img=12' },
    { name: 'Carla Souza', date: '02/10/2025', text: 'Rápidos e profissionais. Instalação perfeita e suporte ótimo.', avatar: 'https://i.pravatar.cc/80?img=32' },
    { name: 'Rafael Lima', date: '21/09/2025', text: 'Preço justo e serviço de qualidade. Voltaria a contratar.', avatar: 'https://i.pravatar.cc/80?img=45' },
    { name: 'Mariana A.', date: '17/08/2025', text: 'Equipe muito preparada. Resolveram problemas antigos.', avatar: 'https://i.pravatar.cc/80?img=8' }
  ];

  const container = document.getElementById('reviews');
  container.innerHTML = '';
  reviews.forEach(r => {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
      <p>"${r.text}"</p>
      <div class="meta">
        <div class="review-avatar"><img src="${r.avatar}" alt="${r.name}"></div>
        <div>
          <div class="review-name">${r.name} <span class="review-date">· ${r.date}</span></div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}



// === GALERIA REAL - Google Drive ===
function loadLocalGallery() {
  const gallery = document.getElementById("galleryGrid");

  const imagens = [
    "assets/galeria/trabalho1.jpeg",
    "assets/galeria/trabalho2.jpeg",
    "assets/galeria/trabalho3.jpeg",

    "assets/galeria/trabalho4.jpeg",
    "assets/galeria/trabalho5.jpeg"
  ];

  gallery.innerHTML = "";

  imagens.forEach(src => {
    const item = document.createElement("div");
    item.className = "gallery-item";

    const img = document.createElement("img");
    img.src = src;

    item.appendChild(img);
    gallery.appendChild(item);
  });
}





