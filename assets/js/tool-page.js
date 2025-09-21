import {
  formatCurrency,
  formatDate,
  formatNumber,
  formatPercent,
  parseLocaleNumber,
  persistState,
  readState,
  renderBreadcrumbs,
  setupThemeToggle,
  shareUrl,
  copyToClipboard,
} from './utils.js';
import {
  PAL_VALUES,
  arithmeticMean,
  bmi,
  compound,
  convertLength,
  convertMass,
  convertSpeed,
  convertTemperature,
  convertTime,
  convertVolume,
  lengthUnits,
  massUnits,
  median,
  mifflinStJeor,
  percent,
  populationStandardDeviation,
  ruleOfThree,
  speedUnits,
  temperatureUnits,
  timeUnits,
  totalEnergyExpenditure,
  volumeUnits,
} from './calculations.js';
import { findTool } from './tool-data.js';

const params = new URLSearchParams(window.location.search);

function updateHistory(nextParams) {
  const url = new URL(window.location.href);
  Object.keys(nextParams).forEach((key) => {
    const value = nextParams[key];
    if (value === undefined || value === null || value === '') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  });
  history.replaceState(null, '', url);
}

function createNumberField({ label, name, value = '', step = 'any', min, max }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const labelEl = document.createElement('label');
  labelEl.htmlFor = name;
  labelEl.textContent = label;
  const input = document.createElement('input');
  input.type = 'text';
  input.id = name;
  input.name = name;
  input.inputMode = 'decimal';
  input.autocomplete = 'off';
  input.value = value;
  input.dataset.step = step;
  if (min !== undefined) input.dataset.min = String(min);
  if (max !== undefined) input.dataset.max = String(max);
  wrapper.appendChild(labelEl);
  wrapper.appendChild(input);
  return { wrapper, input };
}

function createSelectField({ label, name, value = '', options }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const labelEl = document.createElement('label');
  labelEl.htmlFor = name;
  labelEl.textContent = label;
  const select = document.createElement('select');
  select.id = name;
  select.name = name;
  options.forEach((option) => {
    const opt = document.createElement('option');
    if (typeof option === 'string') {
      opt.value = option;
      opt.textContent = option;
    } else {
      opt.value = option.value;
      opt.textContent = option.label;
    }
    if (opt.value === value) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });
  wrapper.appendChild(labelEl);
  wrapper.appendChild(select);
  return { wrapper, select };
}

function createRadioGroup({ label, name, value, options }) {
  const wrapper = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.textContent = label;
  wrapper.appendChild(legend);
  options.forEach((option) => {
    const id = `${name}-${option.value}`;
    const container = document.createElement('label');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '0.5rem';
    container.htmlFor = id;

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = name;
    radio.id = id;
    radio.value = option.value;
    if (option.value === value) {
      radio.checked = true;
    }

    const span = document.createElement('span');
    span.textContent = option.label;

    container.appendChild(radio);
    container.appendChild(span);
    wrapper.appendChild(container);
  });
  return wrapper;
}

function renderExamplesSection(container, tool) {
  if (!container || !(tool.examples?.length)) return;
  container.innerHTML = '';
  const heading = document.createElement('h2');
  heading.textContent = 'Beispiele aus der Praxis';
  container.appendChild(heading);
  const list = document.createElement('div');
  list.className = 'examples';
  tool.examples.forEach((example) => {
    const article = document.createElement('article');
    const title = document.createElement('h3');
    title.textContent = example.title;
    const description = document.createElement('p');
    description.textContent = example.description;
    article.appendChild(title);
    article.appendChild(description);
    list.appendChild(article);
  });
  container.appendChild(list);
}

function renderFaqSection(container, tool) {
  if (!container || !(tool.faqs?.length)) return;
  container.innerHTML = '';
  const heading = document.createElement('h2');
  heading.textContent = 'Häufige Fragen';
  container.appendChild(heading);
  const list = document.createElement('div');
  list.className = 'faq';
  tool.faqs.forEach((faq) => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = faq.question;
    const answer = document.createElement('p');
    answer.textContent = faq.answer;
    details.appendChild(summary);
    details.appendChild(answer);
    list.appendChild(details);
  });
  container.appendChild(list);
}

function renderRelated(container, tool) {
  if (!container || !(tool.related?.length)) return;
  container.innerHTML = '';
  const heading = document.createElement('h2');
  heading.textContent = 'Verwandte Tools';
  container.appendChild(heading);
  const list = document.createElement('div');
  list.className = 'related-list';
  tool.related.forEach((slug) => {
    const link = document.createElement('a');
    link.href = `../${slug}/`;
    link.textContent = findTool(slug)?.name ?? slug;
    list.appendChild(link);
  });
  container.appendChild(list);
}

function setMetaTags(tool) {
  document.title = `${tool.seoTitle} | Tech Teddy`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', tool.seoDescription);
  }
}

const TOOL_RENDERERS = {
  prozentrechner: renderPercentTool,
  'brutto-netto': renderBruttoNettoTool,
  zinseszins: renderCompoundTool,
  bmi: renderBmiTool,
  kalorienverbrauch: renderCaloriesTool,
  dreisatz: renderRuleOfThreeTool,
  durchschnitt: renderAverageTool,
  'zeit-umrechner': renderTimeTool,
  geschwindigkeit: renderSpeedTool,
  temperatur: renderTemperatureTool,
  laenge: renderLengthTool,
  gewicht: renderMassTool,
  volumen: renderVolumeTool,
  waehrungsrechner: renderCurrencyTool,
};

