

    // Hamburger Menu
    const toggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const header = document.querySelector('.header');
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    toggle.addEventListener('click', () => {
      navbar.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Active Link Highlighting
    const navLinks = document.querySelectorAll('.navbar a:not(.header-contact a)');
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
          link.classList.add('active');
        }
      });
      header.classList.toggle('scrolled', window.pageYOffset > 50);
    });

    // Intersection Observer for Card Animations
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.card');
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('show'), i * 100);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.cards').forEach(cardSection => {
      observer.observe(cardSection);
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
        if (navbar.classList.contains('active')) {
          navbar.classList.remove('active');
          toggle.classList.remove('active');
        }
      });
    });

    // Carousel
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    const quoteEl = document.querySelector('.quote');
    const heroContent = document.querySelector('.hero-content');
    const dotsContainer = document.querySelector('.carousel-dots');
    const carousel = document.querySelector('.carousel');
    let currentIndex = 0;
    let autoSlideInterval;

    // Create Dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.setAttribute('role', 'tab');
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoSlide();
      });
      dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll('button');

    function updateDots(index) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index);
        dot.setAttribute('tabindex', i === index ? '0' : '-1');
      });
    }

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      const newQuote = slides[index].getAttribute('data-quote');
      quoteEl.textContent = newQuote;
      heroContent.classList.remove('fade-in');
      void heroContent.offsetWidth;
      heroContent.classList.add('fade-in');
      updateDots(index);
    }

    function goToSlide(index) {
      currentIndex = index;
      showSlide(currentIndex);
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      showSlide(currentIndex);
    }

    document.querySelector('.carousel-control.next').addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });

    document.querySelector('.carousel-control.prev').addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });

    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoSlide();
      }
    });

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    showSlide(currentIndex);
    startAutoSlide();

    // Form Submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();
      if (name && phone.match(/^[0-9]{10}$/)) {
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending...';
        const rawMessage = `New Inquiry from Green Gold Valley Website:\nName: ${name}\nPhone: ${phone}\nMessage: ${message || 'No message provided'}`;
        const whatsappMessage = encodeURIComponent(rawMessage);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=919553783239&text=${whatsappMessage}`;
        setTimeout(() => {
          form.classList.add('success');
          setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            form.reset();
            form.classList.remove('success');
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Submit';
          }, 1500);
        }, 500);
      } else {
        alert('Please enter a valid name and 10-digit phone number.');
      }
    });


    document.addEventListener("DOMContentLoaded", () => {
      const items = document.querySelectorAll(".carousel-item");
      const dotsContainer = document.querySelector(".carousel-dots");
      const quoteElement = document.querySelector(".quote");
      let current = 0;
      let interval;

      function showSlide(index) {
        items.forEach((item, i) => {
          item.classList.remove("active");
          dotsContainer.children[i].classList.remove("active");
        });
        items[index].classList.add("active");
        dotsContainer.children[index].classList.add("active");
        quoteElement.textContent = `“${items[index].dataset.quote}”`;
        current = index;
      }

      function nextSlide() {
        const next = (current + 1) % items.length;
        showSlide(next);
      }

      function prevSlide() {
        const prev = (current - 1 + items.length) % items.length;
        showSlide(prev);
      }

      function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
      }

      // Create dots
      items.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        if (i === current) dot.classList.add("active");
        dot.addEventListener("click", () => {
          showSlide(i);
          resetInterval();
        });
        dotsContainer.appendChild(dot);
      });

      // Controls
      document.querySelector(".carousel-control.next").addEventListener("click", () => {
        nextSlide();
        resetInterval();
      });

      document.querySelector(".carousel-control.prev").addEventListener("click", () => {
        prevSlide();
        resetInterval();
      });

      // Initialize
      showSlide(current);
      interval = setInterval(nextSlide, 5000);
    });
