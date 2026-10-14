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

    const reserveButton = header.querySelector('.reserve-btn');
    const actionWrapper = reserveButton ? reserveButton.closest('div') : null;
    if (actionWrapper) {
      header.insertBefore(toggleButton, actionWrapper);
    } else {
      header.appendChild(toggleButton);
    }
  }

  if (loadingScreen) {
    // Hide loading screen after 2.8s (2s delay + 0.8s fade animation)
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 2800);
  }

  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');

  if (contactForm && formToast) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      formToast.classList.add('show');
      contactForm.reset();
      setTimeout(() => {
        formToast.classList.remove('show');
      }, 2800);
    });
  }
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

// Responsive navigation
const header = document.querySelector('.header');
const nav = header ? header.querySelector('.nav') : null;

if (header && nav) {
  nav.id = nav.id || 'primary-navigation';

  let hamburger = header.querySelector('.hamburger');
  if (!hamburger) {
    hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.type = 'button';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(hamburger);
  }

  hamburger.setAttribute('aria-label', 'Open navigation menu');
  hamburger.setAttribute('aria-controls', nav.id);
  hamburger.setAttribute('aria-expanded', 'false');

  const setMenuOpen = (isOpen) => {
    nav.classList.toggle('nav-active', isOpen);
    hamburger.classList.toggle('toggle', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  };

  hamburger.addEventListener('click', () => {
    setMenuOpen(!nav.classList.contains('nav-active'));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('click', event => {
    if (!header.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('nav-active')) {
      setMenuOpen(false);
      hamburger.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1120) {
      setMenuOpen(false);
    }
  });
}

const navLinks = document.querySelectorAll('.nav a');
const currentUrl = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentUrl || linkHref === '') {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const greetingElement = document.getElementById("greeting");
  const dateElement = document.getElementById("date");

  if (!greetingElement || !dateElement) {
    return;
  }

  const now = new Date();
  const hours = now.getHours();

  if (hours >= 0 && hours < 12) {
    greetingElement.textContent = "Good Morning! Sir/ma'am";
  } else if (hours >= 12 && hours < 18) {
    greetingElement.textContent = "Good Afternoon! Sir/ma'am";
  } else {
    greetingElement.textContent = "Good Evening! Sir/ma'am";
  }

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
    if (hasAnimated || !counters.length) return;

    const section = document.getElementById('stats');
    if (!section) return;

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