export function renderToolPage(slug) {
  const tool = findTool(slug);
  const shell = document.querySelector('[data-tool-shell]');
  if (!tool || !shell) {
    if (shell) {
      shell.innerHTML = '<p>Tool konnte nicht geladen werden.</p>';
    }
    return;
  }

  setMetaTags(tool);

  const themeToggle = document.querySelector('[data-theme-toggle]');
  setupThemeToggle(themeToggle);

  const breadcrumbs = document.querySelector('[data-breadcrumbs]');
  renderBreadcrumbs(breadcrumbs, [
    { label: 'Startseite', href: '../../index.html' },
    { label: 'Tool A–Z', href: '../../a-z/index.html' },
    { label: tool.name },
  ]);

  const titleEl = document.querySelector('[data-tool-title]');
  const descriptionEl = document.querySelector('[data-tool-description]');
  const metaEl = document.querySelector('[data-tool-meta]');
  const disclaimerEl = document.querySelector('[data-tool-disclaimer]');
  const examplesEl = document.querySelector('[data-tool-examples]');
  const faqEl = document.querySelector('[data-tool-faq]');
  const relatedEl = document.querySelector('[data-tool-related]');

  if (titleEl) titleEl.textContent = tool.name;
  if (descriptionEl) descriptionEl.textContent = tool.description;
  if (metaEl) {
    metaEl.innerHTML = '';
    const lastUpdate = document.createElement('span');
    lastUpdate.textContent = `Stand: ${formatDate(tool.lastUpdated)}`;
    metaEl.appendChild(lastUpdate);
    const category = document.createElement('span');
    category.textContent = tool.category;
    metaEl.appendChild(category);
  }
  if (disclaimerEl) {
    disclaimerEl.innerHTML = '';
    if (tool.ymyDisclaimer) {
      const alert = document.createElement('div');
      alert.className = 'disclaimer';
      alert.textContent = tool.ymyDisclaimer;
      disclaimerEl.appendChild(alert);
    }
    if (tool.additionalDisclaimer) {
      const note = document.createElement('div');
      note.className = 'warning';
      note.textContent = tool.additionalDisclaimer;
      disclaimerEl.appendChild(note);
    }
  }

  renderExamplesSection(examplesEl, tool);
  renderFaqSection(faqEl, tool);
  renderRelated(relatedEl, tool);

  const container = document.querySelector('[data-tool-interactive]');
  const renderer = TOOL_RENDERERS[slug];
  let shareState = null;
  if (renderer && container) {
    container.innerHTML = '';
    shareState = renderer(container, tool);
  } else if (container) {
    container.innerHTML = '<p>Dieses Tool ist noch in Arbeit.</p>';
  }

  const shareContainer = document.querySelector('[data-tool-sharing]');
  if (shareContainer) {
    shareContainer.innerHTML = '';
    if (shareState?.getShareParams) {
      const linkButton = document.createElement('button');
      linkButton.type = 'button';
      linkButton.textContent = '🔗 Link kopieren';
      linkButton.addEventListener('click', async () => {
        const url = shareUrl(shareState.getShareParams());
        await copyToClipboard(url);
        linkButton.textContent = '✔️ Kopiert';
        setTimeout(() => (linkButton.textContent = '🔗 Link kopieren'), 2000);
      });
      shareContainer.appendChild(linkButton);

      if (navigator.share) {
        const shareButton = document.createElement('button');
        shareButton.type = 'button';
        shareButton.textContent = '📤 Teilen';
        shareButton.addEventListener('click', () => {
          const url = shareUrl(shareState.getShareParams());
          navigator.share({
            title: `${tool.name} – Tech Teddy`,
            text: tool.shortDescription,
            url,
          });
        });
        shareContainer.appendChild(shareButton);
      }
    }
  }
}

function renderPercentTool(container, tool) {
  const mode = params.get('mode') ?? 'value';
  const base = params.get('base') ?? '';
  const rate = params.get('rate') ?? '';
  const value = params.get('value') ?? '';

  const form = document.createElement('form');
  form.noValidate = true;
  form.className = 'tool-card';

  const modeGroup = createRadioGroup({
    label: 'Was möchtest du berechnen?',
    name: 'mode',
    value: mode,
    options: [
      { value: 'value', label: 'Prozentwert' },
      { value: 'rate', label: 'Prozentsatz' },
      { value: 'base', label: 'Grundwert' },
    ],
  });

  const baseField = createNumberField({ label: 'Grundwert', name: 'base', value: base });
  const rateField = createNumberField({ label: 'Prozentsatz', name: 'rate', value: rate });
  const valueField = createNumberField({ label: 'Prozentwert', name: 'value', value: value });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  const resultValue = document.createElement('div');
  resultValue.className = 'result-value';
  const resultHint = document.createElement('p');
  resultHint.className = 'meta';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultValue);
  resultCard.appendChild(resultHint);

  form.appendChild(modeGroup);
  form.appendChild(baseField.wrapper);
  form.appendChild(rateField.wrapper);
  form.appendChild(valueField.wrapper);
  form.appendChild(resultCard);

  container.appendChild(form);

  function compute() {
    const activeMode = form.querySelector('input[name="mode"]:checked')?.value ?? 'value';
    const baseValue = parseLocaleNumber(baseField.input.value);
    const rateValue = parseLocaleNumber(rateField.input.value);
    const percentValue = parseLocaleNumber(valueField.input.value);

    let result = 0;
    try {
      result = percent({ base: baseValue, rate: rateValue, value: percentValue, mode: activeMode });
    } catch (error) {
      result = 0;
    }

    if (activeMode === 'value') {
      resultTitle.textContent = 'Prozentwert';
      resultValue.textContent = formatNumber(result, { maximumFractionDigits: 4 });
      resultHint.textContent = 'Ergebnis in der gleichen Einheit wie der Grundwert.';
    } else if (activeMode === 'rate') {
      resultTitle.textContent = 'Prozentsatz';
      resultValue.textContent = formatPercent(result, 4);
      resultHint.textContent = 'Prozentsatz als Anteil am Grundwert.';
    } else {
      resultTitle.textContent = 'Grundwert';
      resultValue.textContent = formatNumber(result, { maximumFractionDigits: 4 });
      resultHint.textContent = 'Aus welchem Grundwert ergibt sich der Prozentwert?';
    }

    updateHistory({
      mode: activeMode,
      base: baseField.input.value,
      rate: rateField.input.value,
      value: valueField.input.value,
    });
  }

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      return {
        mode: form.querySelector('input[name="mode"]:checked')?.value ?? 'value',
        base: baseField.input.value,
        rate: rateField.input.value,
        value: valueField.input.value,
      };
    },
  };
}

