// Main interaction logic for the portfolio
// - Smooth scroll for buttons and navigation
// - Scroll reveal animations
// - Simple 3D tilt effect on the hero image
// - Contact form mailto handler (no backend required)
// - Certification management with localStorage

document.addEventListener('DOMContentLoaded', () => {
  setupSmoothScroll();
  setupRevealOnScroll();
  setupTiltEffect();
  setupContactForm();
  initializeDefaultCertifications();
  setupCertificationManager();
  setupOwnerLogin();
  loadCertifications();
  setupResumeModal();
  setupCertificateModal();
  setupCustomCursor();
});

function setupSmoothScroll() {
  const triggers = document.querySelectorAll('.js-scroll-to');

  triggers.forEach((el) => {
    el.addEventListener('click', (event) => {
      const targetSelector = el.getAttribute('data-target');
      const target = targetSelector ? document.querySelector(targetSelector) : null;
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function setupRevealOnScroll() {
  const elements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || elements.length === 0) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

function setupTiltEffect() {
  const card = document.querySelector('.js-tilt');
  if (!card || !window.matchMedia('(pointer: fine)').matches) return;

  const maxRotateX = 10;
  const maxRotateY = 14;
  const lightEffect = card.querySelector('[data-light-effect]');

  function handleMove(event) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const percentX = (x / rect.width - 0.5) * 2; // -1 to 1
    const percentY = (y / rect.height - 0.5) * 2; // -1 to 1

    const rotateX = -percentY * maxRotateX;
    const rotateY = percentX * maxRotateY;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Update light effect position to follow cursor
    if (lightEffect) {
      const lightX = x - 75; // Center the light (width 150 / 2)
      const lightY = y - 75; // Center the light (height 150 / 2)
      lightEffect.style.transform = `translate(${lightX}px, ${lightY}px)`;
    }
  }

  function reset() {
    card.style.transform = '';
  }

  function resetLight() {
    if (lightEffect) {
      lightEffect.style.transform = 'translate(0, 0)';
    }
  }

  card.addEventListener('mousemove', handleMove);
  card.addEventListener('mouseleave', reset);
  card.addEventListener('mouseleave', resetLight);
}

function setupContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    // Form submission handled by Formspree automatically
    // Just let the default form submission proceed
  });
}

/* ========== CERTIFICATION MANAGEMENT ========== */

function initializeDefaultCertifications() {
  const stored = localStorage.getItem('certifications');
  if (stored) return; // Already initialized

  const defaultCerts = [
    {
      id: 'cert-001',
      enabled: true,
      title: 'Web Developer',
      organization: 'Internshala',
      year: '2024',
      description: 'Completed comprehensive web development training',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
    {
      id: 'cert-002',
      enabled: true,
      title: 'Certificate of Participation',
      organization: 'Naukri Campus AINCAT',
      year: '2024',
      description: 'Successfully participated in competitive aptitude test',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
    {
      id: 'cert-003',
      enabled: true,
      title: 'Internshala Student Partner (ISP)',
      organization: 'Internshala',
      year: '2024',
      description: 'Official joining letter as Internshala Student Partner',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
    {
      id: 'cert-004',
      enabled: true,
      title: 'AWS Solutions Architecture',
      organization: 'Amazon Forage',
      year: '2024',
      description: 'Completed AWS Solutions Architecture virtual experience program',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
    {
      id: 'cert-005',
      enabled: true,
      title: 'MS Office Short Course',
      organization: 'Microsoft Training',
      year: '2024',
      description: 'Excel and PowerPoint proficiency certification',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
    {
      id: 'cert-006',
      enabled: true,
      title: 'Internship Common Aptitude Test (LCAT)',
      organization: 'Internshala',
      year: '2024',
      description: 'Cleared internship common aptitude test',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
    {
      id: 'cert-007',
      enabled: true,
      title: 'Commercial Project Manager',
      organization: 'Siemens Mobility - Forage',
      year: '2024',
      description: 'Completed Commercial Project Manager virtual experience',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
    {
      id: 'cert-008',
      enabled: true,
      title: 'India Typing Skills',
      organization: 'India Typing',
      year: '2024',
      description: 'Verified typing proficiency certificate',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
    {
      id: 'cert-009',
      enabled: true,
      title: 'Web Development Internship',
      organization: 'Octanet Services Pvt Ltd',
      year: '2024',
      description: 'Duration: 2 Months (1st August 2024 - 1st October 2024). Internship certificate for web development training.',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
    {
      id: 'cert-010',
      enabled: true,
      title: 'C Programming',
      organization: 'Infosys',
      year: '2024',
      description: 'Completed C programming training and certification',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
    {
      id: 'cert-011',
      enabled: true,
      title: 'C++ Programming',
      organization: 'Infosys',
      year: '2024',
      description: 'Advanced C++ programming course completion',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
    {
      id: 'cert-012',
      enabled: true,
      title: 'HTML & CSS Fundamentals',
      organization: 'Infosys',
      year: '2024',
      description: 'HTML and CSS basics and practice projects',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
    {
      id: 'cert-013',
      enabled: true,
      title: 'Bootstrap',
      organization: 'Infosys',
      year: '2024',
      description: 'Bootstrap framework training and implementation',
      linkUrl: '',
      verifyUrl: '',
      certFile: null,
    },
  ];

  localStorage.setItem('certifications', JSON.stringify(defaultCerts));
}

function setupCertificationManager() {
  const form = document.querySelector('[data-admin-cert-form]');
  const list = document.querySelector('[data-admin-cert-list]');
  const saveBtn = form?.querySelector('[data-cert-save-btn]');
  const resetBtn = form?.querySelector('[data-cert-reset-btn]');

  if (!form) return;

  // Save certification
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const id = formData.get('id') || Date.now().toString();
    const cert = {
      id,
      enabled: formData.get('enabled') === 'on',
      title: formData.get('title'),
      organization: formData.get('organization'),
      year: formData.get('year'),
      description: formData.get('description'),
      linkUrl: formData.get('linkUrl'),
      verifyUrl: formData.get('verifyUrl'),
      certFile: null,
    };

    saveCertificate(cert);
    resetCertForm();
    loadCertifications();
  });

  // Reset form
  resetBtn?.addEventListener('click', resetCertForm);

  function resetCertForm() {
    form.reset();
    form.querySelector('input[name="id"]').value = '';
    const msg = form.querySelector('[data-admin-cert-message]');
    if (msg) msg.textContent = 'Form cleared.';
    setTimeout(() => (msg.textContent = ''), 3000);
  }

  // Render admin list
  function renderAdminList() {
    if (!list) return;
    const certs = getCertifications();
    list.innerHTML = '';

    if (certs.length === 0) {
      list.innerHTML = '<li style="color: var(--muted); padding: 1rem 0;">No certifications added yet.</li>';
      return;
    }

    certs.forEach((cert) => {
      const li = document.createElement('li');
      li.className = 'admin-cert-item';
      li.innerHTML = `
        <div class="admin-cert-item-header">
          <strong>${cert.title}</strong> 
          <span style="color: var(--muted); font-size: 0.85rem;">${cert.organization} (${cert.year})</span>
          ${cert.enabled ? '<span class="badge" style="background: #10b981; margin-left: 0.5rem;">Enabled</span>' : '<span class="badge" style="background: var(--danger); margin-left: 0.5rem;">Disabled</span>'}
        </div>
        <div class="admin-cert-item-actions" style="margin-top: 0.5rem;">
          <button type="button" class="admin-cert-edit-btn" data-cert-id="${cert.id}" style="color: var(--accent); cursor: pointer; border: none; background: none; text-decoration: underline; font-size: 0.9rem;">Edit</button>
          <button type="button" class="admin-cert-delete-btn" data-cert-id="${cert.id}" style="color: var(--danger); cursor: pointer; border: none; background: none; text-decoration: underline; font-size: 0.9rem; margin-left: 1rem;">Delete</button>
        </div>
      `;
      list.appendChild(li);

      // Edit handler
      li.querySelector('.admin-cert-edit-btn').addEventListener('click', () => {
        form.querySelector('input[name="id"]').value = cert.id;
        form.querySelector('#cert-title').value = cert.title;
        form.querySelector('#cert-org').value = cert.organization;
        form.querySelector('#cert-year').value = cert.year;
        form.querySelector('#cert-description').value = cert.description || '';
        form.querySelector('#cert-link-url').value = cert.linkUrl || '';
        form.querySelector('#cert-verify-url').value = cert.verifyUrl || '';
        form.querySelector('#cert-enabled').checked = cert.enabled;
        form.scrollIntoView({ behavior: 'smooth' });
      });

      // Delete handler
      li.querySelector('.admin-cert-delete-btn').addEventListener('click', () => {
        if (confirm(`Delete "${cert.title}"?`)) {
          deleteCertificate(cert.id);
          renderAdminList();
          loadCertifications();
        }
      });
    });
  }

  // Update admin list on load
  setTimeout(renderAdminList, 100);
}

function saveCertificate(cert) {
  const certs = getCertifications();
  const idx = certs.findIndex((c) => c.id === cert.id);
  if (idx >= 0) {
    certs[idx] = cert;
  } else {
    certs.push(cert);
  }
  localStorage.setItem('certifications', JSON.stringify(certs));
  const msg = document.querySelector('[data-admin-cert-message]');
  if (msg) {
    msg.textContent = '✓ Certification saved successfully.';
    msg.style.color = '#10b981';
  }
  setTimeout(() => {
    if (msg) msg.textContent = '';
  }, 3000);
}

function deleteCertificate(id) {
  const certs = getCertifications().filter((c) => c.id !== id);
  localStorage.setItem('certifications', JSON.stringify(certs));
}

function getCertifications() {
  const stored = localStorage.getItem('certifications');
  return stored ? JSON.parse(stored) : [];
}

function loadCertifications() {
  const certs = getCertifications().filter((c) => c.enabled);
  const container = document.querySelector('[data-cert-list]');
  if (!container) return;

  container.innerHTML = '';

  if (certs.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--muted);">No certifications enabled yet.</p>';
    return;
  }

  certs.forEach((cert) => {
    const card = document.createElement('article');
    card.className = 'cert-card-square';
    card.innerHTML = `
      <div class="cert-square-box">
        <h3>${cert.title}</h3>
        <div class="cert-button-group">
          ${cert.linkUrl ? `<button class="cert-btn-square view-cert-btn" data-cert-link="${cert.linkUrl}" type="button" title="View Certificate"><i class="fas fa-eye"></i></button>` : ''}
          ${cert.verifyUrl ? `<a href="${cert.verifyUrl}" class="cert-btn-square verify-cert-btn" target="_blank" rel="noopener noreferrer" title="View on LinkedIn"><i class="fab fa-linkedin"></i></a>` : ''}
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Attach click handlers to View buttons
  document.querySelectorAll('.view-cert-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const certLink = btn.getAttribute('data-cert-link');
      if (certLink) {
        openCertificateModal(certLink);
      }
    });
  });
}

function setupOwnerLogin() {
  // Set default credentials (change these!)
  const DEFAULT_OWNER_ID = 'admin';
  const DEFAULT_PASSWORD = 'password123';

  const panel = document.querySelector('[data-admin-panel]');
  const loginForm = document.querySelector('[data-login-form]');
  const loginFormElement = document.querySelector('#owner-login-form');
  const adminContent = document.querySelector('[data-admin-content]');
  const logoutBtn = document.querySelector('[data-logout-btn]');
  const logo = document.querySelector('.logo');

  if (!panel || !loginFormElement) return;

  // Check if already logged in
  const isLoggedIn = localStorage.getItem('ownerLoggedIn') === 'true';
  if (isLoggedIn) {
    showAdminPanel();
  }

  // Click logo while holding Ctrl to open admin panel
  logo?.addEventListener('click', (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
      // Remove hidden attribute from admin panel to show it
      panel.removeAttribute('hidden');
      // Scroll to admin panel
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Handle login form
  loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const ownerId = document.querySelector('#owner-id').value;
    const password = document.querySelector('#owner-password').value;
    const messageEl = document.querySelector('[data-login-message]');

    if (ownerId === DEFAULT_OWNER_ID && password === DEFAULT_PASSWORD) {
      localStorage.setItem('ownerLoggedIn', 'true');
      showAdminPanel();
    } else {
      messageEl.textContent = '❌ Invalid credentials. Try again.';
      messageEl.style.color = '#ef4444';
      setTimeout(() => (messageEl.textContent = ''), 3000);
    }
  });

  // Handle logout
  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('ownerLoggedIn');
    adminContent.setAttribute('hidden', '');
    loginForm.removeAttribute('hidden');
    loginFormElement.reset();
  });

  function showAdminPanel() {
    loginForm.setAttribute('hidden', '');
    adminContent.removeAttribute('hidden');
  }
}

/* ========== ADMIN PANEL ACCESS ========== */
// Add quick access by pressing Ctrl+Shift+O
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'O') {
    const panel = document.querySelector('[data-admin-panel]');
    if (panel) {
      panel.removeAttribute('hidden');
      panel.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

/* ========== CERTIFICATE MODAL ========== */
function openCertificateModal(certLink) {
  const modal = document.querySelector('[data-cert-modal]');
  const imgElement = document.getElementById('cert-modal-image');
  
  if (!modal || !imgElement) return;
  
  imgElement.src = certLink;
  imgElement.onload = () => {
    modal.classList.add('cert-modal-open');
  };
  imgElement.onerror = () => {
    console.error('Failed to load certificate:', certLink);
    imgElement.alt = 'Unable to load certificate';
    modal.classList.add('cert-modal-open');
  };
}

function setupCertificateModal() {
  const modal = document.querySelector('[data-cert-modal]');
  const closeBtn = document.querySelector('[data-cert-modal-close]');
  
  if (!modal) return;
  
  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('cert-modal-open');
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('cert-modal-open');
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('cert-modal-open')) {
      modal.classList.remove('cert-modal-open');
    }
  });
}

/* ========== RESUME MODAL ========== */
function setupResumeModal() {
  const logo = document.querySelector('.logo');
  const modal = document.querySelector('[data-resume-modal]');
  const closeBtn = document.querySelector('[data-modal-close]');
  
  if (!logo || !modal) return;
  
  logo.style.cursor = 'pointer';
  logo.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.classList.add('modal-open');
  });
  
  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('modal-open');
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('modal-open');
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal-open')) {
      modal.classList.remove('modal-open');
    }
  });

  // Setup resume buttons
  const viewBtn = document.querySelector('[data-resume-view]');
  const downloadBtn = document.querySelector('[data-resume-download]');

  if (viewBtn) {
    viewBtn.addEventListener('click', () => {
      window.open('resume.html', '_blank');
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = 'resume.txt';
      link.download = 'Sachin_Varma_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

/* ========== CUSTOM CURSOR ========== */
function setupCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  
  if (!cursorDot || !cursorRing) return;
  
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let isMoving = true;
  let moveTimeout;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    
    isMoving = true;
    clearTimeout(moveTimeout);
    cursorDot.style.opacity = '1';
    
    moveTimeout = setTimeout(() => {
      isMoving = false;
      if (Math.abs(ringX - mouseX) < 2 && Math.abs(ringY - mouseY) < 2) {
        let blinkCount = 0;
        const blinkInterval = setInterval(() => {
          blinkCount++;
          cursorDot.style.opacity = blinkCount % 2 === 0 ? '1' : '0.3';
          if (blinkCount >= 3) clearInterval(blinkInterval);
        }, 150);
      }
    }, 2000);
  });
  
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.25;
    ringY += (mouseY - ringY) * 0.25;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  document.querySelectorAll('button, a, input, textarea').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorRing.style.borderColor = 'var(--accent-2)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.borderColor = 'var(--accent)';
    });
  });
  
  document.addEventListener('mousedown', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });
  
  document.addEventListener('mouseup', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
  });
  
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });
}