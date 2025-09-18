const ready = (callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
};

ready(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const menuButtons = [];
  let lastScroll = 0;
  let ticking = false;

  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const scrollLinks = document.querySelectorAll('.scroll-top');
  scrollLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });

  const parallaxItems = Array.from(document.querySelectorAll('[data-parallax]')).map((element) => {
    const speed = parseFloat(element.dataset.parallaxSpeed || '0');
    const anchorSelector = element.dataset.parallaxAnchor;
    const anchor = anchorSelector ? document.querySelector(anchorSelector) : element.closest('section') || element.parentElement;
    return { element, speed, anchor };
  });

  const updateParallax = () => {
    if (prefersReducedMotion) {
      return;
    }

    const viewportMid = window.scrollY + window.innerHeight / 2;

    parallaxItems.forEach(({ element, speed, anchor }) => {
      if (!element || !anchor) {
        return;
      }
      const anchorRect = anchor.getBoundingClientRect();
      const anchorMid = window.scrollY + anchorRect.top + anchorRect.height / 2;
      const delta = (viewportMid - anchorMid) * speed;
      element.style.transform = `translate3d(0, ${delta}px, 0)`;
    });
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }

    if (header) {
      if (nav && nav.classList.contains('is-open')) {
        header.classList.remove('is-hidden');
        lastScroll = window.scrollY;
        return;
      }
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll + 10 && currentScroll > 120) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
      lastScroll = currentScroll;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', () => updateParallax());
  updateParallax();

  const tiltElements = document.querySelectorAll('[data-tilt]');
  if (!prefersReducedMotion) {
    tiltElements.forEach((element) => {
      const bounds = { width: 0, height: 0 };
      const updateBounds = () => {
        const rect = element.getBoundingClientRect();
        bounds.width = rect.width;
        bounds.height = rect.height;
      };
      updateBounds();
      window.addEventListener('resize', updateBounds);

      element.addEventListener('pointermove', (event) => {
        if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
          return;
        }
        const rect = element.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const rotateX = ((bounds.height / 2 - offsetY) / bounds.height) * 12;
        const rotateY = ((offsetX - bounds.width / 2) / bounds.width) * 12;
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      element.addEventListener('pointerleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
      element.addEventListener('pointercancel', () => {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }

  const menuContainer = document.querySelector('[data-menu]');
  const menuCategoryContainer = document.querySelector('[data-menu-categories]');
  const drinksContainer = document.querySelector('[data-drinks]');
  const yearElement = document.querySelector('[data-year]');

  if (menuContainer && menuCategoryContainer && drinksContainer) {
    fetch('assets/data/menu.json')
      .then((response) => response.json())
      .then((data) => {
        const foodEntries = Object.entries(data.food || {});
        const drinkEntries = Object.entries(data.drinks || {});
        const sections = [];

        foodEntries.forEach(([category, items], index) => {
          const id = category.toLowerCase().replace(/[^a-z0-9äöüß]+/gi, '-').replace(/^-|-$/g, '');

          const button = document.createElement('button');
          button.type = 'button';
          button.textContent = category;
          button.dataset.target = id;
          if (index === 0) {
            button.classList.add('is-active');
          }
          menuCategoryContainer.appendChild(button);
          menuButtons.push(button);

          const section = document.createElement('section');
          section.className = 'menu-section';
          section.id = id;
          section.setAttribute('tabindex', '-1');

          const headerEl = document.createElement('header');
          headerEl.className = 'menu-section__header';
          const heading = document.createElement('h3');
          heading.textContent = category;
          headerEl.appendChild(heading);
          section.appendChild(headerEl);

          const itemsWrapper = document.createElement('div');
          itemsWrapper.className = 'menu-section__items';

          items.forEach((item) => {
            const menuItem = document.createElement('article');
            menuItem.className = 'menu-item';

            const title = document.createElement('div');
            title.className = 'menu-item__title';
            title.textContent = item.name;
            menuItem.appendChild(title);

            if (Array.isArray(item.prices)) {
              const priceWrapper = document.createElement('div');
              priceWrapper.className = 'menu-item__prices';
              item.prices.forEach((price) => {
                const priceSpan = document.createElement('span');
                priceSpan.textContent = price;
                priceWrapper.appendChild(priceSpan);
              });
              menuItem.appendChild(priceWrapper);
            }

            itemsWrapper.appendChild(menuItem);
          });

          section.appendChild(itemsWrapper);
          menuContainer.appendChild(section);
          sections.push(section);
        });

        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const activeId = entry.target.id;
                  menuButtons.forEach((btn) => {
                    btn.classList.toggle('is-active', btn.dataset.target === activeId);
                  });
                }
              });
            },
            { rootMargin: '-50% 0px -45% 0px', threshold: 0.1 }
          );

          sections.forEach((section) => observer.observe(section));
        }

        menuCategoryContainer.addEventListener('click', (event) => {
          const target = event.target;
          if (!(target instanceof HTMLButtonElement)) {
            return;
          }

          const sectionId = target.dataset.target;
          const destination = sectionId ? document.getElementById(sectionId) : null;
          if (destination) {
            if (!prefersReducedMotion) {
              destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              const top = destination.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top });
            }
          }
        });

        drinkEntries.forEach(([category, items], index) => {
          const details = document.createElement('details');
          details.className = 'drink-group';
          if (index === 0) {
            details.open = true;
          }

          const summary = document.createElement('summary');
          summary.textContent = category;
          const icon = document.createElement('span');
          icon.setAttribute('aria-hidden', 'true');
          summary.appendChild(icon);
          details.appendChild(summary);

          const wrapper = document.createElement('div');
          wrapper.className = 'drink-items__inner';

          items.forEach((item) => {
            const drinkItem = document.createElement('div');
            drinkItem.className = 'drink-item';

            const title = document.createElement('div');
            title.className = 'menu-item__title';
            title.textContent = item.name;
            drinkItem.appendChild(title);

            if (Array.isArray(item.prices)) {
              const prices = document.createElement('div');
              prices.className = 'menu-item__prices';
              item.prices.forEach((price) => {
                const priceSpan = document.createElement('span');
                priceSpan.textContent = price;
                prices.appendChild(priceSpan);
              });
              drinkItem.appendChild(prices);
            }

            wrapper.appendChild(drinkItem);
          });

          details.appendChild(wrapper);
          drinksContainer.appendChild(details);

          const updateIcon = () => {
            icon.textContent = details.open ? '–' : '+';
          };

          details.addEventListener('toggle', updateIcon);
          updateIcon();
        });
      })
      .catch((error) => console.error('Fehler beim Laden der Speisekarte:', error));
  }

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