function renderBruttoNettoTool(container) {
  const gross = params.get('gross') ?? '';
  const taxClass = params.get('taxClass') ?? 'I';
  const church = params.get('church') === 'true';

  const taxClassRates = {
    I: { tax: 0.2, social: 0.2 },
    II: { tax: 0.19, social: 0.2 },
    III: { tax: 0.12, social: 0.2 },
    IV: { tax: 0.2, social: 0.2 },
    V: { tax: 0.26, social: 0.2 },
    VI: { tax: 0.32, social: 0.2 },
  };

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const grossField = createNumberField({ label: 'Bruttolohn pro Monat (in €)', name: 'gross', value: gross });
  const classField = createSelectField({
    label: 'Steuerklasse',
    name: 'taxClass',
    value: taxClass,
    options: [
      { value: 'I', label: 'Klasse I' },
      { value: 'II', label: 'Klasse II' },
      { value: 'III', label: 'Klasse III' },
      { value: 'IV', label: 'Klasse IV' },
      { value: 'V', label: 'Klasse V' },
      { value: 'VI', label: 'Klasse VI' },
    ],
  });

  const churchLabel = document.createElement('label');
  churchLabel.style.display = 'flex';
  churchLabel.style.alignItems = 'center';
  churchLabel.style.gap = '0.5rem';
  churchLabel.htmlFor = 'church';
  const churchInput = document.createElement('input');
  churchInput.type = 'checkbox';
  churchInput.id = 'church';
  churchInput.checked = church;
  const churchText = document.createElement('span');
  churchText.textContent = 'inkl. Kirchensteuer (9 % auf Lohnsteuer)';
  churchLabel.appendChild(churchInput);
  churchLabel.appendChild(churchText);

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Geschätztes Nettogehalt';
  const resultValue = document.createElement('div');
  resultValue.className = 'result-value';
  const breakdown = document.createElement('div');
  breakdown.className = 'stats-grid';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultValue);
  resultCard.appendChild(breakdown);

  form.appendChild(grossField.wrapper);
  form.appendChild(classField.wrapper);
  form.appendChild(churchLabel);
  form.appendChild(resultCard);

  container.appendChild(form);

  function compute() {
    const grossValue = parseLocaleNumber(grossField.input.value) ?? 0;
    const selectedClass = classField.select.value;
    const { tax, social } = taxClassRates[selectedClass];
    const taxAmount = grossValue * tax;
    const churchAmount = churchInput.checked ? taxAmount * 0.09 : 0;
    const socialAmount = grossValue * social;
    const net = Math.max(grossValue - taxAmount - socialAmount - churchAmount, 0);

    resultValue.textContent = formatCurrency(net, 'EUR');

    breakdown.innerHTML = '';
    const entries = [
      { label: 'Lohnsteuer (vereinfacht)', value: taxAmount },
      churchInput.checked ? { label: 'Kirchensteuer', value: churchAmount } : null,
      { label: 'Sozialabgaben (pauschal)', value: socialAmount },
      { label: 'Netto pro Monat', value: net },
    ].filter(Boolean);

    entries.forEach((entry) => {
      const card = document.createElement('div');
      card.className = 'stat-card';
      const strong = document.createElement('strong');
      strong.textContent = formatCurrency(entry.value, 'EUR');
      const label = document.createElement('div');
      label.textContent = entry.label;
      card.appendChild(strong);
      card.appendChild(label);
      breakdown.appendChild(card);
    });

    updateHistory({
      gross: grossField.input.value,
      taxClass: classField.select.value,
      church: churchInput.checked ? 'true' : '',
    });
  }

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      return {
        gross: grossField.input.value,
        taxClass: classField.select.value,
        church: churchInput.checked ? 'true' : '',
      };
    },
  };
}

