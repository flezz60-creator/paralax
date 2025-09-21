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
  convertArea,
  convertEnergy,
  convertLength,
  convertMass,
  convertSpeed,
  convertTemperature,
  convertTime,
  convertVolume,
  areaUnits,
  energyUnits,
  lengthUnits,
  massUnits,
  median,
  mifflinStJeor,
  operateFractions,
  percent,
  populationStandardDeviation,
  primeFactorization,
  ruleOfThree,
  simplifyFraction,
  speedUnits,
  temperatureUnits,
  timeUnits,
  totalEnergyExpenditure,
  triangleAreaBaseHeight,
  triangleAreaHeron,
  triangleAreaTwoSidesAngle,
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

function createTextareaField({ label, name, value = '', rows = 6, placeholder = '' }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const labelEl = document.createElement('label');
  labelEl.htmlFor = name;
  labelEl.textContent = label;
  const textarea = document.createElement('textarea');
  textarea.id = name;
  textarea.name = name;
  textarea.rows = rows;
  textarea.value = value;
  textarea.placeholder = placeholder;
  wrapper.appendChild(labelEl);
  wrapper.appendChild(textarea);
  return { wrapper, textarea };
}

function createTextField({ label, name, value = '', placeholder = '' }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const labelEl = document.createElement('label');
  labelEl.htmlFor = name;
  labelEl.textContent = label;
  const input = document.createElement('input');
  input.type = 'text';
  input.id = name;
  input.name = name;
  input.value = value;
  if (placeholder) {
    input.placeholder = placeholder;
  }
  wrapper.appendChild(labelEl);
  wrapper.appendChild(input);
  return { wrapper, input };
}

function createCheckboxField({ label, name, checked = false }) {
  const wrapper = document.createElement('label');
  wrapper.className = 'checkbox';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.name = name;
  input.checked = checked;
  const span = document.createElement('span');
  span.textContent = label;
  wrapper.appendChild(input);
  wrapper.appendChild(span);
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
  primfaktorzerlegung: renderPrimeFactorTool,
  'potenz-wurzel': renderExponentTool,
  bruchrechner: renderFractionTool,
  flaeche: renderAreaTool,
  energie: renderEnergyTool,
  'dreiecks-flaeche': renderTriangleTool,
  'zeichen-zaehler': renderCharacterCountTool,
  'wort-zaehler': renderWordCountTool,
  'lorem-ipsum': renderLoremIpsumTool,
  'gross-klein': renderCaseConverterTool,
  'palindrom-check': renderPalindromeTool,
  'passwort-generator': renderPasswordTool,
  'username-generator': renderUsernameTool,
  'domainname-generator': renderDomainNameTool,
  'reverse-text': renderReverseTextTool,
  'anagramm-generator': renderAnagramTool,
  zufallszahl: renderRandomNumberTool,
  'emoji-counter': renderEmojiCounterTool,
  'qr-code-generator': renderQrCodeTool,
  'hash-generator': renderHashTool,
  'pdf-merger': renderPdfMergerTool,
  'json-formatter': renderJsonFormatterTool,
  'csv-to-json': renderCsvToJsonTool,
  minifier: renderMinifierTool,
  'regex-tester': renderRegexTesterTool,
  'farbcode-konverter': renderColorConverterTool,
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

function renderPrimeFactorTool(container) {
  const valueParam = params.get('n') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const numberField = createNumberField({
    label: 'Natürliche Zahl (≥ 2)',
    name: 'n',
    value: valueParam,
    step: 1,
  });
  numberField.input.inputMode = 'numeric';

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Primfaktorzerlegung';
  const resultValue = document.createElement('div');
  resultValue.className = 'result-value';
  const resultHint = document.createElement('p');
  resultHint.className = 'meta';
  const infoList = document.createElement('ul');
  infoList.className = 'result-list';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultValue);
  resultCard.appendChild(resultHint);
  resultCard.appendChild(infoList);

  form.appendChild(numberField.wrapper);
  form.appendChild(resultCard);
  container.appendChild(form);

  function compute() {
    const parsed = parseLocaleNumber(numberField.input.value);
    const integer = typeof parsed === 'number' ? Math.trunc(parsed) : NaN;
    infoList.innerHTML = '';

    if (!Number.isFinite(integer) || integer < 2) {
      resultValue.textContent = '—';
      resultHint.textContent = 'Bitte eine ganze Zahl ab 2 eingeben.';
      updateHistory({ n: numberField.input.value });
      return;
    }

    const factors = primeFactorization(integer);
    if (!factors.length) {
      resultValue.textContent = String(integer);
      resultHint.textContent = 'Keine Zerlegung gefunden.';
      updateHistory({ n: numberField.input.value });
      return;
    }

    const expanded = [];
    factors.forEach((factor) => {
      for (let i = 0; i < factor.exponent; i += 1) {
        expanded.push(String(factor.prime));
      }
    });

    const exponentText = factors
      .map((factor) => (factor.exponent > 1 ? `${factor.prime}^${factor.exponent}` : `${factor.prime}`))
      .join(' × ');
    const expandedText = expanded.join(' × ');
    const isPrime = factors.length === 1 && factors[0].exponent === 1;

    resultValue.textContent = exponentText || String(integer);
    resultHint.textContent = isPrime
      ? `${integer} ist eine Primzahl – nur durch 1 und sich selbst teilbar.`
      : `${integer} = ${expandedText}`;

    const divisorCount = factors.reduce((acc, factor) => acc * (factor.exponent + 1), 1);
    const divisorSum = factors.reduce(
      (acc, factor) => acc * ((factor.prime ** (factor.exponent + 1) - 1) / (factor.prime - 1)),
      1
    );
    const eulerPhi = factors.reduce(
      (acc, factor) => acc * (factor.prime - 1) * factor.prime ** (factor.exponent - 1),
      1
    );
    const largestPrime = factors[factors.length - 1]?.prime ?? integer;

    [
      `Primzahl? ${isPrime ? 'Ja' : 'Nein'}`,
      `Anzahl der Teiler: ${formatNumber(divisorCount, { maximumFractionDigits: 0 })}`,
      `Summe der Teiler: ${formatNumber(divisorSum, { maximumFractionDigits: 0 })}`,
      `Größter Primfaktor: ${largestPrime}`,
      `Euler φ(n): ${formatNumber(eulerPhi, { maximumFractionDigits: 0 })}`,
    ].forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      infoList.appendChild(li);
    });

    updateHistory({ n: numberField.input.value });
  }

  form.addEventListener('input', compute);
  compute();

  return {
    getShareParams() {
      return { n: numberField.input.value };
    },
  };
}

function renderExponentTool(container) {
  const modeParam = params.get('mode') ?? 'power';
  const baseParam = params.get('base') ?? '';
  const exponentParam = params.get('exp') ?? '2';
  const radicandParam = params.get('radicand') ?? '';
  const degreeParam = params.get('degree') ?? '2';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const modeGroup = createRadioGroup({
    label: 'Berechnung wählen',
    name: 'mode',
    value: modeParam,
    options: [
      { value: 'power', label: 'Potenz (a^b)' },
      { value: 'root', label: 'n-te Wurzel' },
    ],
  });

  const baseField = createNumberField({ label: 'Basis a', name: 'base', value: baseParam });
  const exponentField = createNumberField({ label: 'Exponent b', name: 'exp', value: exponentParam });
  const radicandField = createNumberField({ label: 'Radikand', name: 'radicand', value: radicandParam });
  const degreeField = createNumberField({ label: 'Wurzelexponent n', name: 'degree', value: degreeParam });

  const powerGroup = document.createElement('div');
  powerGroup.className = 'field-grid';
  powerGroup.dataset.mode = 'power';
  powerGroup.appendChild(baseField.wrapper);
  powerGroup.appendChild(exponentField.wrapper);

  const rootGroup = document.createElement('div');
  rootGroup.className = 'field-grid';
  rootGroup.dataset.mode = 'root';
  rootGroup.appendChild(radicandField.wrapper);
  rootGroup.appendChild(degreeField.wrapper);

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Ergebnis';
  const resultValue = document.createElement('div');
  resultValue.className = 'result-value';
  const resultHint = document.createElement('p');
  resultHint.className = 'meta';
  const infoList = document.createElement('ul');
  infoList.className = 'result-list';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultValue);
  resultCard.appendChild(resultHint);
  resultCard.appendChild(infoList);

  form.appendChild(modeGroup);
  form.appendChild(powerGroup);
  form.appendChild(rootGroup);
  form.appendChild(resultCard);
  container.appendChild(form);

  function setVisibility(mode) {
    powerGroup.style.display = mode === 'power' ? 'grid' : 'none';
    rootGroup.style.display = mode === 'root' ? 'grid' : 'none';
  }

  function compute() {
    const mode = form.querySelector('input[name="mode"]:checked')?.value ?? 'power';
    setVisibility(mode);
    infoList.innerHTML = '';

    if (mode === 'power') {
      const baseValue = parseLocaleNumber(baseField.input.value);
      const exponentValue = parseLocaleNumber(exponentField.input.value);
      if (typeof baseValue !== 'number' || typeof exponentValue !== 'number') {
        resultValue.textContent = '—';
        resultHint.textContent = 'Bitte Basis und Exponent eingeben.';
      } else {
        const result = baseValue ** exponentValue;
        if (!Number.isFinite(result)) {
          resultValue.textContent = '–';
          resultHint.textContent = 'Ergebnis außerhalb des darstellbaren Bereichs.';
        } else {
          resultValue.textContent = formatNumber(result, { maximumFractionDigits: 10 });
          resultHint.textContent = `${formatNumber(baseValue)} ^ ${formatNumber(exponentValue)} = ${formatNumber(result)}`;
          const reciprocal = result !== 0 ? 1 / result : null;
          const ln = result > 0 ? Math.log(result) : null;
          const infoItems = [
            `Wissenschaftliche Schreibweise: ${result.toExponential(6)}`,
            reciprocal !== null ? `Kehrwert: ${formatNumber(reciprocal, { maximumFractionDigits: 10 })}` : 'Kehrwert: nicht definiert',
            ln !== null ? `Natürlicher Logarithmus: ${formatNumber(ln, { maximumFractionDigits: 6 })}` : 'ln(Ergebnis) nicht definiert',
          ];
          infoItems.forEach((text) => {
            const li = document.createElement('li');
            li.textContent = text;
            infoList.appendChild(li);
          });
        }
      }
    } else {
      const radicandValue = parseLocaleNumber(radicandField.input.value);
      const degreeValue = parseLocaleNumber(degreeField.input.value);
      const degreeInt = typeof degreeValue === 'number' ? degreeValue : NaN;
      if (typeof radicandValue !== 'number' || typeof degreeValue !== 'number' || degreeValue === 0) {
        resultValue.textContent = '—';
        resultHint.textContent = 'Bitte Radikand und gültigen Wurzelexponenten eingeben.';
      } else if (radicandValue < 0 && (!Number.isInteger(degreeInt) || Math.abs(degreeInt) % 2 === 0)) {
        resultValue.textContent = '–';
        resultHint.textContent = 'Gerade Wurzeln negativer Zahlen sind im Reellen nicht definiert.';
      } else {
        const root = Math.sign(radicandValue) * Math.abs(radicandValue) ** (1 / degreeValue);
        if (!Number.isFinite(root)) {
          resultValue.textContent = '–';
          resultHint.textContent = 'Ergebnis außerhalb des darstellbaren Bereichs.';
        } else {
          resultValue.textContent = formatNumber(root, { maximumFractionDigits: 10 });
          resultHint.textContent = `${formatNumber(degreeValue)}-te Wurzel aus ${formatNumber(radicandValue)} = ${formatNumber(root)}`;
          const poweredBack = root ** degreeValue;
          const reciprocal = root !== 0 ? 1 / root : null;
          const infoItems = [
            `Prüfung: Ergebnis^Grad = ${formatNumber(poweredBack, { maximumFractionDigits: 6 })}`,
            reciprocal !== null ? `Kehrwert: ${formatNumber(reciprocal, { maximumFractionDigits: 10 })}` : 'Kehrwert: nicht definiert',
            `Wissenschaftliche Schreibweise: ${root.toExponential(6)}`,
          ];
          infoItems.forEach((text) => {
            const li = document.createElement('li');
            li.textContent = text;
            infoList.appendChild(li);
          });
        }
      }
    }

    updateHistory({
      mode,
      base: baseField.input.value,
      exp: exponentField.input.value,
      radicand: radicandField.input.value,
      degree: degreeField.input.value,
    });
  }

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      const mode = form.querySelector('input[name="mode"]:checked')?.value ?? 'power';
      return {
        mode,
        base: baseField.input.value,
        exp: exponentField.input.value,
        radicand: radicandField.input.value,
        degree: degreeField.input.value,
      };
    },
  };
}

