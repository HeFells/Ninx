window.Navbar = (() => {
  const render = (state) => {
    const isLoggedIn = Boolean(state.currentUser);

    return `
      <header class="sticky top-0 z-30 bg-brand-900 text-slate-100 shadow-lg">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between gap-4">
            <a href="#/home" class="text-xl font-extrabold tracking-tight">Ninxware</a>

            <div class="hidden md:flex flex-1 max-w-xl items-center gap-4">
              <label class="relative w-full" for="globalSearch">
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  id="globalSearch"
                  aria-label="Search models"
                  class="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-9 pr-3 text-sm outline-none ring-blue-500 focus:ring"
                  placeholder="Search models by name or description"
                  value="${state.globalSearch || ''}"
                />
              </label>
            </div>

            <button id="mobileMenuBtn" class="md:hidden" aria-label="Toggle menu">
              <i class="fa-solid fa-bars text-xl"></i>
            </button>

            <nav class="hidden md:flex items-center gap-4 text-sm font-medium">
              <a class="hover:text-blue-300" href="#/home">Home</a>
              <a class="hover:text-blue-300" href="#/models">Explore Models</a>
              ${isLoggedIn ? '<a class="hover:text-blue-300" href="#/upload">Upload</a>' : ''}
              <button id="themeToggle" class="rounded-md border border-slate-700 px-2 py-1 hover:bg-slate-800" aria-label="Toggle theme">
                <i class="fa-solid fa-circle-half-stroke"></i>
              </button>
              ${
                isLoggedIn
                  ? `<div class="flex items-center gap-2"><span class="rounded-full bg-blue-500/25 px-3 py-1 text-xs">${state.currentUser.name}</span><button id="logoutBtn" class="rounded-md border border-slate-700 px-3 py-1 hover:bg-slate-800">Logout</button></div>`
                  : '<a href="#/login" class="rounded-md bg-blue-500 px-3 py-1.5 hover:bg-blue-400">Login / Register</a>'
              }
            </nav>
          </div>

          <div id="mobileMenu" class="hidden pb-4 md:hidden">
            <div class="mb-3">
              <label class="relative block" for="globalSearchMobile">
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input id="globalSearchMobile" class="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-9 pr-3 text-sm" placeholder="Search models" value="${state.globalSearch || ''}" />
              </label>
            </div>
            <div class="flex flex-col gap-2 text-sm">
              <a href="#/home" class="rounded-md px-2 py-1 hover:bg-slate-800">Home</a>
              <a href="#/models" class="rounded-md px-2 py-1 hover:bg-slate-800">Explore Models</a>
              ${isLoggedIn ? '<a href="#/upload" class="rounded-md px-2 py-1 hover:bg-slate-800">Upload</a>' : ''}
              <button id="themeToggleMobile" class="rounded-md border border-slate-700 px-2 py-1 text-left">Toggle theme</button>
              ${
                isLoggedIn
                  ? '<button id="logoutBtnMobile" class="rounded-md border border-slate-700 px-2 py-1 text-left">Logout</button>'
                  : '<a href="#/login" class="rounded-md bg-blue-500 px-2 py-1 text-center">Login / Register</a>'
              }
            </div>
          </div>
        </div>
      </header>
    `;
  };

  return { render };
})();