function renderCompoundTool(container) {
  const principal = params.get('principal') ?? '';
  const rate = params.get('rate') ?? '';
  const years = params.get('years') ?? '';
  const frequency = params.get('frequency') ?? '12';
  const contribution = params.get('contribution') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const principalField = createNumberField({ label: 'Startkapital in €', name: 'principal', value: principal });
  const rateField = createNumberField({ label: 'Zinssatz p.a. in %', name: 'rate', value: rate });
  const yearsField = createNumberField({ label: 'Laufzeit in Jahren', name: 'years', value: years });
  const frequencyField = createSelectField({
    label: 'Verzinsungen pro Jahr',
    name: 'frequency',
    value: frequency,
    options: [
      { value: '1', label: 'Jährlich (1×)' },
      { value: '2', label: 'Halbjährlich (2×)' },
      { value: '4', label: 'Quartalsweise (4×)' },
      { value: '12', label: 'Monatlich (12×)' },
      { value: '52', label: 'Wöchentlich (52×)' },
    ],
  });
  const contributionField = createNumberField({ label: 'Regelmäßige Einzahlung je Periode (optional)', name: 'contribution', value: contribution });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Ergebnisübersicht';
  const resultValue = document.createElement('div');
  resultValue.className = 'result-value';
  const breakdown = document.createElement('div');
  breakdown.className = 'stats-grid';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultValue);
  resultCard.appendChild(breakdown);

  form.appendChild(principalField.wrapper);
  form.appendChild(rateField.wrapper);
  form.appendChild(yearsField.wrapper);
  form.appendChild(frequencyField.wrapper);
  form.appendChild(contributionField.wrapper);
  form.appendChild(resultCard);

  container.appendChild(form);

  function compute() {
    const principalValue = parseLocaleNumber(principalField.input.value);
    const rateValue = parseLocaleNumber(rateField.input.value);
    const yearsValue = parseLocaleNumber(yearsField.input.value);
    const contributionValue = parseLocaleNumber(contributionField.input.value) ?? 0;
    const compoundsPerYear = Number(frequencyField.select.value) || 1;

    const result = compound({
      principal: principalValue ?? 0,
      rate: rateValue ?? 0,
      years: yearsValue ?? 0,
      compoundsPerYear,
      contribution: contributionValue,
    });

    resultValue.textContent = formatCurrency(result.futureValue, 'EUR');
    breakdown.innerHTML = '';
    const items = [
      { label: 'Einzahlungen gesamt', value: result.totalContribution },
      { label: 'Zinsgewinne', value: result.interestEarned },
      { label: 'Endkapital', value: result.futureValue },
    ];
    items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'stat-card';
      const strong = document.createElement('strong');
      strong.textContent = formatCurrency(item.value, 'EUR');
      const label = document.createElement('div');
      label.textContent = item.label;
      card.appendChild(strong);
      card.appendChild(label);
      breakdown.appendChild(card);
    });

    updateHistory({
      principal: principalField.input.value,
      rate: rateField.input.value,
      years: yearsField.input.value,
      frequency: frequencyField.select.value,
      contribution: contributionField.input.value,
    });
  }

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      return {
        principal: principalField.input.value,
        rate: rateField.input.value,
        years: yearsField.input.value,
        frequency: frequencyField.select.value,
        contribution: contributionField.input.value,
      };
    },
  };
}

function renderBmiTool(container) {
  const height = params.get('height') ?? '';
  const weight = params.get('weight') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const heightField = createNumberField({ label: 'Körpergröße in cm', name: 'height', value: height });
  const weightField = createNumberField({ label: 'Gewicht in kg', name: 'weight', value: weight });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'BMI & Kategorie';
  const resultValue = document.createElement('div');
  resultValue.className = 'result-value';
  const resultHint = document.createElement('p');

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultValue);
  resultCard.appendChild(resultHint);

  form.appendChild(heightField.wrapper);
  form.appendChild(weightField.wrapper);
  form.appendChild(resultCard);

  container.appendChild(form);

  function compute() {
    const heightValue = parseLocaleNumber(heightField.input.value);
    const weightValue = parseLocaleNumber(weightField.input.value);
    const result = bmi({ heightCm: heightValue ?? 0, weightKg: weightValue ?? 0 });
    resultValue.textContent = result.bmi ? formatNumber(result.bmi, { maximumFractionDigits: 1 }) : '–';
    resultHint.textContent = result.category || 'Bitte Daten eingeben.';

    updateHistory({
      height: heightField.input.value,
      weight: weightField.input.value,
    });
  }

  form.addEventListener('input', compute);
  compute();

  return {
    getShareParams() {
      return {
        height: heightField.input.value,
        weight: weightField.input.value,
      };
    },
  };
}

