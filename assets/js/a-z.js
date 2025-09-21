import { tools } from './tool-data.js';
import { formatDate, setupThemeToggle } from './utils.js';

const listContainer = document.querySelector('[data-tool-list]');
const themeToggle = document.querySelector('[data-theme-toggle]');
setupThemeToggle(themeToggle);

if (listContainer) {
  const sorted = [...tools].sort((a, b) => a.name.localeCompare(b.name));
  sorted.forEach((tool) => {
    const article = document.createElement('article');
    article.className = 'card';
    const heading = document.createElement('h3');
    const link = document.createElement('a');
    link.href = `../tools/${tool.slug}/`;
    link.textContent = tool.name;
    heading.appendChild(link);
    const description = document.createElement('p');
    description.textContent = tool.shortDescription;
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = `Cluster: ${tool.category} • Stand: ${formatDate(tool.lastUpdated)}`;
    article.appendChild(heading);
    article.appendChild(description);
    article.appendChild(meta);
    listContainer.appendChild(article);
  });
}
