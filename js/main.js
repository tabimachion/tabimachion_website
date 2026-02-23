// 旅と街と音楽と - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-list a');

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Close menu when clicking a link
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    '.section-header, .about-content, .about-features .feature-card, ' +
    '.service-card, .brand-card, .work-card, .team-card, ' +
    '.company-content, .contact-content, .works-clients'
  );

  animatedElements.forEach(function(el, index) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.transitionDelay = (index % 4) * 0.08 + 's';
    observer.observe(el);
  });

  // Hero video carousel
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    const slideInterval = 5000; // 5秒ごとに切り替え

    function nextSlide() {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);
  }

  // Close mobile menu on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Prevent scroll when menu is open on mobile
  nav.addEventListener('touchmove', function(e) {
    if (nav.classList.contains('active')) {
      e.preventDefault();
    }
  }, { passive: false });
});