function renderFractionTool(container) {
  const aNumParam = params.get('a') ?? '';
  const aDenParam = params.get('ad') ?? '';
  const bNumParam = params.get('b') ?? '';
  const bDenParam = params.get('bd') ?? '';
  const operationParam = params.get('op') ?? 'add';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const aNumField = createNumberField({ label: 'Zähler A', name: 'a', value: aNumParam, step: 1 });
  const aDenField = createNumberField({ label: 'Nenner A', name: 'ad', value: aDenParam, step: 1 });
  const bNumField = createNumberField({ label: 'Zähler B', name: 'b', value: bNumParam, step: 1 });
  const bDenField = createNumberField({ label: 'Nenner B', name: 'bd', value: bDenParam, step: 1 });

  const fractionGrid = document.createElement('div');
  fractionGrid.className = 'field-grid';
  fractionGrid.appendChild(aNumField.wrapper);
  fractionGrid.appendChild(aDenField.wrapper);
  fractionGrid.appendChild(bNumField.wrapper);
  fractionGrid.appendChild(bDenField.wrapper);

  const operationField = createSelectField({
    label: 'Rechenart',
    name: 'op',
    value: operationParam,
    options: [
      { value: 'add', label: 'Addition (A + B)' },
      { value: 'subtract', label: 'Subtraktion (A − B)' },
      { value: 'multiply', label: 'Multiplikation (A × B)' },
      { value: 'divide', label: 'Division (A ÷ B)' },
    ],
  });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Ergebnis';
  const resultValue = document.createElement('div');
  resultValue.className = 'result-value';
  const resultHint = document.createElement('p');
  resultHint.className = 'meta';
  const infoList = document.createElement('ul');
  infoList.className = 'result-list';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultValue);
  resultCard.appendChild(resultHint);
  resultCard.appendChild(infoList);

  form.appendChild(fractionGrid);
  form.appendChild(operationField.wrapper);
  form.appendChild(resultCard);
  container.appendChild(form);

  function formatFractionValue(numerator, denominator) {
    if (denominator === 0) {
      return 'nicht definiert';
    }
    if (denominator === 1) {
      return formatNumber(numerator);
    }
    return `${numerator} / ${denominator}`;
  }

  function toMixedNumber(numerator, denominator) {
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
      return '–';
    }
    const whole = numerator >= 0 ? Math.floor(numerator / denominator) : Math.ceil(numerator / denominator);
    const remainder = numerator - whole * denominator;
    if (remainder === 0) {
      return String(whole);
    }
    const { numerator: num, denominator: den } = simplifyFraction(remainder, denominator);
    if (whole === 0) {
      return `${num}/${den}`;
    }
    return `${whole} ${Math.abs(num)}/${den}`;
  }

  function compute() {
    const aNumerator = parseLocaleNumber(aNumField.input.value);
    const aDenominator = parseLocaleNumber(aDenField.input.value);
    const bNumerator = parseLocaleNumber(bNumField.input.value);
    const bDenominator = parseLocaleNumber(bDenField.input.value);
    infoList.innerHTML = '';

    if (
      typeof aNumerator !== 'number' ||
      typeof aDenominator !== 'number' ||
      typeof bNumerator !== 'number' ||
      typeof bDenominator !== 'number'
    ) {
      resultValue.textContent = '—';
      resultHint.textContent = 'Bitte alle Zähler und Nenner ausfüllen.';
    } else {
      const result = operateFractions({
        aNumerator,
        aDenominator,
        bNumerator,
        bDenominator,
        operation: operationField.select.value,
      });
      if (!Number.isFinite(result.numerator) || !Number.isFinite(result.denominator) || result.denominator === 0) {
        resultValue.textContent = '–';
        resultHint.textContent = 'Division durch 0 nicht möglich.';
      } else {
        resultValue.textContent = formatFractionValue(result.numerator, result.denominator);
        const decimal = result.numerator / result.denominator;
        resultHint.textContent = `Dezimal: ${formatNumber(decimal, { maximumFractionDigits: 10 })}`;

        const simplifiedA = simplifyFraction(aNumerator, aDenominator);
        const simplifiedB = simplifyFraction(bNumerator, bDenominator);
        const infoItems = [
          `Gemischte Zahl: ${toMixedNumber(result.numerator, result.denominator)}`,
          `Bruch A gekürzt: ${formatFractionValue(simplifiedA.numerator, simplifiedA.denominator)}`,
          `Bruch B gekürzt: ${formatFractionValue(simplifiedB.numerator, simplifiedB.denominator)}`,
        ];
        infoItems.forEach((text) => {
          const li = document.createElement('li');
          li.textContent = text;
          infoList.appendChild(li);
        });
      }
    }

    updateHistory({
      a: aNumField.input.value,
      ad: aDenField.input.value,
      b: bNumField.input.value,
      bd: bDenField.input.value,
      op: operationField.select.value,
    });
  }

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      return {
        a: aNumField.input.value,
        ad: aDenField.input.value,
        b: bNumField.input.value,
        bd: bDenField.input.value,
        op: operationField.select.value,
      };
    },
  };
}

function renderAreaTool(container) {
  return renderUnitConverter({
    container,
    units: areaUnits,
    convert: convertArea,
    paramUnitKey: 'unit',
    paramValueKey: 'value',
    defaultUnit: 'squareMeter',
    label: 'Fläche',
  });
}

function renderEnergyTool(container) {
  return renderUnitConverter({
    container,
    units: energyUnits,
    convert: convertEnergy,
    paramUnitKey: 'unit',
    paramValueKey: 'value',
    defaultUnit: 'joule',
    label: 'Energie',
  });
}

