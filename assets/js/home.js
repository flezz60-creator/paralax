import { listToolsByCluster, CLUSTERS } from './tool-data.js';
import { formatDate, setupThemeToggle } from './utils.js';

const searchInput = document.querySelector('[data-tool-search]');
const gridContainer = document.querySelector('[data-tool-grid]');
const clusterTabs = document.querySelector('[data-cluster-tabs]');
const themeToggle = document.querySelector('[data-theme-toggle]');

setupThemeToggle(themeToggle);

const toolsByCluster = listToolsByCluster();
const availableClusters = Object.keys(CLUSTERS).filter((clusterId) => (toolsByCluster[clusterId] ?? []).length);
let activeCluster = availableClusters[0] ?? 'cluster-a';
let searchTerm = '';

function renderTabs() {
  if (!clusterTabs) return;
  clusterTabs.innerHTML = '';
  availableClusters.forEach((clusterId) => {
    const cluster = CLUSTERS[clusterId];
    const button = document.createElement('button');
    button.className = 'btn btn-secondary';
    button.type = 'button';
    button.textContent = cluster.title;
    button.dataset.cluster = clusterId;
    if (clusterId === activeCluster) {
      button.classList.add('btn-primary');
      button.classList.remove('btn-secondary');
    }
    button.addEventListener('click', () => {
      activeCluster = clusterId;
      renderTabs();
      renderCards();
    });
    clusterTabs.appendChild(button);
  });
}

function renderCards() {
  if (!gridContainer) return;
  gridContainer.innerHTML = '';
  const list = toolsByCluster[activeCluster] ?? [];
  const filtered = list.filter((tool) => {
    if (!searchTerm) return true;
    const query = searchTerm.toLowerCase();
    return [tool.name, tool.shortDescription, ...(tool.keywords ?? [])]
      .join(' ')
      .toLowerCase()
      .includes(query);
  });

  if (!filtered.length) {
    const empty = document.createElement('div');
    empty.className = 'no-results';
    empty.innerHTML = '<strong>Keine Treffer.</strong><br>Bitte Suchbegriff anpassen oder anderen Cluster wählen.';
    gridContainer.appendChild(empty);
    return;
  }

  filtered.forEach((tool) => {
    const article = document.createElement('article');
    article.className = 'card';

    const heading = document.createElement('h3');
    const link = document.createElement('a');
    link.href = `tools/${tool.slug}/`;
    link.textContent = tool.name;
    heading.appendChild(link);

    const desc = document.createElement('p');
    desc.textContent = tool.shortDescription;

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = `Zuletzt aktualisiert: ${formatDate(tool.lastUpdated)}`;

    const chips = document.createElement('div');
    chips.className = 'chip-list';
    (tool.keywords ?? []).slice(0, 3).forEach((keyword) => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = keyword;
      chips.appendChild(chip);
    });

    article.appendChild(heading);
    article.appendChild(desc);
    article.appendChild(meta);
    if (chips.childNodes.length) {
      article.appendChild(chips);
    }

    gridContainer.appendChild(article);
  });
}

renderTabs();
renderCards();

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    searchTerm = event.target.value;
    renderCards();
  });
}
