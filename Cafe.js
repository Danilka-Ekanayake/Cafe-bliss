// Example JavaScript: Smooth scroll or interaction enhancements

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// FAQ Section
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;

    // Toggle answer visibility
    answer.classList.toggle('active');

    // Toggle aria-expanded attribute
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    question.setAttribute('aria-expanded', !isExpanded);
  });
});

// Responsive Hamburger Menu
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '<span></span><span></span><span></span>';

document.querySelector('.header').appendChild(hamburger);

const nav = document.querySelector('.nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('nav-active');
  hamburger.classList.toggle('toggle');
});

  const navLinks = document.querySelectorAll('.nav a');
  const currentUrl = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentUrl || linkHref === '') {
      link.classList.add('active');
    }
  });
document.addEventListener("DOMContentLoaded", () => {
  const greetingElement = document.getElementById("greeting");
  const dateElement = document.getElementById("date");
  const greetingContainer = document.getElementById("greeting-container");

  const now = new Date();
  const hours = now.getHours();

  // Greeting logic
  if (hours >= 0 && hours < 12) {
    greetingElement.textContent = "Good Morning! Sir/Mam";
  } else if (hours >= 12 && hours < 18) {
    greetingElement.textContent = "Good Afternoon! Sir/Mam";
  } else {
    greetingElement.textContent = "Good Evening! Sir/Mam";
  }
  /*customer review*/
  const swiper = new Swiper('.review-swiper', {
    loop: true,
    slidesPerView: 1, 
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  // Date display
  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  dateElement.textContent = formattedDate;
});
  const counters = document.querySelectorAll('.stat-value');
  let hasAnimated = false;

  function animateStats() {
    if (hasAnimated) return;

    const section = document.getElementById('stats');
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;

        const increment = target / 100;

        const updateCount = () => {
          count += increment;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target + (target >= 1000 ? '+' : '');
          }
        };

        updateCount();
      });

      hasAnimated = true;
    }
  }

  window.addEventListener('scroll', animateStats);

