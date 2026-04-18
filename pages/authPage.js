window.AuthPage = (() => {
  const render = (state) => {
    const mode = state.authMode;

    return `
      <section class="fade-in mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
        <div class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div class="mb-5 flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
            <button id="switchLogin" class="w-1/2 rounded-md px-3 py-2 text-sm font-semibold ${mode === 'login' ? 'bg-white shadow dark:bg-slate-700' : ''}">Login</button>
            <button id="switchRegister" class="w-1/2 rounded-md px-3 py-2 text-sm font-semibold ${mode === 'register' ? 'bg-white shadow dark:bg-slate-700' : ''}">Register</button>
          </div>

          <form id="authForm" class="space-y-3">
            ${
              mode === 'register'
                ? `<label class="block text-sm font-medium">Name
                    <input name="name" required class="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
                  </label>`
                : ''
            }
            <label class="block text-sm font-medium">Email
              <input name="email" type="email" required class="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
            </label>
            <label class="block text-sm font-medium">Password
              <input name="password" type="password" minlength="6" required class="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm dark:border-slate-700 dark:bg-slate-800" />
            </label>
            <button type="submit" class="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-400">${mode === 'login' ? 'Login' : 'Create Account'}</button>
          </form>

          <p id="authFeedback" class="mt-3 text-sm"></p>
        </div>
      </section>
    `;
  };

  return { render };
})();