function renderTriangleTool(container) {
  const modeParam = params.get('mode') ?? 'base';
  const baseParam = params.get('base') ?? '';
  const heightParam = params.get('height') ?? '';
  const sideAParam = params.get('a') ?? '';
  const sideBParam = params.get('b') ?? '';
  const sideCParam = params.get('c') ?? '';
  const angleParam = params.get('angle') ?? '';
  const angleSideAParam = params.get('angleA') ?? sideAParam;
  const angleSideBParam = params.get('angleB') ?? sideBParam;

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const modeField = createSelectField({
    label: 'Berechnungsmethode',
    name: 'mode',
    value: modeParam,
    options: [
      { value: 'base', label: 'Grundseite × Höhe / 2' },
      { value: 'sides', label: 'Drei Seiten (Heron)' },
      { value: 'angle', label: 'Zwei Seiten + Winkel' },
    ],
  });

  const baseField = createNumberField({ label: 'Grundseite', name: 'base', value: baseParam });
  const heightField = createNumberField({ label: 'Höhe', name: 'height', value: heightParam });
  const baseGroup = document.createElement('div');
  baseGroup.className = 'field-grid';
  baseGroup.dataset.mode = 'base';
  baseGroup.appendChild(baseField.wrapper);
  baseGroup.appendChild(heightField.wrapper);

  const sideAField = createNumberField({ label: 'Seite a', name: 'a', value: sideAParam });
  const sideBField = createNumberField({ label: 'Seite b', name: 'b', value: sideBParam });
  const sideCField = createNumberField({ label: 'Seite c', name: 'c', value: sideCParam });
  const sidesGroup = document.createElement('div');
  sidesGroup.className = 'field-grid';
  sidesGroup.dataset.mode = 'sides';
  sidesGroup.appendChild(sideAField.wrapper);
  sidesGroup.appendChild(sideBField.wrapper);
  sidesGroup.appendChild(sideCField.wrapper);

  const angleSideAField = createNumberField({ label: 'Seite a', name: 'angle-a', value: angleSideAParam });
  const angleSideBField = createNumberField({ label: 'Seite b', name: 'angle-b', value: angleSideBParam });
  const angleField = createNumberField({ label: 'eingeschlossener Winkel (°)', name: 'angle', value: angleParam });
  const angleGroup = document.createElement('div');
  angleGroup.className = 'field-grid';
  angleGroup.dataset.mode = 'angle';
  angleGroup.appendChild(angleSideAField.wrapper);
  angleGroup.appendChild(angleSideBField.wrapper);
  angleGroup.appendChild(angleField.wrapper);

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Fläche';
  const resultValue = document.createElement('div');
  resultValue.className = 'result-value';
  const resultHint = document.createElement('p');
  resultHint.className = 'meta';
  const infoList = document.createElement('ul');
  infoList.className = 'result-list';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultValue);
  resultCard.appendChild(resultHint);
  resultCard.appendChild(infoList);

  form.appendChild(modeField.wrapper);
  form.appendChild(baseGroup);
  form.appendChild(sidesGroup);
  form.appendChild(angleGroup);
  form.appendChild(resultCard);
  container.appendChild(form);

  function setVisibility(mode) {
    baseGroup.style.display = mode === 'base' ? 'grid' : 'none';
    sidesGroup.style.display = mode === 'sides' ? 'grid' : 'none';
    angleGroup.style.display = mode === 'angle' ? 'grid' : 'none';
  }

  function compute() {
    const mode = modeField.select.value;
    setVisibility(mode);
    infoList.innerHTML = '';
    let area = 0;
    let perimeter = null;
    let isValid = true;

    if (mode === 'base') {
      const baseValue = parseLocaleNumber(baseField.input.value);
      const heightValue = parseLocaleNumber(heightField.input.value);
      if (typeof baseValue !== 'number' || typeof heightValue !== 'number') {
        isValid = false;
      } else {
        area = triangleAreaBaseHeight(baseValue, heightValue);
        perimeter = null;
        resultHint.textContent = `0,5 × ${formatNumber(baseValue)} × ${formatNumber(heightValue)}`;
      }
    } else if (mode === 'sides') {
      const a = parseLocaleNumber(sideAField.input.value);
      const b = parseLocaleNumber(sideBField.input.value);
      const c = parseLocaleNumber(sideCField.input.value);
      if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
        isValid = false;
      } else {
        area = triangleAreaHeron(a, b, c);
        perimeter = a + b + c;
        resultHint.textContent = `Heron-Formel mit s = ${(a + b + c) / 2}`;
      }
    } else {
      const a = parseLocaleNumber(angleSideAField.input.value);
      const b = parseLocaleNumber(angleSideBField.input.value);
      const angleValue = parseLocaleNumber(angleField.input.value);
      if (typeof a !== 'number' || typeof b !== 'number' || typeof angleValue !== 'number') {
        isValid = false;
      } else if (angleValue <= 0 || angleValue >= 180) {
        isValid = false;
      } else {
        const radians = (angleValue * Math.PI) / 180;
        area = triangleAreaTwoSidesAngle(a, b, angleValue);
        const thirdSide = Math.sqrt(Math.max(a ** 2 + b ** 2 - 2 * a * b * Math.cos(radians), 0));
        perimeter = a + b + thirdSide;
        resultHint.textContent = `0,5 × ${formatNumber(a)} × ${formatNumber(b)} × sin(${formatNumber(angleValue)}°)`;
        if (Number.isFinite(thirdSide)) {
          const li = document.createElement('li');
          li.textContent = `3. Seite c ≈ ${formatNumber(thirdSide, { maximumFractionDigits: 4 })}`;
          infoList.appendChild(li);
        }
      }
    }

    if (!isValid || !Number.isFinite(area) || area <= 0) {
      resultValue.textContent = '—';
      resultHint.textContent = 'Bitte gültige Längen und Winkel eingeben.';
      infoList.innerHTML = '';
    } else {
      resultValue.textContent = `${formatNumber(area, { maximumFractionDigits: 6 })} Einheiten²`;
      if (perimeter !== null && Number.isFinite(perimeter)) {
        const li = document.createElement('li');
        li.textContent = `Umfang: ${formatNumber(perimeter, { maximumFractionDigits: 4 })}`;
        infoList.appendChild(li);
      }
      const heightInfo = document.createElement('li');
      heightInfo.textContent = `Hinweis: ${
        mode === 'base' ? 'Höhe direkt angegeben.' : 'Höhe lässt sich aus 2 × Fläche / Basis berechnen.'
      }`;
      infoList.appendChild(heightInfo);
    }

    updateHistory({
      mode,
      base: baseField.input.value,
      height: heightField.input.value,
      a: sideAField.input.value,
      b: sideBField.input.value,
      c: sideCField.input.value,
      angle: angleField.input.value,
      angleA: angleSideAField.input.value,
      angleB: angleSideBField.input.value,
    });
  }

  form.addEventListener('input', compute);
  form.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      return {
        mode: modeField.select.value,
        base: baseField.input.value,
        height: heightField.input.value,
        a: sideAField.input.value,
        b: sideBField.input.value,
        c: sideCField.input.value,
        angle: angleField.input.value,
        angleA: angleSideAField.input.value,
        angleB: angleSideBField.input.value,
      };
    },
  };
}

function renderCharacterCountTool(container) {
  const textParam = params.get('text') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const textField = createTextareaField({ label: 'Text eingeben', name: 'text', value: textParam, rows: 8 });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Statistiken';
  const infoList = document.createElement('ul');
  infoList.className = 'result-list';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(infoList);

  form.appendChild(textField.wrapper);
  form.appendChild(resultCard);
  container.appendChild(form);

  function compute() {
    const text = textField.textarea.value;
    const stats = computeTextStats(text);
    infoList.innerHTML = '';

    const readingMinutes = stats.words / 200;
    const readingSeconds = Math.round(readingMinutes * 60);

    [
      `Zeichen gesamt: ${formatNumber(stats.characters)}`,
      `Zeichen ohne Leerzeichen: ${formatNumber(stats.charactersWithoutSpaces)}`,
      `Wörter: ${formatNumber(stats.words)}`,
      `Zeilen: ${formatNumber(stats.lines)}`,
      `Sätze: ${formatNumber(stats.sentences)}`,
      `Geschätzte Lesedauer (200 WPM): ${readingSeconds < 60 ? `${readingSeconds} Sekunden` : `${formatNumber(readingMinutes, {
        maximumFractionDigits: 2,
      })} Minuten`}`,
    ].forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      infoList.appendChild(li);
    });

    if (stats.longestWord) {
      const li = document.createElement('li');
      li.textContent = `Längstes Wort: ${stats.longestWord}`;
      infoList.appendChild(li);
    }

    const shareValue = text.length <= 400 ? text : '';
    updateHistory({ text: shareValue });
  }

  textField.textarea.addEventListener('input', compute);
  compute();

  return {
    getShareParams() {
      const text = textField.textarea.value;
      return text.length <= 400 ? { text } : {};
    },
  };
}

function renderWordCountTool(container) {
  const textParam = params.get('text') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const textField = createTextareaField({ label: 'Text für Analyse', name: 'text', value: textParam, rows: 10 });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Wortanalyse';
  const infoList = document.createElement('ul');
  infoList.className = 'result-list';

  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-wrapper';
  const table = document.createElement('table');
  table.className = 'tool-table';
  table.innerHTML = '<thead><tr><th>Wort</th><th>Vorkommen</th></tr></thead>';
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  tableWrapper.appendChild(table);

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(infoList);
  resultCard.appendChild(tableWrapper);

  form.appendChild(textField.wrapper);
  form.appendChild(resultCard);
  container.appendChild(form);

  function compute() {
    const text = textField.textarea.value;
    const stats = computeTextStats(text);
    const frequencies = getWordFrequency(text, 10);
    infoList.innerHTML = '';
    tbody.innerHTML = '';

    [
      `Wörter gesamt: ${formatNumber(stats.words)}`,
      `Einzigartige Wörter: ${formatNumber(stats.uniqueWords)}`,
      `Durchschnittliche Wortlänge: ${formatNumber(stats.averageWordLength, { maximumFractionDigits: 2 })}`,
    ].forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      infoList.appendChild(li);
    });

    frequencies.forEach(([word, count]) => {
      const row = document.createElement('tr');
      const wordCell = document.createElement('td');
      wordCell.textContent = word;
      const countCell = document.createElement('td');
      countCell.textContent = formatNumber(count);
      row.appendChild(wordCell);
      row.appendChild(countCell);
      tbody.appendChild(row);
    });

    const shareValue = text.length <= 400 ? text : '';
    updateHistory({ text: shareValue });
  }

  textField.textarea.addEventListener('input', compute);
  compute();

  return {
    getShareParams() {
      const text = textField.textarea.value;
      return text.length <= 400 ? { text } : {};
    },
  };
}

function renderLoremIpsumTool(container) {
  const countParam = params.get('count') ?? '3';
  const toneParam = params.get('tone') ?? 'classic';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const countField = createNumberField({ label: 'Anzahl Absätze', name: 'count', value: countParam, step: 1 });
  const toneField = createSelectField({
    label: 'Stil',
    name: 'tone',
    value: toneParam,
    options: [
      { value: 'classic', label: 'Klassisch (Lorem ipsum)' },
      { value: 'modern', label: 'Modern / Tech' },
      { value: 'bullet', label: 'Stichpunkte' },
    ],
  });

  const actions = document.createElement('div');
  actions.className = 'action-row';
  const generateButton = document.createElement('button');
  generateButton.type = 'button';
  generateButton.className = 'btn btn-primary';
  generateButton.textContent = 'Text generieren';
  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.className = 'btn btn-secondary';
  copyButton.textContent = 'Kopieren';
  actions.appendChild(generateButton);
  actions.appendChild(copyButton);

  const outputField = createTextareaField({ label: 'Ergebnis', name: 'output', value: '', rows: 10 });
  outputField.textarea.readOnly = true;

  form.appendChild(countField.wrapper);
  form.appendChild(toneField.wrapper);
  form.appendChild(actions);
  form.appendChild(outputField.wrapper);
  container.appendChild(form);

  function generate() {
    const count = Math.min(Math.max(parseInt(countField.input.value, 10) || 1, 1), 10);
    const tone = toneField.select.value;
    const text = generateLoremIpsum(count, tone);
    outputField.textarea.value = text;
    updateHistory({ count: String(count), tone });
  }

  generateButton.addEventListener('click', generate);
  copyButton.addEventListener('click', () => {
    copyToClipboard(outputField.textarea.value);
    copyButton.textContent = '✔️ Kopiert';
    setTimeout(() => {
      copyButton.textContent = 'Kopieren';
    }, 1500);
  });

  generate();

  return {
    getShareParams() {
      return { count: countField.input.value, tone: toneField.select.value };
    },
  };
}