function renderCaloriesTool(container) {
  const weight = params.get('weight') ?? '';
  const height = params.get('height') ?? '';
  const age = params.get('age') ?? '';
  const sex = params.get('sex') ?? 'female';
  const pal = params.get('pal') ?? '1.4';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const weightField = createNumberField({ label: 'Gewicht in kg', name: 'weight', value: weight });
  const heightField = createNumberField({ label: 'Größe in cm', name: 'height', value: height });
  const ageField = createNumberField({ label: 'Alter in Jahren', name: 'age', value: age });
  const sexField = createSelectField({
    label: 'Geschlecht',
    name: 'sex',
    value: sex,
    options: [
      { value: 'female', label: 'weiblich' },
      { value: 'male', label: 'männlich' },
      { value: 'diverse', label: 'divers' },
    ],
  });
  const palField = createSelectField({
    label: 'Aktivitätslevel (PAL)',
    name: 'pal',
    value: pal,
    options: PAL_VALUES.map((item) => ({ value: String(item.value), label: `${item.value} – ${item.label}` })),
  });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Kalorienbedarf';
  const resultValue = document.createElement('div');
  resultValue.className = 'result-value';
  const resultHint = document.createElement('p');

  const breakdown = document.createElement('div');
  breakdown.className = 'stats-grid';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultValue);
  resultCard.appendChild(resultHint);
  resultCard.appendChild(breakdown);

  form.appendChild(weightField.wrapper);
  form.appendChild(heightField.wrapper);
  form.appendChild(ageField.wrapper);
  form.appendChild(sexField.wrapper);
  form.appendChild(palField.wrapper);
  form.appendChild(resultCard);

  container.appendChild(form);

  function compute() {
    const weightValue = parseLocaleNumber(weightField.input.value);
    const heightValue = parseLocaleNumber(heightField.input.value);
    const ageValue = parseLocaleNumber(ageField.input.value);
    const bmr = mifflinStJeor({ weightKg: weightValue ?? 0, heightCm: heightValue ?? 0, age: ageValue ?? 0, sex: sexField.select.value });
    const palValue = Number(palField.select.value) || 1;
    const tee = totalEnergyExpenditure(bmr, palValue);
    resultValue.textContent = `${formatNumber(tee, { maximumFractionDigits: 0 })} kcal/Tag`;
    resultHint.textContent = `Grundumsatz: ${formatNumber(bmr, { maximumFractionDigits: 0 })} kcal`;

    breakdown.innerHTML = '';
    PAL_VALUES.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'stat-card';
      const strong = document.createElement('strong');
      const total = totalEnergyExpenditure(bmr, item.value);
      strong.textContent = `${formatNumber(total, { maximumFractionDigits: 0 })} kcal`;
      const label = document.createElement('div');
      label.textContent = item.label;
      card.appendChild(strong);
      card.appendChild(label);
      breakdown.appendChild(card);
    });

    updateHistory({
      weight: weightField.input.value,
      height: heightField.input.value,
      age: ageField.input.value,
      sex: sexField.select.value,
      pal: palField.select.value,
    });
  }

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      return {
        weight: weightField.input.value,
        height: heightField.input.value,
        age: ageField.input.value,
        sex: sexField.select.value,
        pal: palField.select.value,
      };
    },
  };
}

function renderRuleOfThreeTool(container) {
  const baseQuantity = params.get('baseQuantity') ?? '';
  const baseResult = params.get('baseResult') ?? '';
  const targetQuantity = params.get('targetQuantity') ?? '';
  const mode = params.get('mode') ?? 'direct';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const baseQuantityField = createNumberField({ label: 'Ausgangsmenge', name: 'baseQuantity', value: baseQuantity });
  const baseResultField = createNumberField({ label: 'Ausgangsergebnis', name: 'baseResult', value: baseResult });
  const targetQuantityField = createNumberField({ label: 'Zielmenge', name: 'targetQuantity', value: targetQuantity });
  const modeGroup = createRadioGroup({
    label: 'Verhältnis',
    name: 'mode',
    value: mode,
    options: [
      { value: 'direct', label: 'Direkter Dreisatz' },
      { value: 'inverse', label: 'Umgekehrter Dreisatz' },
    ],
  });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Gesuchter Wert';
  const resultValue = document.createElement('div');
  resultValue.className = 'result-value';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultValue);

  form.appendChild(baseQuantityField.wrapper);
  form.appendChild(baseResultField.wrapper);
  form.appendChild(targetQuantityField.wrapper);
  form.appendChild(modeGroup);
  form.appendChild(resultCard);

  container.appendChild(form);

  function compute() {
    const result = ruleOfThree({
      baseQuantity: parseLocaleNumber(baseQuantityField.input.value),
      baseResult: parseLocaleNumber(baseResultField.input.value),
      targetQuantity: parseLocaleNumber(targetQuantityField.input.value),
      mode: form.querySelector('input[name="mode"]:checked')?.value ?? 'direct',
    });
    resultValue.textContent = formatNumber(result, { maximumFractionDigits: 4 });

    updateHistory({
      baseQuantity: baseQuantityField.input.value,
      baseResult: baseResultField.input.value,
      targetQuantity: targetQuantityField.input.value,
      mode: form.querySelector('input[name="mode"]:checked')?.value ?? 'direct',
    });
  }

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      return {
        baseQuantity: baseQuantityField.input.value,
        baseResult: baseResultField.input.value,
        targetQuantity: targetQuantityField.input.value,
        mode: form.querySelector('input[name="mode"]:checked')?.value ?? 'direct',
      };
    },
  };
}

