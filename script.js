// Hamburger Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('show');
  menuToggle.setAttribute('aria-expanded', navbar.classList.contains('show'));
});

// Close menu when a nav link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', (e) => {
    navbar.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
    // Handle smooth scrolling with header offset
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault();
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// Carousel Functionality
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const dotsContainer = document.querySelector('.carousel-dots');
const quoteElement = document.querySelector('.hero-content .quote');
let currentIndex = Array.from(carouselItems).findIndex(item => item.classList.contains('active'));
let autoSlide;

// Create carousel dots
carouselItems.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-label', `Slide ${index + 1}`);
  dot.classList.toggle('active', index === currentIndex);
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dots span');

function updateCarousel() {
  carouselItems.forEach((item, index) => {
    item.classList.toggle('active', index === currentIndex);
    dots[index].classList.toggle('active', index === currentIndex);
  });
  quoteElement.textContent = carouselItems[currentIndex].dataset.quote;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
}

// Auto-slide every 5 seconds
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Event Listeners for Carousel
prevButton.addEventListener('click', () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

nextButton.addEventListener('click', () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    stopAutoSlide();
    currentIndex = index;
    updateCarousel();
    startAutoSlide();
  });
});

// Keyboard navigation for carousel
carouselInner.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  } else if (e.key === 'ArrowRight') {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  }
});

// Start auto-slide on page load
startAutoSlide();

// Pause auto-slide on hover
carouselInner.addEventListener('mouseenter', stopAutoSlide);
carouselInner.addEventListener('mouseleave', startAutoSlide);

// Back to Top Button
window.addEventListener('scroll', () => {
  const backToTop = document.querySelector('.back-to-top');
  backToTop.classList.toggle('show', window.scrollY > 300);
});

document.querySelector('.back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form Validation and Submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  const honeypot = document.querySelector('input[name="honeypot"]').value;
  const successMessage = document.querySelector('.success-message');
  const errorMessage = document.querySelector('.error-message');

  // Reset messages
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';

  // Honeypot check
  if (honeypot !== '') {
    errorMessage.textContent = 'Spam detected. Please try again.';
    errorMessage.style.display = 'block';
    return;
  }

  // Phone validation
  if (!/^[6-9][0-9]{9}$/.test(phone)) {
    errorMessage.textContent = 'Please enter a valid 10-digit Indian phone number.';
    errorMessage.style.display = 'block';
    return;
  }

  try {
    // Simulate form submission (replace with actual API call)
    console.log('Form submitted:', { name, phone, message });

    // Show success message
    successMessage.style.display = 'block';

    // Redirect to WhatsApp after 2 seconds
    setTimeout(() => {
      window.location.href = 'https://wa.me/919553783239?text=' + encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nMessage: ${message}`);
    }, 2000);
  } catch (error) {
    errorMessage.textContent = 'Failed to send message. Please try again.';
    errorMessage.style.display = 'block';
  }
});