window.ModelsPage = (() => {
  const sorters = {
    recent: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    downloads: (a, b) => b.downloads - a.downloads,
    likes: (a, b) => b.likes - a.likes,
  };

  const render = (state) => {
    const activeTag = state.filters.tag;
    const search = (state.filters.search || state.globalSearch || '').trim().toLowerCase();
    const sorter = sorters[state.filters.sort] || sorters.recent;

    const tags = ['All', 'NLP', 'CV', 'Audio', 'Multimodal'];

    const filtered = state.models
      .filter((m) => (activeTag === 'All' ? true : m.tags.includes(activeTag)))
      .filter((m) =>
        !search ? true : `${m.name} ${m.shortDescription} ${m.fullDescription}`.toLowerCase().includes(search)
      )
      .sort(sorter);

    return `
      <section class="fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header class="mb-6">
          <h1 class="text-2xl font-bold">Explore Models</h1>
          <p class="text-sm text-slate-600 dark:text-slate-300">Browse open models from the Ninxware community.</p>
        </header>

        <div class="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 md:grid-cols-3">
          <label class="text-sm font-medium">Search
            <input id="modelsSearch" class="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm dark:border-slate-700 dark:bg-slate-800" placeholder="Search by name or description" value="${state.filters.search || state.globalSearch || ''}" />
          </label>

          <label class="text-sm font-medium">Sort By
            <select id="modelsSort" class="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm dark:border-slate-700 dark:bg-slate-800">
              <option value="recent" ${state.filters.sort === 'recent' ? 'selected' : ''}>Most Recent</option>
              <option value="downloads" ${state.filters.sort === 'downloads' ? 'selected' : ''}>Most Downloaded</option>
              <option value="likes" ${state.filters.sort === 'likes' ? 'selected' : ''}>Most Liked</option>
            </select>
          </label>

          <div class="text-sm font-medium">Filter Tags
            <div class="mt-2 flex flex-wrap gap-2">
              ${tags
                .map(
                  (tag) => `<button class="tag-filter rounded-full border px-3 py-1 text-xs ${
                    tag === activeTag
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                      : 'border-slate-300 dark:border-slate-700'
                  }" data-tag="${tag}">${tag}</button>`
                )
                .join('')}
            </div>
          </div>
        </div>

        <div id="modelsGrid" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          ${
            filtered.length
              ? filtered.map(window.ModelCard.render).join('')
              : '<div class="col-span-full rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">No models found. Try adjusting your filters or search query.</div>'
          }
        </div>
      </section>
    `;
  };

  return { render };
})();
