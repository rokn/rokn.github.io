// Global data storage
let portfolioData = null;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  initParticles();
  initNavigation();
  initScrollAnimations();
  populateHero();
  populateJourney();
  populateSkills();
  populateInterests();
  populatePhilosophy();
  populateLinks();
  populateContact();
  initTimeline();
  setCurrentYear();
});

// Load data from JSON file
async function loadData() {
  try {
    const response = await fetch('data.json');
    portfolioData = await response.json();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Particle system
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 80;
  const connectionDistance = 150;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 212, 255, ${(1 - distance / connectionDistance) * 0.2})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Navigation
function initNavigation() {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Populate Hero Section
function populateHero() {
  if (!portfolioData) return;

  const { personal } = portfolioData;

  document.getElementById('hero-subtitle').textContent = personal.title;
  document.getElementById('hero-bio').textContent = personal.bio;

  // Social links
  document.getElementById('github-link').href = `https://github.com/${personal.github}`;
  document.getElementById('linkedin-link').href = `https://linkedin.com/in/${personal.linkedin}`;
  document.getElementById('email-link').href = `mailto:${personal.email}`;

  // Typing effect for subtitle
  typeWriter(document.getElementById('hero-subtitle'), personal.title, 50);
}

// Typing effect
function typeWriter(element, text, speed) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Populate Journey Timeline
function populateJourney() {
  if (!portfolioData) return;

  const timeline = document.getElementById('timeline');
  const { journey } = portfolioData;

  timeline.innerHTML = journey.map(item => `
    <div class="timeline-item" data-type="${item.type}" data-icon="${item.icon}">
      <div class="timeline-card">
        <div class="timeline-header">
          <span class="timeline-period">${item.period}</span>
          <h3 class="timeline-title">${item.title}</h3>
          <p class="timeline-subtitle">${item.subtitle}</p>
          <p class="timeline-organization">${item.organization}</p>
        </div>
        <p class="timeline-description">${item.description}</p>
        <div class="timeline-tags">
          ${item.tags.map(tag => `<span class="timeline-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Timeline filtering
function initTimeline() {
  const filters = document.querySelectorAll('.timeline-filter');
  const items = document.querySelectorAll('.timeline-item');

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Update active state
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      const filterValue = filter.dataset.filter;

      items.forEach(item => {
        if (filterValue === 'all' || item.dataset.type === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// Populate Skills
function populateSkills() {
  if (!portfolioData) return;

  const skillsGrid = document.getElementById('skills-grid');
  const { skills } = portfolioData;

  const categories = [
    { title: 'Programming Languages', items: skills.languages },
    { title: 'Technologies & Frameworks', items: skills.technologies },
    { title: 'Databases', items: skills.databases },
    { title: 'Cloud & DevOps', items: skills.cloud }
  ];

  skillsGrid.innerHTML = categories.map(category => `
    <div class="skill-category">
      <h3 class="skill-category-title">${category.title}</h3>
      <div class="skill-items">
        ${category.items.map(item => `<span class="skill-item">${item}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// Populate Interests
function populateInterests() {
  if (!portfolioData) return;

  const interestsGrid = document.getElementById('interests-grid');
  const { interests } = portfolioData;

  interestsGrid.innerHTML = interests.map(interest => `
    <div class="interest-card">
      <div class="interest-icon">${interest.icon}</div>
      <h3 class="interest-name">${interest.name}</h3>
      <p class="interest-description">${interest.description}</p>
      <span class="interest-level">${interest.level}</span>
    </div>
  `).join('');
}

// Populate Philosophy
function populatePhilosophy() {
  if (!portfolioData) return;

  const { philosophy, personal } = portfolioData;

  document.getElementById('philosophy-title').textContent = philosophy.title;
  document.getElementById('philosophy-content').textContent = philosophy.content;
  document.getElementById('philosophy-quote').textContent = personal.quote;
}

// Populate Links
function populateLinks() {
  if (!portfolioData) return;

  const linksGrid = document.getElementById('links-grid');
  const { links } = portfolioData;

  linksGrid.innerHTML = links.map(link => `
    <a href="${link.url}" class="link-card" target="_blank" rel="noopener noreferrer">
      <h3 class="link-title">${link.title}</h3>
      <p class="link-description">${link.description}</p>
      <span class="link-arrow">→</span>
    </a>
  `).join('');
}

// Populate Contact
function populateContact() {
  if (!portfolioData) return;

  const { personal } = portfolioData;

  document.getElementById('contact-email').href = `mailto:${personal.email}`;
  document.getElementById('contact-email-text').textContent = personal.email;

  document.getElementById('contact-phone').href = `tel:${personal.phone.replace(/\s/g, '')}`;
  document.getElementById('contact-phone-text').textContent = personal.phone;

  document.getElementById('contact-location-text').textContent = personal.location;
}

// Set current year in footer
function setCurrentYear() {
  document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Add parallax effect to sections
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-content');

  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Smooth reveal on scroll for cards
const revealOnScroll = () => {
  const cards = document.querySelectorAll('.timeline-card, .skill-category, .interest-card, .link-card');

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (cardTop < windowHeight - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', revealOnScroll);

// Mouse trail effect removed per user request

// Interactive hover effects for skills
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
      item.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1) rotate(3deg)';
      });

      item.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) rotate(0deg)';
      });
    });
  }, 1000);
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add CSS for ripple animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.join(',') === konamiPattern.join(',')) {
    // Easter egg activated!
    document.body.style.animation = 'rainbow 5s linear infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(rainbowStyle);

// Performance optimization: Lazy load images
const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

lazyLoadImages();

// Add visual feedback to timeline cards
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const timelineCards = document.querySelectorAll('.timeline-card');

    timelineCards.forEach((card, index) => {
      card.addEventListener('click', function () {
        // Remove active class from all cards
        timelineCards.forEach(c => c.classList.remove('active'));

        // Add active class to clicked card
        this.classList.add('active');

        // Add a visual pulse effect
        this.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
          this.style.animation = '';
        }, 500);
      });
    });
  }, 1000);
});

// Intersection Observer for fade-in animations
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  const elements = document.querySelectorAll('.timeline-item, .skill-category, .interest-card, .link-card');
  elements.forEach(el => observer.observe(el));
};

// Call after content is loaded
setTimeout(observeElements, 500);
