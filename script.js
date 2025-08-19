const toggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar').querySelector('ul');

toggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
  
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate cards one by one with delay
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('show');
          }, index * 200); // 200ms delay between each card
        });
        observer.disconnect(); // stop observing once animated
      }
    });
  }, { threshold: 0.2 });

  observer.observe(document.querySelector('.cards'));
 

});