function renderCaseConverterTool(container) {
  const textParam = params.get('text') ?? '';
  const modeParam = params.get('mode') ?? 'upper';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const inputField = createTextareaField({ label: 'Ausgangstext', name: 'text', value: textParam, rows: 8 });
  const modeField = createSelectField({
    label: 'Umwandlung',
    name: 'mode',
    value: modeParam,
    options: [
      { value: 'upper', label: 'GROßBUCHSTABEN' },
      { value: 'lower', label: 'kleinbuchstaben' },
      { value: 'sentence', label: 'Satzanfänge groß' },
      { value: 'title', label: 'Titel-Format' },
      { value: 'kebab', label: 'kebab-case' },
    ],
  });

  const trimCheckbox = createCheckboxField({ label: 'Leerzeichen am Anfang/Ende entfernen', name: 'trim', checked: true });

  const outputField = createTextareaField({ label: 'Ergebnis', name: 'output', value: '', rows: 8 });
  outputField.textarea.readOnly = true;

  form.appendChild(inputField.wrapper);
  form.appendChild(modeField.wrapper);
  form.appendChild(trimCheckbox.wrapper);
  form.appendChild(outputField.wrapper);
  container.appendChild(form);

  function compute() {
    let text = inputField.textarea.value;
    const mode = modeField.select.value;
    if (trimCheckbox.input.checked) {
      text = text.trim();
    }
    let result = text;
    switch (mode) {
      case 'upper':
        result = text.toLocaleUpperCase('de-DE');
        break;
      case 'lower':
        result = text.toLocaleLowerCase('de-DE');
        break;
      case 'sentence':
        result = toSentenceCase(text);
        break;
      case 'title':
        result = toTitleCase(text);
        break;
      case 'kebab':
        result = toKebabCase(text);
        break;
      default:
        result = text;
    }
    outputField.textarea.value = result;
    const shareValue = text.length <= 400 ? text : '';
    updateHistory({ text: shareValue, mode });
  }

  inputField.textarea.addEventListener('input', compute);
  modeField.select.addEventListener('change', compute);
  trimCheckbox.input.addEventListener('change', compute);
  compute();

  return {
    getShareParams() {
      const text = inputField.textarea.value.trim();
      return text.length <= 400
        ? {
            text,
            mode: modeField.select.value,
          }
        : { mode: modeField.select.value };
    },
  };
}

function renderPalindromeTool(container) {
  const textParam = params.get('text') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const inputField = createTextField({ label: 'Wort oder Satz', name: 'text', value: textParam, placeholder: 'Lagerregal' });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Prüfung';
  const resultValue = document.createElement('div');
  resultValue.className = 'result-value';
  const resultHint = document.createElement('p');
  resultHint.className = 'meta';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(resultValue);
  resultCard.appendChild(resultHint);

  form.appendChild(inputField.wrapper);
  form.appendChild(resultCard);
  container.appendChild(form);

  function compute() {
    const text = inputField.input.value;
    const sanitized = text
      .toLocaleLowerCase('de-DE')
      .replace(/[^\p{L}\p{Nd}]/gu, '');
    if (!sanitized) {
      resultValue.textContent = '—';
      resultHint.textContent = 'Bitte mindestens ein alphanumerisches Zeichen eingeben.';
      updateHistory({ text: '' });
      return;
    }
    const reversed = [...sanitized].reverse().join('');
    const isPal = sanitized === reversed;
    resultValue.textContent = isPal ? '✅ Palindrom' : '❌ Kein Palindrom';
    resultHint.textContent = `Bereinigt geprüft: ${sanitized}`;
    updateHistory({ text });
  }

  inputField.input.addEventListener('input', compute);
  compute();

  return {
    getShareParams() {
      return { text: inputField.input.value };
    },
  };
}

function renderPasswordTool(container) {
  const lengthParam = params.get('len') ?? '16';
  const countParam = params.get('count') ?? '5';
  const includeSymbolsParam = params.get('symbols') === 'false' ? false : true;

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const lengthField = createNumberField({ label: 'Zeichen pro Passwort', name: 'len', value: lengthParam, step: 1 });
  const countField = createNumberField({ label: 'Anzahl Passwörter', name: 'count', value: countParam, step: 1 });
  const includeSymbols = createCheckboxField({
    label: 'Sonderzeichen verwenden (!?%$…)',
    name: 'symbols',
    checked: includeSymbolsParam,
  });

  const actions = document.createElement('div');
  actions.className = 'action-row';
  const generateButton = document.createElement('button');
  generateButton.type = 'button';
  generateButton.className = 'btn btn-primary';
  generateButton.textContent = 'Passwörter generieren';
  actions.appendChild(generateButton);

  const list = document.createElement('ul');
  list.className = 'result-list suggestions';

  form.appendChild(lengthField.wrapper);
  form.appendChild(countField.wrapper);
  form.appendChild(includeSymbols.wrapper);
  form.appendChild(actions);
  form.appendChild(list);
  container.appendChild(form);

  function generate() {
    const length = Math.min(Math.max(parseInt(lengthField.input.value, 10) || 1, 6), 64);
    const count = Math.min(Math.max(parseInt(countField.input.value, 10) || 1, 1), 12);
    const useSymbols = includeSymbols.input.checked;
    list.innerHTML = '';
    for (let i = 0; i < count; i += 1) {
      const password = generatePassword(length, { includeSymbols: useSymbols });
      const item = document.createElement('li');
      const code = document.createElement('code');
      code.textContent = password;
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'btn btn-secondary';
      copyBtn.textContent = 'Kopieren';
      copyBtn.addEventListener('click', () => {
        copyToClipboard(password);
        copyBtn.textContent = '✔️';
        setTimeout(() => {
          copyBtn.textContent = 'Kopieren';
        }, 1200);
      });
      item.appendChild(code);
      item.appendChild(copyBtn);
      list.appendChild(item);
    }

    updateHistory({ len: String(length), count: String(count), symbols: String(useSymbols) });
  }

  generateButton.addEventListener('click', generate);
  generate();

  return {
    getShareParams() {
      return {
        len: lengthField.input.value,
        count: countField.input.value,
        symbols: String(includeSymbols.input.checked),
      };
    },
  };
}

function renderUsernameTool(container) {
  const keywordParam = params.get('keyword') ?? '';
  const styleParam = params.get('style') ?? 'classic';
  const countParam = params.get('count') ?? '8';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const keywordField = createTextField({ label: 'Lieblingswort (optional)', name: 'keyword', value: keywordParam });
  const styleField = createSelectField({
    label: 'Stil',
    name: 'style',
    value: styleParam,
    options: [
      { value: 'classic', label: 'Klassisch' },
      { value: 'gamer', label: 'Gamer' },
      { value: 'business', label: 'Business/Creator' },
    ],
  });
  const countField = createNumberField({ label: 'Vorschläge', name: 'count', value: countParam, step: 1 });

  const actions = document.createElement('div');
  actions.className = 'action-row';
  const generateButton = document.createElement('button');
  generateButton.type = 'button';
  generateButton.className = 'btn btn-primary';
  generateButton.textContent = 'Vorschläge erstellen';
  actions.appendChild(generateButton);

  const list = document.createElement('ul');
  list.className = 'result-list suggestions';

  form.appendChild(keywordField.wrapper);
  form.appendChild(styleField.wrapper);
  form.appendChild(countField.wrapper);
  form.appendChild(actions);
  form.appendChild(list);
  container.appendChild(form);

  function generate() {
    const keyword = keywordField.input.value.trim();
    const style = styleField.select.value;
    const count = Math.min(Math.max(parseInt(countField.input.value, 10) || 1, 3), 15);
    list.innerHTML = '';
    const suggestions = generateUsernames({ keyword, style, count });
    suggestions.forEach((name) => {
      const item = document.createElement('li');
      const code = document.createElement('code');
      code.textContent = name;
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'btn btn-secondary';
      copyBtn.textContent = 'Kopieren';
      copyBtn.addEventListener('click', () => {
        copyToClipboard(name);
        copyBtn.textContent = '✔️';
        setTimeout(() => {
          copyBtn.textContent = 'Kopieren';
        }, 1200);
      });
      item.appendChild(code);
      item.appendChild(copyBtn);
      list.appendChild(item);
    });

    updateHistory({ keyword, style, count: String(count) });
  }

  generateButton.addEventListener('click', generate);
  generate();

  return {
    getShareParams() {
      return {
        keyword: keywordField.input.value,
        style: styleField.select.value,
        count: countField.input.value,
      };
    },
  };
}

