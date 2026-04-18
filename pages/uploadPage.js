window.UploadPage = (() => {
  const render = (state) => {
    if (!state.currentUser) {
      return `
        <section class="mx-auto max-w-3xl px-4 py-10">
          <div class="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
            <h2 class="text-xl font-bold">Login required</h2>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">You need an account to publish models.</p>
            <a href="#/login" class="mt-4 inline-block rounded-lg bg-blue-500 px-4 py-2 text-white">Go to Login</a>
          </div>
        </section>
      `;
    }

    const fileRows = state.uploadDraft.files.length
      ? state.uploadDraft.files
          .map(
            (file) => `<tr class="border-b border-slate-100 dark:border-slate-800">
              <td class="px-3 py-2">${file.name}</td>
              <td class="px-3 py-2">${NinxHelpers.formatBytes(file.size)}</td>
            </tr>`
          )
          .join('')
      : '<tr><td colspan="2" class="px-3 py-4 text-center text-slate-500">No files selected yet.</td></tr>';

    return `
      <section class="fade-in mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <header class="mb-6">
          <h1 class="text-2xl font-bold">Upload Model</h1>
          <p class="text-sm text-slate-600 dark:text-slate-300">Publish your model so others can discover and test it.</p>
        </header>

        <form id="uploadForm" class="space-y-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
          <label class="block text-sm font-medium">Model Name *
            <input name="modelName" required class="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm dark:border-slate-700 dark:bg-slate-800" placeholder="e.g., MyAwesomeTransformer" value="${state.uploadDraft.modelName || ''}" />
          </label>

          <label class="block text-sm font-medium">Short Description *
            <input name="shortDescription" required maxlength="150" class="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm dark:border-slate-700 dark:bg-slate-800" placeholder="One-line summary (max 150 chars)" value="${state.uploadDraft.shortDescription || ''}" />
          </label>

          <label class="block text-sm font-medium">Long Description / README
            <textarea name="fullDescription" rows="4" class="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm dark:border-slate-700 dark:bg-slate-800" placeholder="Write markdown-friendly details...">${state.uploadDraft.fullDescription || ''}</textarea>
          </label>

          <div>
            <p class="text-sm font-medium">Tags</p>
            <div class="mt-2 flex flex-wrap gap-2">
              ${['NLP', 'CV', 'Audio', 'Multimodal']
                .map(
                  (tag) => `<label class="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700">
                    <input type="checkbox" name="tags" value="${tag}" ${state.uploadDraft.tags.includes(tag) ? 'checked' : ''} /> ${tag}
                  </label>`
                )
                .join('')}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium" for="filesInput">Model Files (simulated)</label>
            <div class="mt-1 rounded-xl border-2 border-dashed border-slate-300 p-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
              <p class="mb-2">Drag & drop is simulated. Use picker below:</p>
              <input id="filesInput" type="file" multiple class="block w-full text-sm" />
            </div>
            <div class="mt-3 overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead>
                  <tr class="border-b border-slate-200 text-left dark:border-slate-700">
                    <th class="px-3 py-2">File Name</th>
                    <th class="px-3 py-2">Size</th>
                  </tr>
                </thead>
                <tbody>${fileRows}</tbody>
              </table>
            </div>
          </div>

          <button id="publishBtn" type="submit" class="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-400">
            <span id="publishBtnLabel">Publish Model</span>
          </button>

          <p id="uploadFeedback" class="text-sm"></p>
        </form>
      </section>
    `;
  };

  return { render };
})();