function renderAverageTool(container) {
  const valuesRaw = params.get('values') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const field = document.createElement('div');
  field.className = 'field';
  const label = document.createElement('label');
  label.htmlFor = 'values';
  label.textContent = 'Zahlenliste (Komma, Semikolon oder Zeilenumbruch)';
  const textarea = document.createElement('textarea');
  textarea.id = 'values';
  textarea.name = 'values';
  textarea.rows = 6;
  textarea.value = valuesRaw;
  textarea.placeholder = '12; 15; 18,5; 21';

  field.appendChild(label);
  field.appendChild(textarea);

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const summary = document.createElement('div');
  summary.className = 'stats-grid';
  resultCard.appendChild(summary);

  form.appendChild(field);
  form.appendChild(resultCard);
  container.appendChild(form);

  function compute() {
    const raw = textarea.value;
    const normalized = raw.replace(/\n/g, ',');
    const parts = normalized
      .split(/[,;\s]+/)
      .map((part) => parseLocaleNumber(part))
      .filter((value) => typeof value === 'number');

    summary.innerHTML = '';
    if (!parts.length) {
      const note = document.createElement('p');
      note.textContent = 'Bitte Zahlen eingeben.';
      summary.appendChild(note);
    } else {
      const entries = [
        { label: 'Anzahl Werte', value: parts.length },
        { label: 'Summe', value: parts.reduce((acc, value) => acc + value, 0) },
        { label: 'Arithmetisches Mittel', value: arithmeticMean(parts) },
        { label: 'Median', value: median(parts) },
        { label: 'Standardabweichung', value: populationStandardDeviation(parts) },
      ];
      entries.forEach((entry) => {
        const card = document.createElement('div');
        card.className = 'stat-card';
        const strong = document.createElement('strong');
        strong.textContent = formatNumber(entry.value, { maximumFractionDigits: 4 });
        const label = document.createElement('div');
        label.textContent = entry.label;
        card.appendChild(strong);
        card.appendChild(label);
        summary.appendChild(card);
      });
    }

    updateHistory({ values: textarea.value });
  }

  textarea.addEventListener('input', compute);
  compute();

  return {
    getShareParams() {
      return { values: textarea.value };
    },
  };
}

function renderTimeTool(container) {
  const valueParam = params.get('value') ?? '';
  const unitParam = params.get('unit') ?? 'hour';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const valueField = createNumberField({ label: 'Zeitwert', name: 'value', value: valueParam });
  const unitField = createSelectField({
    label: 'Ausgangseinheit',
    name: 'unit',
    value: unitParam,
    options: Object.entries(timeUnits).map(([value, label]) => ({ value, label })),
  });

  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-wrapper';
  const table = document.createElement('table');
  table.className = 'tool-table';
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  const headUnit = document.createElement('th');
  headUnit.textContent = 'Einheit';
  const headValue = document.createElement('th');
  headValue.textContent = 'Wert';
  headRow.appendChild(headUnit);
  headRow.appendChild(headValue);
  thead.appendChild(headRow);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  tableWrapper.appendChild(table);

  form.appendChild(valueField.wrapper);
  form.appendChild(unitField.wrapper);
  form.appendChild(tableWrapper);
  container.appendChild(form);

  function compute() {
    const value = parseLocaleNumber(valueField.input.value);
    tbody.innerHTML = '';
    if (typeof value !== 'number') {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 2;
      cell.textContent = 'Bitte Zahl eingeben.';
      row.appendChild(cell);
      tbody.appendChild(row);
    } else {
      Object.entries(timeUnits).forEach(([unit, label]) => {
        const converted = convertTime(value, unitField.select.value, unit);
        const row = document.createElement('tr');
        const unitCell = document.createElement('td');
        unitCell.textContent = label;
        const valueCell = document.createElement('td');
        valueCell.textContent = formatNumber(converted, { maximumFractionDigits: 6 });
        row.appendChild(unitCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
      });
    }

    updateHistory({ value: valueField.input.value, unit: unitField.select.value });
  }

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      return {
        value: valueField.input.value,
        unit: unitField.select.value,
      };
    },
  };
}

function renderSpeedTool(container) {
  const valueParam = params.get('value') ?? '';
  const unitParam = params.get('unit') ?? 'kilometersPerHour';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const valueField = createNumberField({ label: 'Geschwindigkeit', name: 'value', value: valueParam });
  const unitField = createSelectField({
    label: 'Ausgangseinheit',
    name: 'unit',
    value: unitParam,
    options: Object.entries(speedUnits).map(([value, label]) => ({ value, label })),
  });

  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-wrapper';
  const table = document.createElement('table');
  table.className = 'tool-table';
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  headRow.innerHTML = '<th>Einheit</th><th>Wert</th>';
  thead.appendChild(headRow);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  tableWrapper.appendChild(table);

  form.appendChild(valueField.wrapper);
  form.appendChild(unitField.wrapper);
  form.appendChild(tableWrapper);
  container.appendChild(form);

  function compute() {
    const value = parseLocaleNumber(valueField.input.value);
    tbody.innerHTML = '';
    if (typeof value !== 'number') {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 2;
      cell.textContent = 'Bitte Zahl eingeben.';
      row.appendChild(cell);
      tbody.appendChild(row);
    } else {
      Object.entries(speedUnits).forEach(([unit, label]) => {
        const converted = convertSpeed(value, unitField.select.value, unit);
        const row = document.createElement('tr');
        const unitCell = document.createElement('td');
        unitCell.textContent = label;
        const valueCell = document.createElement('td');
        valueCell.textContent = formatNumber(converted, { maximumFractionDigits: 6 });
        row.appendChild(unitCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
      });
    }

    updateHistory({ value: valueField.input.value, unit: unitField.select.value });
  }

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      return {
        value: valueField.input.value,
        unit: unitField.select.value,
      };
    },
  };
}

