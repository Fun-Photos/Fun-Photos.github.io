// Fun Photos Portal Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initBackdropSimulator();
  initInstallTabs();
  initCopyLinkButtons();
  initScrollSpy();
});

/**
 * Manages Dark/Light mode toggle with persistence and system-preference support.
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  function getCurrentTheme() {
    const customTheme = document.documentElement.getAttribute('data-theme');
    if (customTheme) return customTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('color-scheme', theme);

    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.content = theme;
    }
  }

  toggleBtn.addEventListener('click', () => {
    const current = getCurrentTheme();
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });

  // Listen for OS system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only adapt if user hasn't explicitly set a preference
      if (!localStorage.getItem('color-scheme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

/**
 * Powers the interactive backdrop and foreground cutout simulator in the hero section.
 */
function initBackdropSimulator() {
  const pickerButtons = document.querySelectorAll('.picker-btn');
  const liveBackdrop = document.getElementById('live-backdrop');
  const activeBackdropName = document.getElementById('active-backdrop-name');
  const liveSubject = document.getElementById('live-subject');

  if (!pickerButtons.length || !liveBackdrop) return;

  pickerButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update button active state
      pickerButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const bgSrc = btn.getAttribute('data-src');
      const bgName = btn.getAttribute('data-name');

      if (bgSrc) {
        liveBackdrop.style.opacity = '0.4';
        setTimeout(() => {
          liveBackdrop.style.backgroundImage = `url('${bgSrc}')`;
          liveBackdrop.style.opacity = '1';
        }, 120);
      }

      if (activeBackdropName && bgName) {
        activeBackdropName.textContent = bgName;
      }

      // Micro-interaction bounce on subject
      if (liveSubject) {
        liveSubject.style.transform = 'translateX(-50%) scale(0.98)';
        setTimeout(() => {
          liveSubject.style.transform = 'translateX(-50%) scale(1)';
        }, 150);
      }
    });
  });
}

/**
 * Handles tab switching in the PWA/TWA Installation Hub.
 */
function initInstallTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (!tabButtons.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update button classes and aria
      tabButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panel visibility
      tabPanels.forEach((panel) => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/**
 * Enables one-click link copying with animated feedback.
 */
function initCopyLinkButtons() {
  const copyButtons = document.querySelectorAll('.copy-link-btn');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const urlToCopy = btn.getAttribute('data-url') || window.location.href;

      try {
        await navigator.clipboard.writeText(urlToCopy);
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Copied!</span>
        `;
        btn.style.borderColor = 'var(--brand-emerald)';
        btn.style.color = 'var(--brand-emerald)';

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2200);
      } catch (err) {
        console.warn('Clipboard write failed:', err);
      }
    });
  });
}

/**
 * Highlights navigation links on scroll.
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}