function renderDomainNameTool(container) {
  const keywordParam = params.get('keyword') ?? '';
  const tldParam = params.get('tld') ?? '.de';
  const countParam = params.get('count') ?? '10';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const keywordField = createTextField({
    label: 'Keywords (durch Leerzeichen getrennt)',
    name: 'keyword',
    value: keywordParam,
    placeholder: 'tech energie solar',
  });
  const tldField = createSelectField({
    label: 'Top-Level-Domain',
    name: 'tld',
    value: tldParam,
    options: DOMAIN_TLDS.map((tld) => ({ value: tld, label: tld })),
  });
  const countField = createNumberField({ label: 'Vorschläge', name: 'count', value: countParam, step: 1 });

  const actions = document.createElement('div');
  actions.className = 'action-row';
  const generateButton = document.createElement('button');
  generateButton.type = 'button';
  generateButton.className = 'btn btn-primary';
  generateButton.textContent = 'Domains generieren';
  actions.appendChild(generateButton);

  const list = document.createElement('ul');
  list.className = 'result-list suggestions';

  form.appendChild(keywordField.wrapper);
  form.appendChild(tldField.wrapper);
  form.appendChild(countField.wrapper);
  form.appendChild(actions);
  form.appendChild(list);
  container.appendChild(form);

  function generate() {
    const keywords = keywordField.input.value
      .split(/\s+/)
      .map((word) => word.trim())
      .filter(Boolean);
    const tld = tldField.select.value;
    const count = Math.min(Math.max(parseInt(countField.input.value, 10) || 1, 5), 25);
    const suggestions = generateDomains({ keywords, tld, count });
    list.innerHTML = '';
    suggestions.forEach((domain) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `https://${domain}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = domain;
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'btn btn-secondary';
      copyBtn.textContent = 'Kopieren';
      copyBtn.addEventListener('click', () => {
        copyToClipboard(domain);
        copyBtn.textContent = '✔️';
        setTimeout(() => {
          copyBtn.textContent = 'Kopieren';
        }, 1200);
      });
      item.appendChild(link);
      item.appendChild(copyBtn);
      list.appendChild(item);
    });

    updateHistory({ keyword: keywordField.input.value, tld, count: String(count) });
  }

  generateButton.addEventListener('click', generate);
  generate();

  return {
    getShareParams() {
      return {
        keyword: keywordField.input.value,
        tld: tldField.select.value,
        count: countField.input.value,
      };
    },
  };
}

function renderReverseTextTool(container) {
  const textParam = params.get('text') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const inputField = createTextareaField({ label: 'Text eingeben', name: 'text', value: textParam, rows: 6 });
  const outputField = createTextareaField({ label: 'Umgedrehter Text', name: 'output', value: '', rows: 6 });
  outputField.textarea.readOnly = true;

  form.appendChild(inputField.wrapper);
  form.appendChild(outputField.wrapper);
  container.appendChild(form);

  function compute() {
    const text = inputField.textarea.value;
    const reversed = [...text].reverse().join('');
    outputField.textarea.value = reversed;
    const shareValue = text.length <= 400 ? text : '';
    updateHistory({ text: shareValue });
  }

  inputField.textarea.addEventListener('input', compute);
  compute();

  return {
    getShareParams() {
      const text = inputField.textarea.value;
      return text.length <= 400 ? { text } : {};
    },
  };
}

function renderAnagramTool(container) {
  const textParam = params.get('text') ?? '';
  const countParam = params.get('count') ?? '6';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const textField = createTextField({ label: 'Ausgangswort', name: 'text', value: textParam, placeholder: 'Anagramm' });
  const countField = createNumberField({ label: 'Vorschläge', name: 'count', value: countParam, step: 1 });

  const actions = document.createElement('div');
  actions.className = 'action-row';
  const generateButton = document.createElement('button');
  generateButton.type = 'button';
  generateButton.className = 'btn btn-primary';
  generateButton.textContent = 'Anagramme erzeugen';
  actions.appendChild(generateButton);

  const list = document.createElement('ul');
  list.className = 'result-list suggestions';

  const hint = document.createElement('p');
  hint.className = 'meta';
  hint.textContent = 'Hinweis: Für Wörter mit mehr als 9 Buchstaben werden zufällige Kombinationen angezeigt.';

  form.appendChild(textField.wrapper);
  form.appendChild(countField.wrapper);
  form.appendChild(actions);
  form.appendChild(list);
  form.appendChild(hint);
  container.appendChild(form);

  function generate() {
    const word = textField.input.value.trim();
    const count = Math.min(Math.max(parseInt(countField.input.value, 10) || 1, 3), 20);
    list.innerHTML = '';
    if (!word) {
      const item = document.createElement('li');
      item.textContent = 'Bitte ein Wort eingeben.';
      list.appendChild(item);
      updateHistory({ text: '', count: String(count) });
      return;
    }
    const suggestions = generateAnagrams(word, count);
    suggestions.forEach((entry) => {
      const item = document.createElement('li');
      const code = document.createElement('code');
      code.textContent = entry;
      item.appendChild(code);
      list.appendChild(item);
    });
    updateHistory({ text: word, count: String(count) });
  }

  generateButton.addEventListener('click', generate);
  generate();

  return {
    getShareParams() {
      return {
        text: textField.input.value,
        count: countField.input.value,
      };
    },
  };
}

function renderRandomNumberTool(container) {
  const minParam = params.get('min') ?? '1';
  const maxParam = params.get('max') ?? '100';
  const countParam = params.get('count') ?? '1';
  const uniqueParam = params.get('unique') === 'true';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const minField = createNumberField({ label: 'Minimum', name: 'min', value: minParam });
  const maxField = createNumberField({ label: 'Maximum', name: 'max', value: maxParam });
  const countField = createNumberField({ label: 'Anzahl', name: 'count', value: countParam, step: 1 });
  const uniqueCheckbox = createCheckboxField({ label: 'Nur eindeutige Zahlen', name: 'unique', checked: uniqueParam });

  const actions = document.createElement('div');
  actions.className = 'action-row';
  const generateButton = document.createElement('button');
  generateButton.type = 'button';
  generateButton.className = 'btn btn-primary';
  generateButton.textContent = 'Zahlen generieren';
  actions.appendChild(generateButton);

  const list = document.createElement('ul');
  list.className = 'result-list suggestions';
  const message = document.createElement('p');
  message.className = 'meta';

  form.appendChild(minField.wrapper);
  form.appendChild(maxField.wrapper);
  form.appendChild(countField.wrapper);
  form.appendChild(uniqueCheckbox.wrapper);
  form.appendChild(actions);
  form.appendChild(list);
  form.appendChild(message);
  container.appendChild(form);

  function generate() {
    const min = parseLocaleNumber(minField.input.value);
    const max = parseLocaleNumber(maxField.input.value);
    const count = Math.min(Math.max(parseInt(countField.input.value, 10) || 1, 1), 1000);
    const unique = uniqueCheckbox.input.checked;
    list.innerHTML = '';
    message.textContent = '';

    if (typeof min !== 'number' || typeof max !== 'number' || min > max) {
      message.textContent = 'Bitte gültige Grenzen angeben (Minimum ≤ Maximum).';
      return;
    }

    const rangeSize = Math.floor(max - min + 1);
    if (unique && count > rangeSize) {
      message.textContent = 'Es stehen nicht genügend eindeutige Zahlen im Bereich zur Verfügung.';
      return;
    }

    const numbers = generateRandomNumbers({ min, max, count, unique });
    numbers.forEach((num) => {
      const item = document.createElement('li');
      item.textContent = formatNumber(num, { maximumFractionDigits: 6 });
      list.appendChild(item);
    });

    updateHistory({
      min: minField.input.value,
      max: maxField.input.value,
      count: countField.input.value,
      unique: String(unique),
    });
  }

  generateButton.addEventListener('click', generate);
  generate();

  return {
    getShareParams() {
      return {
        min: minField.input.value,
        max: maxField.input.value,
        count: countField.input.value,
        unique: String(uniqueCheckbox.input.checked),
      };
    },
  };
}

function renderEmojiCounterTool(container) {
  const textParam = params.get('text') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const textField = createTextareaField({ label: 'Text mit Emojis', name: 'text', value: textParam, rows: 8 });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Emoji-Statistik';
  const infoList = document.createElement('ul');
  infoList.className = 'result-list';

  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-wrapper';
  const table = document.createElement('table');
  table.className = 'tool-table';
  table.innerHTML = '<thead><tr><th>Emoji</th><th>Vorkommen</th></tr></thead>';
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  tableWrapper.appendChild(table);

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(infoList);
  resultCard.appendChild(tableWrapper);

  form.appendChild(textField.wrapper);
  form.appendChild(resultCard);
  container.appendChild(form);

  function compute() {
    const text = textField.textarea.value;
    const stats = countEmojis(text);
    infoList.innerHTML = '';
    tbody.innerHTML = '';

    [
      `Emojis gesamt: ${formatNumber(stats.total)}`,
      `Einzigartige Emojis: ${formatNumber(stats.unique)}`,
    ].forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      infoList.appendChild(li);
    });

    stats.counts.forEach((count, emoji) => {
      const row = document.createElement('tr');
      const emojiCell = document.createElement('td');
      emojiCell.textContent = emoji;
      const countCell = document.createElement('td');
      countCell.textContent = formatNumber(count);
      row.appendChild(emojiCell);
      row.appendChild(countCell);
      tbody.appendChild(row);
    });

    const shareValue = text.length <= 300 ? text : '';
    updateHistory({ text: shareValue });
  }

  textField.textarea.addEventListener('input', compute);
  compute();

  return {
    getShareParams() {
      const text = textField.textarea.value;
      return text.length <= 300 ? { text } : {};
    },
  };
}

function renderQrCodeTool(container) {
  const textParam = params.get('text') ?? 'Tech Teddy';
  const sizeParam = params.get('size') ?? '300';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const textField = createTextareaField({ label: 'Text/URL', name: 'text', value: textParam, rows: 4 });
  const sizeField = createSelectField({
    label: 'Größe',
    name: 'size',
    value: sizeParam,
    options: [
      { value: '200', label: '200 × 200 px' },
      { value: '300', label: '300 × 300 px' },
      { value: '400', label: '400 × 400 px' },
    ],
  });

  const preview = document.createElement('div');
  preview.className = 'qr-preview';
  const img = document.createElement('img');
  img.alt = 'QR-Code Vorschau';
  img.loading = 'lazy';
  preview.appendChild(img);

  const downloadButton = document.createElement('button');
  downloadButton.type = 'button';
  downloadButton.className = 'btn btn-secondary';
  downloadButton.textContent = 'QR-Code herunterladen';

  form.appendChild(textField.wrapper);
  form.appendChild(sizeField.wrapper);
  form.appendChild(preview);
  form.appendChild(downloadButton);
  container.appendChild(form);

  function updateImage() {
    const text = textField.textarea.value.trim();
    const size = sizeField.select.value;
    if (!text) {
      img.src = '';
      img.alt = 'Bitte Text eingeben';
      return;
    }
    const encoded = encodeURIComponent(text);
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}`;
    img.alt = `QR-Code für ${text}`;
    updateHistory({ text, size });
  }

  downloadButton.addEventListener('click', () => {
    if (!img.src) return;
    const link = document.createElement('a');
    link.href = img.src;
    link.download = 'tech-teddy-qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  textField.textarea.addEventListener('input', updateImage);
  sizeField.select.addEventListener('change', updateImage);
  updateImage();

  return {
    getShareParams() {
      return { text: textField.textarea.value.trim(), size: sizeField.select.value };
    },
  };
}

function renderHashTool(container) {
  const textParam = params.get('text') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const textField = createTextareaField({ label: 'Eingabetext', name: 'text', value: textParam, rows: 6 });

  const list = document.createElement('ul');
  list.className = 'result-list hash-list';

  const algorithms = [
    { id: 'md5', label: 'MD5' },
    { id: 'sha1', label: 'SHA-1' },
    { id: 'sha256', label: 'SHA-256' },
  ];

  const entries = new Map();
  algorithms.forEach((algo) => {
    const item = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = `${algo.label}:`;
    const code = document.createElement('code');
    code.dataset.algorithm = algo.id;
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'btn btn-secondary';
    copyBtn.textContent = 'Kopieren';
    copyBtn.addEventListener('click', () => {
      copyToClipboard(code.textContent ?? '');
      copyBtn.textContent = '✔️';
      setTimeout(() => {
        copyBtn.textContent = 'Kopieren';
      }, 1200);
    });
    item.appendChild(strong);
    item.appendChild(code);
    item.appendChild(copyBtn);
    list.appendChild(item);
    entries.set(algo.id, code);
  });

  form.appendChild(textField.wrapper);
  form.appendChild(list);
  container.appendChild(form);

  async function compute() {
    const text = textField.textarea.value;
    entries.get('md5').textContent = md5(text);
    entries.get('sha1').textContent = await computeSha(text, 'SHA-1');
    entries.get('sha256').textContent = await computeSha(text, 'SHA-256');
    const shareValue = text.length <= 400 ? text : '';
    updateHistory({ text: shareValue });
  }

  textField.textarea.addEventListener('input', () => {
    compute().catch(() => {
      entries.forEach((code) => {
        code.textContent = 'Fehler beim Berechnen';
      });
    });
  });
  compute();

  return {
    getShareParams() {
      const text = textField.textarea.value;
      return text.length <= 400 ? { text } : {};
    },
  };
}

function renderPdfMergerTool(container) {
  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const field = document.createElement('div');
  field.className = 'field';
  const label = document.createElement('label');
  label.textContent = 'PDF-Dateien auswählen';
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/pdf';
  input.multiple = true;
  field.appendChild(label);
  field.appendChild(input);

  const actions = document.createElement('div');
  actions.className = 'action-row';
  const mergeButton = document.createElement('button');
  mergeButton.type = 'button';
  mergeButton.className = 'btn btn-primary';
  mergeButton.textContent = 'PDFs zusammenführen';
  actions.appendChild(mergeButton);

  const status = document.createElement('p');
  status.className = 'meta';
  status.textContent = 'Dateien werden ausschließlich lokal im Browser verarbeitet.';

  form.appendChild(field);
  form.appendChild(actions);
  form.appendChild(status);
  container.appendChild(form);

  let pdfLibPromise = null;

  function loadPdfLib() {
    if (window.PDFLib) {
      return Promise.resolve(window.PDFLib);
    }
    if (!pdfLibPromise) {
      pdfLibPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js';
        script.onload = () => resolve(window.PDFLib);
        script.onerror = () => reject(new Error('PDFLib konnte nicht geladen werden.'));
        document.head.appendChild(script);
      });
    }
    return pdfLibPromise;
  }

  mergeButton.addEventListener('click', async () => {
    if (!input.files || input.files.length === 0) {
      status.textContent = 'Bitte mindestens zwei PDF-Dateien auswählen.';
      return;
    }
    if (input.files.length === 1) {
      status.textContent = 'Für eine Zusammenführung werden mindestens zwei Dateien benötigt.';
      return;
    }
    status.textContent = 'PDF-Bibliothek wird geladen…';
    try {
      const PDFLib = await loadPdfLib();
      status.textContent = 'Dateien werden verarbeitet…';
      const merged = await PDFLib.PDFDocument.create();
      for (const file of input.files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'tech-teddy-merged.pdf';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      status.textContent = 'Fertig! Die Datei wurde heruntergeladen.';
    } catch (error) {
      console.error(error);
      status.textContent = 'Fehler beim Zusammenführen. Bitte erneut versuchen.';
    }
  });

  return {};
}

function renderJsonFormatterTool(container) {
  const modeParam = params.get('mode') ?? 'pretty';
  const textParam = params.get('json') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  let lastMode = modeParam;

  const inputField = createTextareaField({ label: 'JSON-Input', name: 'json', value: textParam, rows: 10 });

  const actions = document.createElement('div');
  actions.className = 'action-row';
  const prettyButton = document.createElement('button');
  prettyButton.type = 'button';
  prettyButton.className = 'btn btn-primary';
  prettyButton.textContent = 'Formatieren';
  const minifyButton = document.createElement('button');
  minifyButton.type = 'button';
  minifyButton.className = 'btn btn-secondary';
  minifyButton.textContent = 'Minimieren';
  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.className = 'btn btn-secondary';
  copyButton.textContent = 'Ergebnis kopieren';
  actions.appendChild(prettyButton);
  actions.appendChild(minifyButton);
  actions.appendChild(copyButton);

  const outputField = createTextareaField({ label: 'Ergebnis', name: 'output', value: '', rows: 10 });
  outputField.textarea.readOnly = true;

  const message = document.createElement('p');
  message.className = 'meta';

  form.appendChild(inputField.wrapper);
  form.appendChild(actions);
  form.appendChild(outputField.wrapper);
  form.appendChild(message);
  container.appendChild(form);

  function format(mode) {
    try {
      const json = JSON.parse(inputField.textarea.value);
      if (mode === 'pretty') {
        outputField.textarea.value = JSON.stringify(json, null, 2);
      } else {
        outputField.textarea.value = JSON.stringify(json);
      }
      message.textContent = 'Erfolgreich konvertiert.';
      updateHistory({ json: inputField.textarea.value.slice(0, 5000), mode });
      lastMode = mode;
    } catch (error) {
      message.textContent = 'Ungültiges JSON. Bitte Struktur prüfen.';
    }
  }

  prettyButton.addEventListener('click', () => format('pretty'));
  minifyButton.addEventListener('click', () => format('minify'));
  copyButton.addEventListener('click', () => {
    copyToClipboard(outputField.textarea.value);
    copyButton.textContent = '✔️ Kopiert';
    setTimeout(() => {
      copyButton.textContent = 'Ergebnis kopieren';
    }, 1200);
  });

  if (textParam) {
    format(modeParam);
  }

  return {
    getShareParams() {
      return {
        json: inputField.textarea.value.slice(0, 5000),
        mode: lastMode,
      };
    },
  };
}

function renderCsvToJsonTool(container) {
  const delimiterParam = params.get('delim') ?? ';';
  const textParam = params.get('csv') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const inputField = createTextareaField({ label: 'CSV-Daten', name: 'csv', value: textParam, rows: 10 });
  const delimiterField = createSelectField({
    label: 'Trennzeichen',
    name: 'delim',
    value: delimiterParam,
    options: [
      { value: ',', label: 'Komma (,)' },
      { value: ';', label: 'Semikolon (;)' },
      { value: '\t', label: 'Tabulator' },
    ],
  });

  const convertButton = document.createElement('button');
  convertButton.type = 'button';
  convertButton.className = 'btn btn-primary';
  convertButton.textContent = 'In JSON umwandeln';

  const outputField = createTextareaField({ label: 'JSON-Ausgabe', name: 'output', value: '', rows: 10 });
  outputField.textarea.readOnly = true;

  const message = document.createElement('p');
  message.className = 'meta';

  form.appendChild(inputField.wrapper);
  form.appendChild(delimiterField.wrapper);
  form.appendChild(convertButton);
  form.appendChild(outputField.wrapper);
  form.appendChild(message);
  container.appendChild(form);

  convertButton.addEventListener('click', () => {
    try {
      const delimiter = delimiterField.select.value === '\\t' ? '\t' : delimiterField.select.value;
      const result = csvToJson(inputField.textarea.value, delimiter);
      outputField.textarea.value = JSON.stringify(result, null, 2);
      message.textContent = `${result.length} Datensätze konvertiert.`;
      updateHistory({ csv: inputField.textarea.value.slice(0, 5000), delim: delimiterField.select.value });
    } catch (error) {
      message.textContent = 'CSV konnte nicht geparst werden. Bitte Struktur und Trennzeichen prüfen.';
    }
  });

  return {
    getShareParams() {
      return {
        csv: inputField.textarea.value.slice(0, 5000),
        delim: delimiterField.select.value,
      };
    },
  };
}

function renderMinifierTool(container) {
  const modeParam = params.get('mode') ?? 'html';
  const textParam = params.get('source') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const inputField = createTextareaField({ label: 'HTML/CSS-Quelltext', name: 'source', value: textParam, rows: 10 });
  const modeField = createSelectField({
    label: 'Inhaltstyp',
    name: 'mode',
    value: modeParam,
    options: [
      { value: 'html', label: 'HTML' },
      { value: 'css', label: 'CSS' },
    ],
  });

  const actions = document.createElement('div');
  actions.className = 'action-row';
  const minifyButton = document.createElement('button');
  minifyButton.type = 'button';
  minifyButton.className = 'btn btn-primary';
  minifyButton.textContent = 'Minifizieren';
  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.className = 'btn btn-secondary';
  copyButton.textContent = 'Ergebnis kopieren';
  actions.appendChild(minifyButton);
  actions.appendChild(copyButton);

  const outputField = createTextareaField({ label: 'Minifizierte Ausgabe', name: 'output', value: '', rows: 10 });
  outputField.textarea.readOnly = true;

  const message = document.createElement('p');
  message.className = 'meta';

  form.appendChild(inputField.wrapper);
  form.appendChild(modeField.wrapper);
  form.appendChild(actions);
  form.appendChild(outputField.wrapper);
  form.appendChild(message);
  container.appendChild(form);

  minifyButton.addEventListener('click', () => {
    const source = inputField.textarea.value;
    const mode = modeField.select.value;
    const result = mode === 'html' ? minifyHtml(source) : minifyCss(source);
    outputField.textarea.value = result;
    message.textContent = `Vorher: ${formatNumber(source.length)} Zeichen • Nachher: ${formatNumber(result.length)} Zeichen`;
    updateHistory({ source: source.slice(0, 5000), mode });
  });

  copyButton.addEventListener('click', () => {
    copyToClipboard(outputField.textarea.value);
    copyButton.textContent = '✔️';
    setTimeout(() => {
      copyButton.textContent = 'Ergebnis kopieren';
    }, 1200);
  });

  return {
    getShareParams() {
      return {
        source: inputField.textarea.value.slice(0, 5000),
        mode: modeField.select.value,
      };
    },
  };
}

function renderRegexTesterTool(container) {
  const patternParam = params.get('pattern') ?? '';
  const flagsParam = params.get('flags') ?? 'g';
  const textParam = params.get('text') ?? '';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const patternField = createTextField({ label: 'RegEx-Muster', name: 'pattern', value: patternParam, placeholder: '(\\d+)' });
  const flagsField = createTextField({ label: 'Flags', name: 'flags', value: flagsParam, placeholder: 'gimuy' });
  const textField = createTextareaField({ label: 'Testtext', name: 'text', value: textParam, rows: 8 });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Treffer';
  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'table-wrapper';
  const table = document.createElement('table');
  table.className = 'tool-table';
  table.innerHTML = '<thead><tr><th>#</th><th>Match</th><th>Index</th></tr></thead>';
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  tableWrapper.appendChild(table);
  const message = document.createElement('p');
  message.className = 'meta';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(tableWrapper);
  resultCard.appendChild(message);

  form.appendChild(patternField.wrapper);
  form.appendChild(flagsField.wrapper);
  form.appendChild(textField.wrapper);
  form.appendChild(resultCard);
  container.appendChild(form);

  function compute() {
    const pattern = patternField.input.value;
    const flags = flagsField.input.value;
    const text = textField.textarea.value;
    tbody.innerHTML = '';
    message.textContent = '';

    if (!pattern) {
      message.textContent = 'Bitte ein Muster eingeben.';
      return;
    }

    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : `${flags}g`);
      let match;
      let index = 1;
      regex.lastIndex = 0;
      while ((match = regex.exec(text)) !== null) {
        const row = document.createElement('tr');
        const idxCell = document.createElement('td');
        idxCell.textContent = String(index);
        const matchCell = document.createElement('td');
        matchCell.textContent = match[0];
        const posCell = document.createElement('td');
        posCell.textContent = `${match.index}`;
        row.appendChild(idxCell);
        row.appendChild(matchCell);
        row.appendChild(posCell);
        tbody.appendChild(row);
        index += 1;
      }
      if (index === 1) {
        message.textContent = 'Keine Treffer gefunden.';
      } else {
        message.textContent = `${index - 1} Treffer gefunden.`;
      }
      updateHistory({ pattern, flags, text: text.slice(0, 5000) });
    } catch (error) {
      message.textContent = `Ungültiges Muster: ${error.message}`;
    }
  }

  patternField.input.addEventListener('input', compute);
  flagsField.input.addEventListener('input', compute);
  textField.textarea.addEventListener('input', compute);
  compute();

  return {
    getShareParams() {
      return {
        pattern: patternField.input.value,
        flags: flagsField.input.value,
        text: textField.textarea.value.slice(0, 5000),
      };
    },
  };
}

