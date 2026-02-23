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

  // Hero video carousel (デスクトップのみ)
  const heroSlides = document.querySelectorAll('.hero-slide');
  let carouselInterval = null;
  let videosLoaded = { desktop: false, mobile: false };

  function isDesktop() {
    return window.innerWidth >= 769;
  }

  // 動画を読み込んで再生
  function loadVideo(video) {
    if (!video.src && video.dataset.src) {
      video.src = video.dataset.src;
      video.load();
    }
  }

  // モバイル: 1本目のみ読み込み
  function loadMobileVideo() {
    if (videosLoaded.mobile) return;
    const firstVideo = heroSlides[0]?.querySelector('video');
    if (firstVideo) {
      loadVideo(firstVideo);
      firstVideo.play();
      videosLoaded.mobile = true;
    }
  }

  // デスクトップ: 全動画読み込み
  function loadDesktopVideos() {
    if (videosLoaded.desktop) return;
    heroSlides.forEach(function(slide) {
      const video = slide.querySelector('video');
      if (video) {
        loadVideo(video);
        video.play();
      }
    });
    videosLoaded.desktop = true;
  }

  function startCarousel() {
    if (heroSlides.length > 1 && isDesktop() && !carouselInterval) {
      loadDesktopVideos();
      let currentSlide = 0;

      carouselInterval = setInterval(function() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
      }, 5000);
    }
  }

  function stopCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }

    // モバイルでは最初の動画のみ表示
    heroSlides.forEach(function(slide, index) {
      const video = slide.querySelector('video');
      if (index === 0) {
        slide.classList.add('active');
        if (video && video.src) video.play();
      } else {
        slide.classList.remove('active');
        if (video) video.pause();
      }
    });
  }

  // 初期化
  if (isDesktop()) {
    startCarousel();
  } else {
    loadMobileVideo();
  }

  // リサイズ時に切り替え
  window.addEventListener('resize', function() {
    if (isDesktop()) {
      startCarousel();
    } else {
      stopCarousel();
    }
  });

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
