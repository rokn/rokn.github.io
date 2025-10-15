// Global data storage
let portfolioData = null;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  initParticles();
  initNavigation();
  initScrollAnimations();
  populateHero();
  populateSections();
  populateJourney();
  populateSkills();
  populateInterests();
  populatePhilosophy();
  populateLinks();
  populateContact();
  initTimeline();
  initBioNeuralVisualization();
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
  const mouseConnectionDistance = 200;
  const mouseAttractionForce = 0.008; // Reduced from 0.02 for gentler pull
  const mouseRepulsionDistance = 50; // Distance at which particles are repelled

  // Mouse position tracking
  const mouse = {
    x: null,
    y: null,
    radius: mouseConnectionDistance
  };

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
      this.baseVx = this.vx;
      this.baseVy = this.vy;
    }

    update() {
      // Apply mouse attraction with repulsion when too close
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRepulsionDistance && distance > 0) {
          // Repel particles that get too close
          const repulsionForce = (1 - distance / mouseRepulsionDistance) * 0.05;
          this.vx -= (dx / distance) * repulsionForce;
          this.vy -= (dy / distance) * repulsionForce;
        } else if (distance < mouse.radius && distance > 0) {
          // Attract particles within range but not too close
          const force = (1 - distance / mouse.radius) * mouseAttractionForce;
          this.vx += (dx / distance) * force;
          this.vy += (dy / distance) * force;
        }
      }

      // Apply velocity damping to return to base speed
      this.vx *= 0.98;
      this.vy *= 0.98;

      // Keep some base movement
      this.vx += this.baseVx * 0.02;
      this.vy += this.baseVy * 0.02;

      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) {
        this.vx *= -1;
        this.baseVx *= -1;
      }
      if (this.y < 0 || this.y > canvas.height) {
        this.vy *= -1;
        this.baseVy *= -1;
      }
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

    // Draw connections between particles
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

    // Draw connections between mouse and nearby particles
    if (mouse.x != null && mouse.y != null) {
      particles.forEach(particle => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseConnectionDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(124, 58, 237, ${(1 - distance / mouseConnectionDistance) * 0.4})`;
          ctx.lineWidth = 2;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
    }

    requestAnimationFrame(animate);
  }

  animate();

  // Mouse event listeners - listen on window to capture all mouse movement
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

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

// Typing effect with cursor
function typeWriter(element, text, speed) {
  let i = 0;
  element.textContent = '';

  // Add cursor (insert mode - thin bar)
  element.innerHTML = '<span class="typing-cursor insert-mode">|</span>';

  function type() {
    if (i < text.length) {
      const cursor = element.querySelector('.typing-cursor');
      const currentText = text.substring(0, i + 1);
      element.innerHTML = currentText + '<span class="typing-cursor insert-mode">|</span>';
      i++;
      setTimeout(type, speed);
    } else {
      // Switch to normal mode (block cursor) after typing is complete
      setTimeout(() => {
        // Get the last character for the block cursor
        const lastChar = text.charAt(text.length - 1);
        const textWithoutLast = text.substring(0, text.length - 1);
        element.innerHTML = textWithoutLast + '<span class="typing-cursor normal-mode">' + lastChar + '</span>';

        // Remove cursor after 2.5 flashes (2.5 seconds)
        setTimeout(() => {
          element.innerHTML = text;
        }, 2500);
      }, 500);
    }
  }

  type();
}

// Populate Section Titles and Descriptions
function populateSections() {
  if (!portfolioData || !portfolioData.sections) return;

  const { sections } = portfolioData;

  // Populate Journey section
  if (sections.journey) {
    const journeyTitle = document.getElementById('journey-title');
    const journeyDescription = document.getElementById('journey-description');
    if (journeyTitle) journeyTitle.textContent = sections.journey.title;
    if (journeyDescription) journeyDescription.textContent = sections.journey.description;
  }

  // Populate Skills section
  if (sections.skills) {
    const skillsTitle = document.getElementById('skills-title');
    if (skillsTitle) skillsTitle.textContent = sections.skills.title;
  }

  // Populate Interests section
  if (sections.interests) {
    const interestsTitle = document.getElementById('interests-title');
    const interestsDescription = document.getElementById('interests-description');
    if (interestsTitle) interestsTitle.textContent = sections.interests.title;
    if (interestsDescription) interestsDescription.textContent = sections.interests.description;
  }

  // Populate Links section
  if (sections.links) {
    const linksTitle = document.getElementById('links-title');
    const linksDescription = document.getElementById('links-description');
    if (linksTitle) linksTitle.textContent = sections.links.title;
    if (linksDescription) linksDescription.textContent = sections.links.description;
  }

  // Populate Contact section
  if (sections.contact) {
    const contactTitle = document.getElementById('contact-title');
    const contactDescription = document.getElementById('contact-description');
    if (contactTitle) contactTitle.textContent = sections.contact.title;
    if (contactDescription) contactDescription.textContent = sections.contact.description;
  }
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

  // Add DNA Helix SVG
  createDNAHelix();
}

// Create animated DNA helix
function createDNAHelix() {
  const timeline = document.getElementById('timeline');
  const timelineHeight = timeline.scrollHeight;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'dna-helix');
  svg.setAttribute('width', '160');
  svg.setAttribute('height', timelineHeight);
  svg.style.position = 'absolute';
  svg.style.left = '50%';
  svg.style.top = '0';
  svg.style.transform = 'translateX(-50%)';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '1';

  // Create smooth DNA helix starting at maximum separation
  const centerX = 80;
  const amplitude = 40; // Width of the helix
  const wavelength = 400; // Length of one complete wave cycle
  const segmentLength = 10; // Distance between points for smooth curves
  const numPoints = Math.ceil(timelineHeight / segmentLength);
  const startPhase = Math.PI / 2; // Start at maximum separation (90 degrees)

  // Build arrays of points for both strands
  const leftPoints = [];
  const rightPoints = [];
  const connections = [];

  for (let i = 0; i <= numPoints; i++) {
    const y = i * segmentLength;
    const angle = (y / wavelength) * Math.PI * 2 + startPhase;
    const leftX = centerX + Math.sin(angle) * amplitude;
    const rightX = centerX - Math.sin(angle) * amplitude;

    leftPoints.push({ x: leftX, y: y });
    rightPoints.push({ x: rightX, y: y });

    // Add connection bars regularly (DNA base pairs)
    if (i % 4 === 0 && y > 0 && y < timelineHeight) {
      connections.push({ y, leftX, rightX });
    }
  }

  // Create smooth curves using quadratic bezier
  function createSmoothPath(points) {
    if (points.length === 0) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      path += ` Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
    }

    // Final point
    const last = points[points.length - 1];
    path += ` T ${last.x} ${last.y}`;

    return path;
  }

  const leftPath = createSmoothPath(leftPoints);
  const rightPath = createSmoothPath(rightPoints);

  // Create left strand
  const leftStrand = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  leftStrand.setAttribute('d', leftPath);
  leftStrand.setAttribute('stroke', 'url(#grad-helix-1)');
  leftStrand.setAttribute('stroke-width', '3');
  leftStrand.setAttribute('fill', 'none');
  leftStrand.setAttribute('stroke-linecap', 'round');

  // Create right strand
  const rightStrand = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  rightStrand.setAttribute('d', rightPath);
  rightStrand.setAttribute('stroke', 'url(#grad-helix-2)');
  rightStrand.setAttribute('stroke-width', '3');
  rightStrand.setAttribute('fill', 'none');
  rightStrand.setAttribute('stroke-linecap', 'round');

  // Create gradients
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

  const grad1 = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  grad1.setAttribute('id', 'grad-helix-1');
  grad1.setAttribute('x1', '0%');
  grad1.setAttribute('y1', '0%');
  grad1.setAttribute('x2', '0%');
  grad1.setAttribute('y2', '100%');
  grad1.innerHTML = `
    <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0.8" />
    <stop offset="50%" style="stop-color:#7c3aed;stop-opacity:0.8" />
    <stop offset="100%" style="stop-color:#ec4899;stop-opacity:0.8" />
  `;

  const grad2 = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  grad2.setAttribute('id', 'grad-helix-2');
  grad2.setAttribute('x1', '0%');
  grad2.setAttribute('y1', '0%');
  grad2.setAttribute('x2', '0%');
  grad2.setAttribute('y2', '100%');
  grad2.innerHTML = `
    <stop offset="0%" style="stop-color:#7c3aed;stop-opacity:0.8" />
    <stop offset="50%" style="stop-color:#ec4899;stop-opacity:0.8" />
    <stop offset="100%" style="stop-color:#00d4ff;stop-opacity:0.8" />
  `;

  defs.appendChild(grad1);
  defs.appendChild(grad2);
  svg.appendChild(defs);

  // Add connection bars
  connections.forEach((conn, i) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', conn.leftX);
    line.setAttribute('y1', conn.y);
    line.setAttribute('x2', conn.rightX);
    line.setAttribute('y2', conn.y);
    line.setAttribute('stroke', `rgba(${i % 2 === 0 ? '0,212,255' : '124,58,237'}, 0.3)`);
    line.setAttribute('stroke-width', '2');
    line.style.animation = `pulseConnection ${2 + (i % 3)}s ease-in-out infinite`;
    svg.appendChild(line);
  });

  svg.appendChild(leftStrand);
  svg.appendChild(rightStrand);

  // Add animated particles traveling along the strands
  for (let i = 0; i < 8; i++) {
    const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    particle.setAttribute('r', '3');
    particle.setAttribute('fill', i % 2 === 0 ? '#00d4ff' : '#ec4899');
    particle.setAttribute('opacity', '0.8');
    particle.style.filter = 'blur(1px)';

    const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
    animateMotion.setAttribute('dur', `${5 + i}s`);
    animateMotion.setAttribute('repeatCount', 'indefinite');
    animateMotion.setAttribute('path', i % 2 === 0 ? leftPath : rightPath);
    animateMotion.setAttribute('rotate', 'auto');

    particle.appendChild(animateMotion);
    svg.appendChild(particle);
  }

  timeline.appendChild(svg);

  // Add glow effect to the helix on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        svg.style.opacity = '1';
        svg.style.transition = 'opacity 1s ease-in';
      }
    });
  }, { threshold: 0.1 });

  observer.observe(timeline);
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

  // Get featured skills from data
  const featuredSkills = skills.featured || [];

  // Create categories directly from the skills object keys
  const categories = Object.keys(skills)
    .filter(key => key !== 'featured') // Exclude featured as it's not a category
    .map(key => ({
      title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
      items: skills[key]
    }));

  skillsGrid.innerHTML = categories.map((category, categoryIndex) => `
    <div class="skill-category" style="animation-delay: ${categoryIndex * 0.1}s">
      <h3 class="skill-category-title">${category.title}</h3>
      <div class="skill-items">
        ${category.items.map(item => {
    const isFeatured = featuredSkills.includes(item);
    return `<span class="skill-item ${isFeatured ? 'featured' : ''}" data-skill="${item}">${item}</span>`;
  }).join('')}
      </div>
    </div>
  `).join('');

  // Add click ripple effect to skill items
  addSkillInteractivity();

  // Add sparkle effects to featured skills
  addSparkleEffects();
}

