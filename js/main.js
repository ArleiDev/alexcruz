/**
 * ALEX CRUZ - PROGRAMA 12 SEMANAS
 * Interações, Animações de Contadores, FAQ Accordion e Header Dinâmico
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });

  // 3. Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 4. Interactive Timeline Step Highlights
  const timelineSteps = document.querySelectorAll('.timeline-step');
  timelineSteps.forEach((step) => {
    step.addEventListener('mouseenter', () => {
      timelineSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });

  // 5. Number counter animation
  const counterElements = document.querySelectorAll('.animate-num');
  let animated = false;

  const animateCounters = () => {
    counterElements.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out quint
        const easeOutProgress = 1 - Math.pow(1 - progress, 4);
        const currentVal = Math.floor(target * easeOutProgress);

        el.textContent = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = `${prefix}${target}${suffix}`;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  // Intersection observer for counters
  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.2 });

    const metricsSection = document.querySelector('.results-section');
    if (metricsSection) {
      observer.observe(metricsSection);
    }
  }

  // 6. Mobile navigation toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking any link
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
      });
    });
  }
});
