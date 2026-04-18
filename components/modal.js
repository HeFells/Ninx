window.NinxModal = (() => {
  const renderInferenceModal = (model) => {
    const isNlp = model.tags.includes('NLP');
    const isCv = model.tags.includes('CV');

    return `
      <div id="inferenceModal" class="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/65 p-4">
        <div class="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-bold">Test Model: ${model.name}</h2>
            <button id="closeInferenceModal" class="rounded-md border px-2 py-1" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <div class="space-y-4">
            ${
              isNlp || !isCv
                ? `<label class="block text-sm font-medium">Text Input
                    <textarea id="inferenceText" class="mt-1 w-full rounded-lg border border-slate-300 p-3 text-sm dark:border-slate-700 dark:bg-slate-800" rows="4" placeholder="Write a sentence to run inference..."></textarea>
                  </label>`
                : `<label class="block text-sm font-medium">Image Input
                    <input id="inferenceImage" type="file" accept="image/*" class="mt-1 block w-full rounded-lg border border-slate-300 p-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
                  </label>
                  <canvas id="cvCanvas" class="hidden w-full rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800" height="260"></canvas>`
            }

            <button id="runInferenceBtn" class="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400">
              <span id="runLabel">Run Inference</span>
            </button>

            <div id="inferenceResult" class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
              Result will appear here.
            </div>
          </div>
        </div>
      </div>
    `;
  };

  return {
    renderInferenceModal,
  };
})();
