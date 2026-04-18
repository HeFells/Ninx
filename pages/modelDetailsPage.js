window.ModelDetailsPage = (() => {
  const tableRows = (items, rowRenderer) =>
    items.length
      ? items.map(rowRenderer).join('')
      : '<tr><td colspan="3" class="px-4 py-3 text-center text-slate-500">No data available.</td></tr>';

  const render = (model) => {
    if (!model) {
      return `
        <section class="mx-auto max-w-4xl px-4 py-10">
          <div class="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
            <h2 class="text-xl font-bold">Model not found</h2>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">The model you are looking for does not exist.</p>
            <a href="#/models" class="mt-4 inline-block rounded-lg bg-blue-500 px-4 py-2 text-white">Back to models</a>
          </div>
        </section>
      `;
    }

    const totalBytes = model.files.reduce((sum, file) => sum + (file.size || 0), 0);

    return `
      <section class="fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header class="mb-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 class="text-2xl font-extrabold">${model.name}</h1>
              <p class="text-sm text-slate-500">by ${model.author.name} • ${NinxHelpers.relativeTime(model.createdAt)} • ${model.weight}</p>
              <div class="mt-2 flex flex-wrap gap-2">${model.tags
                .map((tag) => `<span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800">${tag}</span>`)
                .join('')}</div>
            </div>
            <div class="flex gap-2">
              <button id="downloadModelBtn" data-model-id="${model.id}" class="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400">
                <i class="fa-solid fa-download mr-1"></i>Download Model
              </button>
              <button class="test-model-btn rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800" data-model-id="${model.id}">
                <i class="fa-solid fa-vial mr-1"></i>Test Model
              </button>
            </div>
          </div>
        </header>

        <div class="grid gap-6 lg:grid-cols-3">
          <div class="space-y-6 lg:col-span-2">
            <section class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h2 class="mb-2 text-lg font-bold">Overview</h2>
              <p class="mb-3 text-sm text-slate-600 dark:text-slate-300">${model.fullDescription}</p>
              <div class="markdown-preview text-sm">${NinxHelpers.markdownToHtml(model.readme)}</div>
            </section>

            <section class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h2 class="mb-3 text-lg font-bold">Files and Size</h2>
              <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                  <thead>
                    <tr class="border-b border-slate-200 text-left dark:border-slate-700">
                      <th class="px-4 py-2">File</th>
                      <th class="px-4 py-2">Size</th>
                      <th class="px-4 py-2">URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tableRows(
                      model.files,
                      (file) => `<tr class="border-b border-slate-100 dark:border-slate-800">
                        <td class="px-4 py-2">${file.name}</td>
                        <td class="px-4 py-2">${NinxHelpers.formatBytes(file.size)}</td>
                        <td class="px-4 py-2"><span class="text-xs text-slate-500">${file.url || '#'}</span></td>
                      </tr>`
                    )}
                  </tbody>
                </table>
              </div>
              <p class="mt-3 text-sm font-semibold">Total weight: ${model.weight} (${NinxHelpers.formatBytes(totalBytes)})</p>
            </section>

            <section class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h2 class="mb-3 text-lg font-bold">Parameters</h2>
              <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                  <thead>
                    <tr class="border-b border-slate-200 text-left dark:border-slate-700">
                      <th class="px-4 py-2">Name</th>
                      <th class="px-4 py-2">Shape</th>
                      <th class="px-4 py-2">DType</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tableRows(
                      model.parameters,
                      (p) => `<tr class="border-b border-slate-100 dark:border-slate-800">
                        <td class="px-4 py-2">${p.name}</td>
                        <td class="px-4 py-2">${p.shape}</td>
                        <td class="px-4 py-2">${p.dtype}</td>
                      </tr>`
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h2 class="mb-3 text-lg font-bold">How to Use</h2>
              <pre class="overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100"><code>${NinxHelpers.escapeHtml(model.usageExample)}</code></pre>
            </section>
          </div>

          <aside class="space-y-6">
            <section class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h3 class="mb-2 text-lg font-bold">Model Stats</h3>
              <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li><i class="fa-solid fa-download mr-1"></i>${model.downloads.toLocaleString()} downloads</li>
                <li><i class="fa-solid fa-heart mr-1"></i>${model.likes.toLocaleString()} likes</li>
              </ul>
            </section>

            <section class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h3 class="mb-2 text-lg font-bold">Community Comments</h3>
              <div class="space-y-3 text-sm">
                <article class="rounded-lg bg-slate-50 p-3 dark:bg-slate-800"><strong>Ava</strong><p>Amazing baseline for production tests.</p></article>
                <article class="rounded-lg bg-slate-50 p-3 dark:bg-slate-800"><strong>Leo</strong><p>Would love quantized variants too!</p></article>
                <article class="rounded-lg bg-slate-50 p-3 dark:bg-slate-800"><strong>Mia</strong><p>Easy to integrate and great docs.</p></article>
              </div>
            </section>
          </aside>
        </div>
      </section>
    `;
  };

  return { render };
})();
