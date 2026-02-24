// 旅と街と音楽と - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-list a');

  // Hero fade-in animation
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const heroScroll = document.querySelector('.hero-scroll');

  // ヒーロー全体を最初は非表示にしてフェードイン
  if (hero) {
    hero.style.opacity = '0';
    hero.style.transition = 'opacity 0.8s ease';
    setTimeout(function() {
      hero.style.opacity = '1';
    }, 100);
  }

  // コンテンツは遅れてフェードイン
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(40px)';
    heroContent.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(function() {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 600);
  }
  if (heroScroll) {
    heroScroll.style.opacity = '0';
    heroScroll.style.transition = 'opacity 1s ease';
    setTimeout(function() {
      heroScroll.style.opacity = '1';
    }, 1500);
  }

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

  // Observe elements for animation (staggered)
  const animatedElements = document.querySelectorAll(
    '.section-header, .about-content, .feature-item, ' +
    '.service-item, .brand-item, .work-card, ' +
    '.company-content, .contact-content, .partner-item'
  );

  animatedElements.forEach(function(el, index) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    el.style.transitionDelay = (index % 6) * 0.1 + 's';
    observer.observe(el);
  });

  // Team cards - 同時に表示
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });

  // サービス動画のlazyロード
  const videoObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const video = entry.target;
        video.play();
        videoObserver.unobserve(video);
      }
    });
  }, { rootMargin: '100px' });

  document.querySelectorAll('.service-media video').forEach(function(video) {
    videoObserver.observe(video);
  });

  // Hero video carousel（モバイル・デスクトップ共通）
  const heroSlides = document.querySelectorAll('.hero-slide');
  let carouselInterval = null;
  let videosLoaded = false;

  // 動画を読み込んで再生
  function loadVideo(video) {
    if (!video.src && video.dataset.src) {
      video.src = video.dataset.src;
      video.load();
    }
  }

  // 全動画読み込み
  function loadAllVideos() {
    if (videosLoaded) return;
    heroSlides.forEach(function(slide) {
      const video = slide.querySelector('video');
      if (video) {
        loadVideo(video);
        video.play();
      }
    });
    videosLoaded = true;
  }

  function startCarousel() {
    if (heroSlides.length > 1 && !carouselInterval) {
      loadAllVideos();
      let currentSlide = 0;

      carouselInterval = setInterval(function() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
      }, 5000);
    }
  }

  // 初期化
  startCarousel();

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

  // Email copy to clipboard
  var emailLink = document.getElementById('email-link');
  if (emailLink) {
    emailLink.addEventListener('click', function(e) {
      e.preventDefault();
      var user = 'info';
      var domain = 'tabimachion.com';
      var email = user + '@' + domain;
      navigator.clipboard.writeText(email).then(function() {
        var originalText = emailLink.textContent;
        emailLink.textContent = 'コピーしました！';
        setTimeout(function() {
          emailLink.textContent = originalText;
        }, 2000);
      });
    });
  }
});
