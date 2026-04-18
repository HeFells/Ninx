window.ModelCard = (() => {
  const tagBadge = (tag) =>
    `<span class="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">${tag}</span>`;

  const render = (model) => `
    <article class="model-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div class="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">${model.name}</h3>
          <p class="text-xs text-slate-500">by ${model.author.name} • ${NinxHelpers.relativeTime(model.createdAt)}</p>
        </div>
      </div>

      <p class="mb-4 text-sm text-slate-600 dark:text-slate-300">${model.shortDescription}</p>

      <div class="mb-4 flex flex-wrap gap-2">${model.tags.map(tagBadge).join('')}</div>

      <div class="mb-4 flex items-center gap-4 text-xs text-slate-500">
        <span><i class="fa-solid fa-download mr-1"></i>${model.downloads.toLocaleString()}</span>
        <span><i class="fa-solid fa-heart mr-1"></i>${model.likes.toLocaleString()}</span>
      </div>

      <div class="flex items-center justify-between">
        <a href="#/model/${model.id}" class="text-sm font-semibold text-blue-500 hover:underline">View Details</a>
        <button class="test-model-btn rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800" data-model-id="${model.id}" aria-label="Test ${model.name}">
          <i class="fa-solid fa-vial mr-1"></i>Test
        </button>
      </div>
    </article>
  `;

  return { render };
})();