function renderColorConverterTool(container) {
  const hexParam = params.get('hex') ?? '#3366ff';
  const rgbParam = params.get('rgb') ?? '51, 102, 255';
  const cmykParam = params.get('cmyk') ?? '80, 60, 0, 0';

  const form = document.createElement('form');
  form.className = 'tool-card';
  form.noValidate = true;

  const pickerField = document.createElement('div');
  pickerField.className = 'field';
  const pickerLabel = document.createElement('label');
  pickerLabel.textContent = 'Farbwähler';
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.value = /^#([0-9a-f]{6})$/i.test(hexParam) ? hexParam : '#3366ff';
  pickerField.appendChild(pickerLabel);
  pickerField.appendChild(colorInput);

  const hexField = createTextField({ label: 'HEX (#RRGGBB)', name: 'hex', value: hexParam });
  const rgbField = createTextField({ label: 'RGB (r, g, b)', name: 'rgb', value: rgbParam, placeholder: '51, 102, 255' });
  const cmykField = createTextField({ label: 'CMYK (c, m, y, k)', name: 'cmyk', value: cmykParam, placeholder: '80, 60, 0, 0' });

  const resultCard = document.createElement('div');
  resultCard.className = 'result-card';
  const resultTitle = document.createElement('h3');
  resultTitle.textContent = 'Zusatzinfos';
  const infoList = document.createElement('ul');
  infoList.className = 'result-list';
  const preview = document.createElement('div');
  preview.className = 'color-preview';

  resultCard.appendChild(resultTitle);
  resultCard.appendChild(infoList);
  resultCard.appendChild(preview);

  form.appendChild(pickerField);
  form.appendChild(hexField.wrapper);
  form.appendChild(rgbField.wrapper);
  form.appendChild(cmykField.wrapper);
  form.appendChild(resultCard);
  container.appendChild(form);

  function updateFromHex(hexValue) {
    const rgb = hexToRgb(hexValue);
    if (!rgb) return false;
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    rgbField.input.value = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    cmykField.input.value = `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`;
    applyColor(rgb);
    return true;
  }

  function updateFromRgb(rgbString) {
    const rgb = parseRgbString(rgbString);
    if (!rgb) return false;
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    hexField.input.value = hex;
    cmykField.input.value = `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`;
    colorInput.value = hex;
    applyColor(rgb);
    return true;
  }

  function updateFromCmyk(cmykString) {
    const cmyk = parseCmykString(cmykString);
    if (!cmyk) return false;
    const rgb = cmykToRgb(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    hexField.input.value = hex;
    rgbField.input.value = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    colorInput.value = hex;
    applyColor(rgb);
    return true;
  }

  function applyColor(rgb) {
    preview.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    infoList.innerHTML = '';
    [
      `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`,
      `HEX: ${hexField.input.value}`,
      `CMYK: ${cmykField.input.value}`,
      `HSL: ${hsl.h}°, ${hsl.s} %, ${hsl.l} %`,
    ].forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      infoList.appendChild(li);
    });
    updateHistory({ hex: hexField.input.value, rgb: rgbField.input.value, cmyk: cmykField.input.value });
  }

  hexField.input.addEventListener('input', () => {
    updateFromHex(hexField.input.value.trim());
  });
  rgbField.input.addEventListener('input', () => {
    updateFromRgb(rgbField.input.value.trim());
  });
  cmykField.input.addEventListener('input', () => {
    updateFromCmyk(cmykField.input.value.trim());
  });
  colorInput.addEventListener('input', () => {
    hexField.input.value = colorInput.value;
    updateFromHex(colorInput.value);
  });

  if (!updateFromHex(hexField.input.value.trim())) {
    updateFromRgb(rgbField.input.value.trim());
  }

  return {
    getShareParams() {
      return {
        hex: hexField.input.value,
        rgb: rgbField.input.value,
        cmyk: cmykField.input.value,
      };
    },
  };
}

