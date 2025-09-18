const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__list');
const year = document.getElementById('year');
const newsletterForm = document.querySelector('.newsletter__form');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    menu.classList.toggle('is-open');
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailField = newsletterForm.querySelector('input[type="email"]');

    if (emailField?.value) {
      const button = newsletterForm.querySelector('button');
      button.disabled = true;
      button.textContent = 'Vielen Dank!';
      emailField.value = '';
    }
  });
}