function renderTemperatureTool(container) {
  const valueParam = params.get('value') ?? '';
  const unitParam = params.get('unit') ?? 'celsius';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const valueField = createNumberField({ label: 'Temperaturwert', name: 'value', value: valueParam });
  const unitField = createSelectField({
    label: 'Ausgangseinheit',
    name: 'unit',
    value: unitParam,
    options: Object.entries(temperatureUnits).map(([value, label]) => ({ value, label })),
  });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const list = document.createElement('div');
  list.className = 'stats-grid';
  resultCard.appendChild(list);

  form.appendChild(valueField.wrapper);
  form.appendChild(unitField.wrapper);
  form.appendChild(resultCard);
  container.appendChild(form);

  function compute() {
    const value = parseLocaleNumber(valueField.input.value);
    list.innerHTML = '';
    if (typeof value !== 'number') {
      const note = document.createElement('p');
      note.textContent = 'Bitte Zahl eingeben.';
      list.appendChild(note);
    } else {
      Object.entries(temperatureUnits).forEach(([unit, label]) => {
        const converted = convertTemperature(value, unitField.select.value, unit);
        const card = document.createElement('div');
        card.className = 'stat-card';
        const strong = document.createElement('strong');
        strong.textContent = `${formatNumber(converted, { maximumFractionDigits: 2 })}`;
        const text = document.createElement('div');
        text.textContent = label;
        card.appendChild(strong);
        card.appendChild(text);
        list.appendChild(card);
      });
    }

    updateHistory({ value: valueField.input.value, unit: unitField.select.value });
  }

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      return {
        value: valueField.input.value,
        unit: unitField.select.value,
      };
    },
  };
}

function renderLengthTool(container) {
  return renderUnitConverter({
    container,
    units: lengthUnits,
    convert: convertLength,
    paramUnitKey: 'unit',
    paramValueKey: 'value',
    defaultUnit: 'meter',
    label: 'Länge',
  });
}

function renderMassTool(container) {
  return renderUnitConverter({
    container,
    units: massUnits,
    convert: convertMass,
    paramUnitKey: 'unit',
    paramValueKey: 'value',
    defaultUnit: 'kilogram',
    label: 'Gewicht',
  });
}

function renderVolumeTool(container) {
  return renderUnitConverter({
    container,
    units: volumeUnits,
    convert: convertVolume,
    paramUnitKey: 'unit',
    paramValueKey: 'value',
    defaultUnit: 'liter',
    label: 'Volumen',
  });
}

function renderUnitConverter({ container, units, convert, paramUnitKey, paramValueKey, defaultUnit, label }) {
  const valueParam = params.get(paramValueKey) ?? '';
  const unitParam = params.get(paramUnitKey) ?? defaultUnit;

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const valueField = createNumberField({ label: `${label} eingeben`, name: paramValueKey, value: valueParam });
  const unitField = createSelectField({
    label: 'Ausgangseinheit',
    name: paramUnitKey,
    value: unitParam,
    options: Object.entries(units).map(([value, unitLabel]) => ({ value, label: unitLabel })),
  });

  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-wrapper';
  const table = document.createElement('table');
  table.className = 'tool-table';
  table.innerHTML = '<thead><tr><th>Einheit</th><th>Wert</th></tr></thead>';
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  tableWrapper.appendChild(table);

  form.appendChild(valueField.wrapper);
  form.appendChild(unitField.wrapper);
  form.appendChild(tableWrapper);
  container.appendChild(form);

  function compute() {
    const value = parseLocaleNumber(valueField.input.value);
    tbody.innerHTML = '';
    if (typeof value !== 'number') {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 2;
      cell.textContent = 'Bitte Zahl eingeben.';
      row.appendChild(cell);
      tbody.appendChild(row);
    } else {
      Object.entries(units).forEach(([unit, unitLabel]) => {
        const converted = convert(value, unitField.select.value, unit);
        const row = document.createElement('tr');
        const unitCell = document.createElement('td');
        unitCell.textContent = unitLabel;
        const valueCell = document.createElement('td');
        valueCell.textContent = formatNumber(converted, { maximumFractionDigits: 6 });
        row.appendChild(unitCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
      });
    }

    const update = {};
    update[paramValueKey] = valueField.input.value;
    update[paramUnitKey] = unitField.select.value;
    updateHistory(update);
  }

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      return {
        [paramValueKey]: valueField.input.value,
        [paramUnitKey]: unitField.select.value,
      };
    },
  };
}

const FX_ENDPOINT = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
const FX_STORAGE_KEY = 'tech-teddy-fx';
// EZB-Referenzkurse vom 19.09.2025 als Fallback für statische Hosts ohne CORS-Zugriff.
const FX_FALLBACK = {
  date: '2025-09-19',
  rates: {
    AUD: 1.7802,
    BGN: 1.9558,
    BRL: 6.2567,
    CAD: 1.6214,
    CHF: 0.9344,
    CNY: 8.351,
    CZK: 24.292,
    DKK: 7.4635,
    EUR: 1,
    GBP: 0.8708,
    HKD: 9.1256,
    HUF: 390.55,
    IDR: 19541.55,
    ILS: 3.9196,
    INR: 103.465,
    ISK: 143.0,
    JPY: 173.79,
    KRW: 1640.88,
    MXN: 21.6277,
    MYR: 4.9373,
    NOK: 11.6705,
    NZD: 2.0029,
    PHP: 67.032,
    PLN: 4.263,
    RON: 5.075,
    SEK: 11.0705,
    SGD: 1.5081,
    THB: 37.42,
    TRY: 48.5812,
    USD: 1.1736,
    ZAR: 20.4038,
  },
};

