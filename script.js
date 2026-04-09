// EcoGuard Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize backend grid with sample data cards
  initializeBackendGrid();

  // Add smooth scrolling to navigation links
  initializeSmoothScrolling();

  // Add intersection observer for animations
  initializeScrollAnimations();
});

function initializeBackendGrid() {
  const backendGrid = document.getElementById('backendGrid');
  if (!backendGrid) return;

  const sampleCards = [
    {
      title: 'Zone Alpha Pressure',
      value: '2.4 MPa',
      status: 'normal',
      trend: '+0.1'
    },
    {
      title: 'Zone Beta Flow Rate',
      value: '1,250 L/min',
      status: 'normal',
      trend: '-15'
    },
    {
      title: 'Zone Gamma Temperature',
      value: '28.5°C',
      status: 'warning',
      trend: '+2.1'
    },
    {
      title: 'Zone Delta Alerts',
      value: '2 active',
      status: 'alert',
      trend: '+1'
    },
    {
      title: 'System Uptime',
      value: '99.7%',
      status: 'normal',
      trend: 'stable'
    },
    {
      title: 'Active Engineers',
      value: '14/14',
      status: 'normal',
      trend: 'stable'
    }
  ];

  sampleCards.forEach(card => {
    const cardElement = createDataCard(card);
    backendGrid.appendChild(cardElement);
  });
}

function createDataCard(data) {
  const card = document.createElement('div');
  card.className = 'data-card';

  const statusClass = data.status === 'alert' ? 'status-alert' :
                     data.status === 'warning' ? 'status-warning' : 'status-normal';

  card.innerHTML = `
    <div class="data-header">
      <span class="data-title">${data.title}</span>
      <span class="data-status ${statusClass}"></span>
    </div>
    <div class="data-value">${data.value}</div>
    <div class="data-trend">${data.trend}</div>
  `;

  return card;
}

function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const elementsToAnimate = document.querySelectorAll('section, .problem-card, .solution-card, .why-card, .company-theme, .member');
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
}

// Add CSS for data cards and animations
const additionalStyles = `
<style>
.data-card {
  background: var(--white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  transition: var(--transition);
}

.data-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent);
}

.data-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.data-title {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.data-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-normal {
  background: var(--success);
}

.status-warning {
  background: var(--warning);
}

.status-alert {
  background: var(--error);
}

.data-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.data-trend {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: 'IBM Plex Mono', monospace;
}

/* Animation classes */
.animate-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger animations for cards */
.problem-card:nth-child(1) { animation-delay: 0.1s; }
.problem-card:nth-child(2) { animation-delay: 0.2s; }
.problem-card:nth-child(3) { animation-delay: 0.3s; }

.solution-card:nth-child(1) { animation-delay: 0.1s; }
.solution-card:nth-child(2) { animation-delay: 0.2s; }
.solution-card:nth-child(3) { animation-delay: 0.3s; }

.why-card:nth-child(1) { animation-delay: 0.1s; }
.why-card:nth-child(2) { animation-delay: 0.2s; }
.why-card:nth-child(3) { animation-delay: 0.3s; }
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);