const LOREM_CLASSIC = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus.',
  'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  'Donec ullamcorper nulla non metus auctor fringilla.',
  'Nullam id dolor id nibh ultricies vehicula ut id elit.',
];

const LOREM_MODERN = [
  'Tech Teddy liefert dir sofort nutzbare Tools für Mathe, Finanzen und Alltag.',
  'Alle Rechner laufen direkt im Browser – ohne Anmeldung, ohne Tracking.',
  'Passe Eingaben flexibel an und teile Ergebnisse über einen einzigen Link.',
  'Responsive Layouts sorgen dafür, dass jedes Tool auf Smartphone, Tablet und Desktop funktioniert.',
  'Dank Dark Mode bleibt der Bildschirm auch nachts angenehm augenschonend.',
  'Wir aktualisieren Formeln und Datensätze laufend, damit deine Ergebnisse stimmen.',
  'Smarte Defaults beschleunigen den Einstieg und sparen dir manuelle Klicks.',
  'Exportiere Resultate als CSV oder kopiere sie direkt in Zwischenablage und Mail.',
  'Tech Teddy ist komplett werbefrei – so bleibt der Fokus auf deinen Aufgaben.',
];

const LOREM_BULLET = [
  '✓ Live-Berechnung ohne Nachladen',
  '✓ DSGVO-konform & ohne Tracking',
  '✓ Dark & Light Mode inklusive',
  '✓ Desktop, Tablet & Smartphone ready',
  '✓ Teilen per Direktlink oder QR-Code',
  '✓ Offline auf GitHub Pages einsetzbar',
];

const USERNAME_ADJECTIVES = [
  'Smart',
  'Pixel',
  'Nova',
  'Alpha',
  'Cyber',
  'Flux',
  'Turbo',
  'Laser',
  'Bright',
  'Quantum',
  'Dynamic',
  'Digital',
];

const USERNAME_NOUNS = [
  'Pilot',
  'Coder',
  'Crafter',
  'Scout',
  'Wizard',
  'Engineer',
  'Maker',
  'Designer',
  'Fox',
  'Bear',
  'Falcon',
  'Spark',
];

const USERNAME_GAMER_SUFFIX = ['X', 'HD', 'Pro', '247', 'One', 'XR', 'Prime'];
const USERNAME_BUSINESS_SUFFIX = ['Studio', 'Labs', 'Media', 'Consulting', 'Solutions', 'Factory'];

const DOMAIN_TLDS = ['.de', '.com', '.net', '.org', '.eu', '.io', '.app', '.shop'];

const PASSWORD_SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!$%&*+-=?@#^_',
};

function computeTextStats(text) {
  const characters = text.length;
  const charactersWithoutSpaces = text.replace(/\s+/g, '').length;
  const lines = text ? text.split(/\r?\n/).length : 0;
  const wordsArray = text.trim() ? text.trim().split(/\s+/) : [];
  const words = wordsArray.length;
  const sentences = (text.match(/[.!?]+(?:\s|$)/g) ?? []).length;
  const normalizedWords = wordsArray
    .map((word) => word.toLocaleLowerCase('de-DE').replace(/[^\p{L}\p{Nd}]/gu, ''))
    .filter(Boolean);
  const uniqueWords = new Set(normalizedWords).size;
  const totalLetters = normalizedWords.reduce((sum, word) => sum + word.length, 0);
  const averageWordLength = normalizedWords.length ? totalLetters / normalizedWords.length : 0;
  const longestWord = normalizedWords.reduce((longest, word) => (word.length > longest.length ? word : longest), '');
  return {
    characters,
    charactersWithoutSpaces,
    words,
    lines,
    sentences,
    uniqueWords,
    averageWordLength,
    longestWord,
  };
}