// Add interactive effects to skills
function addSkillInteractivity() {
  const skillItems = document.querySelectorAll('.skill-item');
  const skillCategories = document.querySelectorAll('.skill-category');

  // Add 3D tilt effect to categories
  skillCategories.forEach(category => {
    category.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });

    category.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  skillItems.forEach(item => {
    // Add click ripple effect
    item.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');

      this.appendChild(ripple);

      // Add a bounce animation
      this.style.animation = 'skillBounce 0.5s ease';

      setTimeout(() => {
        ripple.remove();
        this.style.animation = '';
      }, 600);
    });

    // Add particle burst effect on hover
    item.addEventListener('mouseenter', function () {
      createSkillParticles(this);
    });
  });
}

// Create particle burst effect around skill items
function createSkillParticles(element) {
  const rect = element.getBoundingClientRect();
  const particleCount = 5;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('skill-particle');

    const angle = (Math.PI * 2 * i) / particleCount;
    const velocity = 30 + Math.random() * 20;
    const x = Math.cos(angle) * velocity;
    const y = Math.sin(angle) * velocity;

    particle.style.left = rect.left + rect.width / 2 + 'px';
    particle.style.top = rect.top + rect.height / 2 + 'px';
    particle.style.setProperty('--tx', x + 'px');
    particle.style.setProperty('--ty', y + 'px');

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 800);
  }
}

