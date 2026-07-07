// Loading Screen Handler
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const header = document.querySelector('.header');

  if (header && !header.querySelector('.theme-toggle')) {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.type = 'button';
    toggleButton.innerHTML = '<i class="fas fa-moon"></i> <span>Dark</span>';

    const applyTheme = (theme) => {
      document.body.classList.toggle('light-mode', theme === 'light');
      const icon = toggleButton.querySelector('i');
      const label = toggleButton.querySelector('span');
      if (theme === 'light') {
        icon.className = 'fas fa-sun';
        label.textContent = 'Light';
      } else {
        icon.className = 'fas fa-moon';
        label.textContent = 'Dark';
      }
      localStorage.setItem('cafe-theme', theme);
    };

    const savedTheme = localStorage.getItem('cafe-theme') || 'dark';
    applyTheme(savedTheme);

    toggleButton.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
      applyTheme(nextTheme);
    });

    const actionWrapper = header.querySelector('div:last-of-type');
    if (actionWrapper) {
      header.insertBefore(toggleButton, actionWrapper);
    } else {
      header.appendChild(toggleButton);
    }
  }

  // Hide loading screen after 2.8s (2s delay + 0.8s fade animation)
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 2800);
});

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
    greetingElement.textContent = "Good Morning! Sir/ma'am";
  } else if (hours >= 12 && hours < 18) {
    greetingElement.textContent = "Good Afternoon! Sir/ma'am";
  } else {
    greetingElement.textContent = "Good Evening! Sir/ma'am";
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