function getWordFrequency(text, limit = 10) {
  const matches = text
    .toLocaleLowerCase('de-DE')
    .match(/[\p{L}\p{Nd}]+/gu);
  if (!matches) {
    return [];
  }
  const map = new Map();
  matches.forEach((word) => {
    map.set(word, (map.get(word) ?? 0) + 1);
  });
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function generateLoremIpsum(count, tone) {
  const paragraphs = [];
  if (tone === 'bullet') {
    for (let i = 0; i < count; i += 1) {
      paragraphs.push(`• ${LOREM_BULLET[i % LOREM_BULLET.length]}`);
    }
    return paragraphs.join('\n');
  }
  const source = tone === 'modern' ? LOREM_MODERN : LOREM_CLASSIC;
  for (let i = 0; i < count; i += 1) {
    const segment = [];
    for (let j = 0; j < 3; j += 1) {
      segment.push(source[(i * 3 + j) % source.length]);
    }
    paragraphs.push(segment.join(' '));
  }
  return paragraphs.join('\n\n');
}

function toSentenceCase(text) {
  const lower = text.toLocaleLowerCase('de-DE');
  let result = '';
  let capitalizeNext = true;
  for (const char of lower) {
    if (capitalizeNext && /\p{L}/u.test(char)) {
      result += char.toLocaleUpperCase('de-DE');
      capitalizeNext = false;
    } else {
      result += char;
    }
    if (/[.!?]/.test(char)) {
      capitalizeNext = true;
    } else if (/\S/.test(char)) {
      capitalizeNext = false;
    }
  }
  return result;
}

function toTitleCase(text) {
  return text
    .toLocaleLowerCase('de-DE')
    .replace(/\p{L}[\p{L}\p{Nd}]*/gu, (word) => word.charAt(0).toLocaleUpperCase('de-DE') + word.slice(1));
}

function toKebabCase(text) {
  return text
    .toLocaleLowerCase('de-DE')
    .replace(/[^\p{L}\p{Nd}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleString(str) {
  const array = [...str];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}

function generatePassword(length, { includeSymbols }) {
  const sets = [PASSWORD_SETS.lower, PASSWORD_SETS.upper, PASSWORD_SETS.digits];
  if (includeSymbols) {
    sets.push(PASSWORD_SETS.symbols);
  }
  const pool = sets.join('');
  const required = sets.map((set) => randomChoice(set));
  let password = required.join('');
  for (let i = password.length; i < length; i += 1) {
    password += randomChoice(pool);
  }
  return shuffleString(password).slice(0, length);
}

function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toLocaleUpperCase('de-DE') + word.slice(1);
}

function sanitizeWord(word) {
  return word
    .toLocaleLowerCase('de-DE')
    .replace(/[^\p{L}\p{Nd}]+/gu, '');
}

function generateUsernames({ keyword, style, count }) {
  const results = new Set();
  const baseKeyword = sanitizeWord(keyword || '');
  let attempts = 0;
  while (results.size < count && attempts < count * 20) {
    attempts += 1;
    const adjective = sanitizeWord(randomChoice(USERNAME_ADJECTIVES));
    const noun = sanitizeWord(randomChoice(USERNAME_NOUNS));
    let suggestion = '';
    if (style === 'gamer') {
      const suffix = randomChoice(USERNAME_GAMER_SUFFIX);
      const number = Math.floor(Math.random() * 90 + 10);
      suggestion = `${adjective}${capitalize(noun)}${suffix}${number}`;
    } else if (style === 'business') {
      const base = baseKeyword || adjective;
      suggestion = `${capitalize(base)}${randomChoice(USERNAME_BUSINESS_SUFFIX)}`;
    } else {
      suggestion = `${capitalize(adjective)}${capitalize(noun)}`;
    }
    results.add(suggestion);
  }
  return Array.from(results);
}

function slugifyDomainPart(part) {
  return part
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function generateDomains({ keywords, tld, count }) {
  const results = new Set();
  let attempts = 0;
  while (results.size < count && attempts < count * 40) {
    attempts += 1;
    const parts = keywords.length
      ? shuffleArray(keywords).slice(0, Math.min(3, keywords.length)).map(sanitizeWord)
      : [sanitizeWord(randomChoice(USERNAME_ADJECTIVES)), sanitizeWord(randomChoice(USERNAME_NOUNS))];
    const candidate = slugifyDomainPart(parts.join(''));
    if (!candidate) continue;
    results.add(`${candidate}${tld}`);
  }
  return Array.from(results);
}

function generateAnagrams(word, count) {
  const sanitized = sanitizeWord(word);
  if (!sanitized) {
    return [];
  }
  const results = new Set();
  let attempts = 0;
  const limit = sanitized.length <= 9 ? count * 20 : count * 5;
  while (results.size < count && attempts < limit) {
    attempts += 1;
    const shuffled = shuffleString(sanitized);
    results.add(capitalize(shuffled));
  }
  return Array.from(results);
}

function generateRandomNumbers({ min, max, count, unique }) {
  if (unique) {
    const set = new Set();
    let attempts = 0;
    const rangeSize = Math.floor((max - min) * 1000000) + 1;
    while (set.size < count && attempts < count * 20) {
      attempts += 1;
      const value = Number((min + Math.random() * (max - min)).toFixed(6));
      const key = `${value}`;
      if (!set.has(key)) {
        set.add(key);
      }
    }
    return Array.from(set).map(Number);
  }
  const list = [];
  for (let i = 0; i < count; i += 1) {
    const value = min + Math.random() * (max - min);
    list.push(Number(value.toFixed(6)));
  }
  return list;
}

function countEmojis(text) {
  const matches = text.match(/\p{Extended_Pictographic}/gu) ?? [];
  const counts = new Map();
  matches.forEach((emoji) => {
    counts.set(emoji, (counts.get(emoji) ?? 0) + 1);
  });
  const sorted = new Map([...counts.entries()].sort((a, b) => b[1] - a[1]));
  return {
    total: matches.length,
    unique: counts.size,
    counts: sorted,
  };
}

function md5(str) {
  const x = convertToWordArray(str);
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const oa = a;
    const ob = b;
    const oc = c;
    const od = d;

    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safeAdd(a, oa);
    b = safeAdd(b, ob);
    c = safeAdd(c, oc);
    d = safeAdd(d, od);
  }

  return [a, b, c, d].map(toHex).join('');
}

function convertToWordArray(str) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  const length = bytes.length;
  const words = [];
  for (let i = 0; i < length; i += 4) {
    words[i >> 2] =
      (bytes[i] ?? 0) |
      ((bytes[i + 1] ?? 0) << 8) |
      ((bytes[i + 2] ?? 0) << 16) |
      ((bytes[i + 3] ?? 0) << 24);
  }
  const bitLength = length * 8;
  words[bitLength >> 5] |= 0x80 << bitLength % 32;
  words[((bitLength + 64) >>> 9 << 4) + 14] = bitLength;
  return words;
}

function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff);
}

function bitRotateLeft(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}

function cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn((b & c) | (~b & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}

function toHex(num) {
  let str = '';
  for (let i = 0; i < 4; i += 1) {
    str += (`0${((num >> (i * 8)) & 0xff).toString(16)}`).slice(-2);
  }
  return str;
}

async function computeSha(text, algorithm) {
  if (!window.crypto?.subtle) {
    return 'nicht verfügbar';
  }
  try {
    const data = new TextEncoder().encode(text);
    const hash = await window.crypto.subtle.digest(algorithm, data);
    return Array.from(new Uint8Array(hash))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  } catch (error) {
    return 'Fehler';
  }
}

function csvToJson(text, delimiter) {
  const rows = [];
  let current = '';
  let row = [];
  let inQuotes = false;

  const pushValue = () => {
    row.push(current);
    current = '';
  };

  const pushRow = () => {
    if (row.length || current) {
      pushValue();
      rows.push(row);
      row = [];
    }
  };

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      pushValue();
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[i + 1] === '\n') {
        i += 1;
      }
      pushRow();
    } else {
      current += char;
    }
  }
  pushRow();

  if (!rows.length) {
    return [];
  }

  const headers = rows.shift().map((header) => header.trim());
  return rows
    .filter((rowValues) => rowValues.some((value) => value.trim() !== ''))
    .map((rowValues) => {
      const entry = {};
      headers.forEach((header, index) => {
        entry[header || `Spalte_${index + 1}`] = rowValues[index]?.trim() ?? '';
      });
      return entry;
    });
}

function minifyHtml(source) {
  return source
    .replace(/<!--([\s\S]*?)-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function minifyCss(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function hexToRgb(hex) {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return null;
  const value = parseInt(match[1], 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex(r, g, b) {
  const clamp = (value) => Math.min(255, Math.max(0, Math.round(value)));
  return `#${((1 << 24) + (clamp(r) << 16) + (clamp(g) << 8) + clamp(b)).toString(16).slice(1)}`;
}

function parseRgbString(value) {
  const parts = value.split(',').map((part) => Number(part.trim()));
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return null;
  }
  const [r, g, b] = parts.map((part) => Math.min(255, Math.max(0, Math.round(part))));
  return { r, g, b };
}

function parseCmykString(value) {
  const parts = value.split(',').map((part) => Number(part.trim()));
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) {
    return null;
  }
  const [c, m, y, k] = parts.map((part) => Math.min(100, Math.max(0, Math.round(part))));
  return { c, m, y, k };
}

function rgbToCmyk(r, g, b) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const k = 1 - Math.max(red, green, blue);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const c = Math.round(((1 - red - k) / (1 - k)) * 100);
  const m = Math.round(((1 - green - k) / (1 - k)) * 100);
  const y = Math.round(((1 - blue - k) / (1 - k)) * 100);
  return { c, m, y, k: Math.round(k * 100) };
}

function cmykToRgb(c, m, y, k) {
  const C = c / 100;
  const M = m / 100;
  const Y = y / 100;
  const K = k / 100;
  const r = 255 * (1 - C) * (1 - K);
  const g = 255 * (1 - M) * (1 - K);
  const b = 255 * (1 - Y) * (1 - K);
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

function rgbToHsl(r, g, b) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case red:
        h = (green - blue) / d + (green < blue ? 6 : 0);
        break;
      case green:
        h = (blue - red) / d + 2;
        break;
      case blue:
        h = (red - green) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}