// Add sparkle effects to featured skills
function addSparkleEffects() {
  const featuredItems = document.querySelectorAll('.skill-item.featured');

  featuredItems.forEach(item => {
    // Create sparkles periodically
    setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to sparkle
        createSparkle(item);
      }
    }, 2000);
  });
}

// Create a sparkle effect
function createSparkle(element) {
  const rect = element.getBoundingClientRect();
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');

  // Random position around the element
  const offsetX = (Math.random() - 0.5) * rect.width;
  const offsetY = (Math.random() - 0.5) * rect.height;

  sparkle.style.left = rect.left + rect.width / 2 + offsetX + 'px';
  sparkle.style.top = rect.top + rect.height / 2 + offsetY + 'px';
  sparkle.style.animationDelay = Math.random() * 0.5 + 's';

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
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

// Remove the old scroll reveal function as we're using IntersectionObserver now

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

// Timeline card click interactions removed per user request

// Intersection Observer for fade-in animations
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px 100px 0px'
  });

  const elements = document.querySelectorAll('.timeline-item, .skill-category, .interest-card, .link-card');
  elements.forEach(el => observer.observe(el));
};

// Call after content is loaded
setTimeout(observeElements, 500);

// Bio-Neural Visualization - A merge of tech, AI, and biology
function initBioNeuralVisualization() {
  const canvas = document.getElementById('bio-neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;

  // Set canvas size
  function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Mouse tracking
  const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    isActive: false
  };

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.isActive = true;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.isActive = false;
  });

  // Neural Node Class - represents neurons/cells
  class NeuralNode {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      this.radius = Math.random() * 4 + 3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.connections = [];
      this.energy = Math.random();
      this.hue = Math.random() * 60 + 180; // Blue to purple range
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.type = Math.random() > 0.7 ? 'special' : 'normal'; // Some special nodes
    }

    update() {
      // Gentle floating movement
      this.x += this.vx;
      this.y += this.vy;

      // Return to base position
      const dx = this.baseX - this.x;
      const dy = this.baseY - this.y;
      this.x += dx * 0.01;
      this.y += dy * 0.01;

      // Mouse interaction
      if (mouse.isActive) {
        const mdx = mouse.x - this.x;
        const mdy = mouse.y - this.y;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (dist < 150) {
          const force = (1 - dist / 150) * 0.5;
          this.x += mdx * force * 0.02;
          this.y += mdy * force * 0.02;
        }
      }

      // Energy pulse
      this.pulsePhase += 0.02;
      this.energy = 0.5 + Math.sin(this.pulsePhase) * 0.5;

      // Boundaries
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      // Outer glow
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
      gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, ${this.energy * 0.3})`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core node
      ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${0.6 + this.energy * 0.4})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();

      // Special nodes get extra effects
      if (this.type === 'special') {
        ctx.strokeStyle = `hsla(${this.hue}, 100%, 70%, ${this.energy})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 3 + this.energy * 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Inner highlight
      ctx.fillStyle = `rgba(255, 255, 255, ${this.energy * 0.8})`;
      ctx.beginPath();
      ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Signal Particle - flows along connections
  class SignalParticle {
    constructor(x, y, targetX, targetY, color) {
      this.x = x;
      this.y = y;
      this.startX = x;
      this.startY = y;
      this.targetX = targetX;
      this.targetY = targetY;
      this.progress = 0;
      this.speed = 0.01 + Math.random() * 0.02;
      this.color = color;
      this.size = Math.random() * 2 + 1;
      this.life = 1;
    }

    update() {
      this.progress += this.speed;

      if (this.progress >= 1) {
        this.life -= 0.05;
      }

      // Smooth curve along path
      const t = Math.min(this.progress, 1);
      this.x = this.startX + (this.targetX - this.startX) * t;
      this.y = this.startY + (this.targetY - this.startY) * t;

      return this.life > 0;
    }

    draw() {
      const alpha = this.life * (this.progress < 1 ? 0.8 : 1 - (this.progress - 1));

      // Glow
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
      gradient.addColorStop(0, `hsla(${this.color}, 100%, 70%, ${alpha * 0.6})`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = `hsla(${this.color}, 100%, 80%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }


  // Create nodes in a random spread
  const nodes = [];
  const nodeCount = 25;
  const padding = 50; // Keep nodes away from edges

  for (let i = 0; i < nodeCount; i++) {
    const x = padding + Math.random() * (canvas.width - padding * 2);
    const y = padding + Math.random() * (canvas.height - padding * 2);
    nodes.push(new NeuralNode(x, y));
  }

  // Signal particles
  const signals = [];

  // Find connections between nearby nodes
  function updateConnections() {
    const maxDistance = 150;

    nodes.forEach(node => {
      node.connections = [];
      nodes.forEach(other => {
        if (node !== other) {
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            node.connections.push({ node: other, distance: dist });
          }
        }
      });
    });
  }

  // Spawn signal particles periodically
  let signalTimer = 0;
  function spawnSignals() {
    signalTimer++;
    if (signalTimer > 30) {
      signalTimer = 0;

      // Pick random node with connections
      const node = nodes[Math.floor(Math.random() * nodes.length)];
      if (node.connections.length > 0) {
        const target = node.connections[Math.floor(Math.random() * node.connections.length)].node;
        signals.push(new SignalParticle(node.x, node.y, target.x, target.y, node.hue));
      }
    }
  }

  // Animation loop
  function animate() {
    // Clear canvas with transparency
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update connections
    updateConnections();

    // Draw connections
    nodes.forEach(node => {
      node.connections.forEach(conn => {
        const alpha = (1 - conn.distance / 150) * 0.2;
        const gradient = ctx.createLinearGradient(node.x, node.y, conn.node.x, conn.node.y);
        gradient.addColorStop(0, `hsla(${node.hue}, 100%, 60%, ${alpha * node.energy})`);
        gradient.addColorStop(1, `hsla(${conn.node.hue}, 100%, 60%, ${alpha * conn.node.energy})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(conn.node.x, conn.node.y);
        ctx.stroke();

        // Draw connection midpoint glow
        const midX = (node.x + conn.node.x) / 2;
        const midY = (node.y + conn.node.y) / 2;
        const pulseSize = 2 + Math.sin(Date.now() * 0.003 + conn.distance) * 1;

        ctx.fillStyle = `hsla(${(node.hue + conn.node.hue) / 2}, 100%, 70%, ${alpha * 2})`;
        ctx.beginPath();
        ctx.arc(midX, midY, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // Update and draw nodes
    nodes.forEach(node => {
      node.update();
      node.draw();
    });

    // Update and draw signals
    spawnSignals();
    for (let i = signals.length - 1; i >= 0; i--) {
      if (!signals[i].update()) {
        signals.splice(i, 1);
      } else {
        signals[i].draw();
      }
    }

    requestAnimationFrame(animate);
  }

  // Start animation
  animate();
}
