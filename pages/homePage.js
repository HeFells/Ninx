window.HomePage = (() => {
  const render = (state) => {
    const featured = [...state.models].sort((a, b) => b.likes - a.likes).slice(0, 3);

    return `
      <section class="fade-in mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div class="rounded-2xl bg-gradient-to-br from-brand-900 to-slate-800 p-8 text-white shadow-xl">
          <p class="mb-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Build. Share. Explore.</p>
          <h1 class="mb-3 text-3xl font-extrabold sm:text-5xl">Unlock Thousands of Technologies for Free!⚡</h1>
          <p class="mb-6 max-w-2xl text-slate-200">Discover, test, and share machine learning models with the community.</p>
          <a href="#/models" class="inline-flex rounded-lg bg-blue-500 px-5 py-2.5 font-semibold hover:bg-blue-400">Explore Models</a>
        </div>

        <div class="mt-10">
          <h2 class="mb-4 text-2xl font-bold">Featured Models</h2>
          <div class="grid gap-4 md:grid-cols-3">
            ${featured.map(window.ModelCard.render).join('')}
          </div>
        </div>

        <div class="mt-12 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 class="mb-4 text-2xl font-bold">How It Works</h2>
          <div class="grid gap-4 md:grid-cols-3">
            ${[
              ['1', 'Find a model', 'Explore top community AI models using search, filters, and sorting.'],
              ['2', 'Test online', 'Run fast mock inference directly from the browser before download.'],
              ['3', 'Download and use', 'Grab model artifacts and integrate into your pipeline quickly.'],
            ]
              .map(
                ([num, title, text]) => `
                  <article class="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                    <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/40">${num}</span>
                    <h3 class="mt-3 text-lg font-semibold">${title}</h3>
                    <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">${text}</p>
                  </article>
                `
              )
              .join('')}
          </div>
        </div>
      </section>
    `;
  };

  return { render };
})();