async function loadRates() {
  const cached = readState(FX_STORAGE_KEY);
  const now = Date.now();
  let staleCache = null;
  if (cached && cached.timestamp) {
    const age = now - cached.timestamp;
    const isFallback = cached.source === 'fallback';
    if (!isFallback && age < 24 * 60 * 60 * 1000) {
      return cached;
    }
    if (!isFallback && age < 48 * 60 * 60 * 1000) {
      staleCache = {
        ...cached,
        stale: true,
      };
    }
    if (isFallback) {
      staleCache = {
        ...cached,
        stale: true,
      };
    }
  }

  try {
    const response = await fetch(FX_ENDPOINT, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Netzwerkfehler');
    }
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/xml');
    const dateCube = doc.querySelector('Cube[currency]')?.parentElement?.getAttribute('time');
    const rates = { EUR: 1 };
    doc.querySelectorAll('Cube[currency]').forEach((cube) => {
      const currency = cube.getAttribute('currency');
      const rate = cube.getAttribute('rate');
      if (currency && rate) {
        rates[currency] = Number(rate);
      }
    });
    const payload = { timestamp: now, rates, date: dateCube, stale: false, source: 'remote' };
    persistState(FX_STORAGE_KEY, payload);
    return payload;
  } catch (error) {
    if (staleCache) {
      return staleCache;
    }
    if (FX_FALLBACK) {
      const fallback = {
        timestamp: now,
        date: FX_FALLBACK.date,
        rates: FX_FALLBACK.rates,
        stale: true,
        source: 'fallback',
      };
      persistState(FX_STORAGE_KEY, fallback);
      return fallback;
    }
    throw error;
  }
}

function renderCurrencyTool(container) {
  const amountParam = params.get('amount') ?? '100';
  const fromParam = params.get('from') ?? 'EUR';
  const toParam = params.get('to') ?? 'USD';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const amountField = createNumberField({ label: 'Betrag', name: 'amount', value: amountParam });
  const fromField = createSelectField({
    label: 'Von Währung',
    name: 'from',
    value: fromParam,
    options: currencyOptions(),
  });
  const toField = createSelectField({
    label: 'Zu Währung',
    name: 'to',
    value: toParam,
    options: currencyOptions(),
  });

  const swapButton = document.createElement('button');
  swapButton.type = 'button';
  swapButton.className = 'btn btn-secondary';
  swapButton.textContent = '⇄ Tauschen';

  const controls = document.createElement('div');
  controls.className = 'tool-sharing';
  controls.appendChild(swapButton);

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Umrechnung';
  const resultValue = document.createElement('div');
  resultValue.className = 'result-value';
  const resultHint = document.createElement('p');

  const rateInfo = document.createElement('div');
  rateInfo.className = 'meta';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultValue);
  resultCard.appendChild(resultHint);
  resultCard.appendChild(rateInfo);

  form.appendChild(amountField.wrapper);
  form.appendChild(fromField.wrapper);
  form.appendChild(toField.wrapper);
  form.appendChild(controls);
  form.appendChild(resultCard);

  container.appendChild(form);

  let rates = null;

  function compute() {
    const amountValue = parseLocaleNumber(amountField.input.value) ?? 0;
    if (!rates) {
      resultValue.textContent = '…';
      resultHint.textContent = 'Kurse werden geladen…';
      return;
    }
    const fromRate = rates.rates[fromField.select.value];
    const toRate = rates.rates[toField.select.value];
    if (!fromRate || !toRate) {
      resultValue.textContent = '–';
      resultHint.textContent = 'Währung nicht verfügbar.';
      return;
    }
    const eurAmount = amountValue / fromRate;
    const converted = eurAmount * toRate;
    resultValue.textContent = formatCurrency(converted, toField.select.value);
    resultHint.textContent = `${formatCurrency(amountValue, fromField.select.value)} entsprechen ${formatCurrency(converted, toField.select.value)}.`;
    const suffix =
      rates.source === 'fallback'
        ? ' (Fallback-Stand)'
        : rates.stale
        ? ' (gespeicherter Kurs)'
        : '';
    rateInfo.textContent = `EZB-Referenzkurs vom ${rates.date ?? 'aktuellen Handelstag'}${suffix}`;

    updateHistory({
      amount: amountField.input.value,
      from: fromField.select.value,
      to: toField.select.value,
    });
  }

  swapButton.addEventListener('click', () => {
    const currentFrom = fromField.select.value;
    fromField.select.value = toField.select.value;
    toField.select.value = currentFrom;
    compute();
  });

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);

  loadRates()
    .then((data) => {
      rates = data;
      compute();
    })
    .catch(() => {
      resultValue.textContent = '–';
      resultHint.textContent = 'Kurse konnten nicht geladen werden.';
      rateInfo.textContent = 'Bitte später erneut versuchen.';
    });

  compute();

  return {
    getShareParams() {
      return {
        amount: amountField.input.value,
        from: fromField.select.value,
        to: toField.select.value,
      };
    },
  };
}

function currencyOptions() {
  const popular = ['EUR', 'USD', 'CHF', 'GBP', 'PLN', 'SEK', 'NOK', 'DKK', 'CZK', 'JPY', 'AUD', 'CAD'];
  return popular.map((code) => ({ value: code, label: code }));
}
