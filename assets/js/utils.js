export function round(value, decimals = 2) {
  if (!Number.isFinite(value)) {
    return 0;
  }
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function parseLocaleNumber(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const normalized = value
    .trim()
    .replace(/\s+/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '.');

  if (normalized === '' || normalized === '-' || normalized === '.') {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatNumber(value, options = {}) {
  if (!Number.isFinite(value)) {
    return '0';
  }
  const formatter = new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: 2,
    ...options,
  });
  return formatter.format(value);
}

export function formatCurrency(value, currency) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value, fractionDigits = 2) {
  return `${formatNumber(value, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })} %`;
}

export function validateNumber(value) {
  return parseLocaleNumber(value) !== null;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function notEmpty(value) {
  return value !== null && value !== undefined;
}

export function debounce(fn, delay = 250) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export function persistState(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Persist failed', error);
  }
}

export function readState(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Restore failed', error);
    return fallback;
  }
}

export function shareUrl(params) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === '') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

export function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
  return Promise.resolve();
}

export function formatDate(dateString) {
  try {
    return new Intl.DateTimeFormat('de-DE', {
      dateStyle: 'medium',
    }).format(new Date(dateString));
  } catch (error) {
    return '';
  }
}

export function observeAds() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.viewed = 'true';
          entry.target.dispatchEvent(new CustomEvent('ad-view-enter'));
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll('[data-ad-slot]').forEach((slot) => observer.observe(slot));
  return observer;
}

export function setupThemeToggle(button) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const stored = readState('tech-teddy-theme');
  const applyTheme = (theme) => {
    document.body.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    persistState('tech-teddy-theme', theme);
    if (button) {
      button.textContent = theme === 'dark' ? '☀️ Hellmodus' : '🌙 Dunkelmodus';
    }
  };

  const initial = stored || (prefersDark.matches ? 'dark' : 'light');
  applyTheme(initial);

  prefersDark.addEventListener('change', (event) => {
    if (!readState('tech-teddy-theme')) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });

  if (button) {
    button.addEventListener('click', () => {
      const theme = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(theme);
    });
  }
}

export function renderBreadcrumbs(container, trail) {
  if (!container) return;
  container.innerHTML = '';
  trail.forEach((item, index) => {
    const span = document.createElement('span');
    if (item.href && index !== trail.length - 1) {
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.label;
      span.appendChild(link);
    } else {
      span.textContent = item.label;
    }
    container.appendChild(span);
  });
}

export function formatUnit(value, unitLabel) {
  return `${formatNumber(value, { maximumFractionDigits: 6 })} ${unitLabel}`;
}

export function animateCounter(element, target, options = {}) {
  const duration = options.duration ?? 650;
  const decimals = options.decimals ?? 0;
  const start = 0;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = start + (target - start) * eased;
    element.textContent = formatNumber(value, {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    });
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
