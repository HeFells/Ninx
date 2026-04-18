(() => {
  const { KEYS } = NinxStorage;

  const state = {
    currentUser: null,
    users: [],
    models: [],
    currentPage: '#/home',
    globalSearch: '',
    authMode: 'login',
    filters: {
      tag: 'All',
      sort: 'recent',
      search: '',
    },
    uploadDraft: {
      modelName: '',
      shortDescription: '',
      fullDescription: '',
      tags: ['NLP'],
      files: [],
    },
    ui: {
      mobileMenuOpen: false,
    },
  };

  const root = document.getElementById('appRoot');

  const parseRoute = () => {
    const hash = window.location.hash || '#/home';
    const clean = hash.replace(/^#\/?/, '');
    const [page, id] = clean.split('/').filter(Boolean);

    if (page === 'model' && id) return { name: 'model', id };
    if (['home', 'models', 'upload', 'login'].includes(page)) return { name: page };
    return { name: 'home' };
  };

  const persist = () => {
    NinxStorage.write(KEYS.USERS, state.users);
    NinxStorage.write(KEYS.MODELS, state.models);
    NinxStorage.write(KEYS.CURRENT_USER, state.currentUser);
  };

  const showToast = (message, type = 'success') => {
    const color = type === 'error' ? 'bg-rose-500' : 'bg-emerald-500';
    const node = document.createElement('div');
    node.className = `fixed bottom-4 right-4 z-50 rounded-lg ${color} px-4 py-2 text-sm font-semibold text-white shadow-xl`;
    node.textContent = message;
    document.body.appendChild(node);
    setTimeout(() => node.remove(), 1800);
  };

  const initData = () => {
    state.users = NinxStorage.read(KEYS.USERS, []);
    state.models = NinxStorage.read(KEYS.MODELS, null) || NinxMockData.models;
    state.currentUser = NinxStorage.read(KEYS.CURRENT_USER, null);

    if (!localStorage.getItem(KEYS.MODELS)) NinxStorage.write(KEYS.MODELS, state.models);
    if (!localStorage.getItem(KEYS.USERS)) NinxStorage.write(KEYS.USERS, state.users);

    const theme = NinxStorage.read(KEYS.THEME, 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    NinxStorage.write(KEYS.THEME, document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  };

  const renderPage = (route) => {
    switch (route.name) {
      case 'home':
        return HomePage.render(state);
      case 'models':
        return ModelsPage.render(state);
      case 'upload':
        return UploadPage.render(state);
      case 'login':
        return AuthPage.render(state);
      case 'model': {
        const model = state.models.find((m) => m.id === route.id);
        return ModelDetailsPage.render(model);
      }
      default:
        return HomePage.render(state);
    }
  };

  const renderApp = () => {
    const route = parseRoute();
    state.currentPage = route.name;

    if (route.name === 'upload' && !state.currentUser) {
      window.location.hash = '#/login';
      return;
    }

    const nav = Navbar.render(state);
    const main = renderPage(route);

    root.innerHTML = `${nav}<main>${main}</main>`;

    if (state.ui.mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    attachEvents(route);
  };

  const simulateInference = (model) => {
    const resultArea = document.getElementById('inferenceResult');
    const runBtn = document.getElementById('runInferenceBtn');
    const runLabel = document.getElementById('runLabel');

    runLabel.innerHTML = '<span class="inline-flex items-center gap-2"><span class="spinner"></span>Running...</span>';
    runBtn.disabled = true;

    setTimeout(() => {
      if (model.tags.includes('NLP')) {
        const labels = ['Positive', 'Neutral', 'Negative'];
        const label = labels[Math.floor(Math.random() * labels.length)];
        const confidence = (80 + Math.random() * 19).toFixed(1);
        resultArea.textContent = `Sentiment: ${label} (${confidence}% confidence)`;
      } else if (model.tags.includes('CV')) {
        const canvas = document.getElementById('cvCanvas');
        if (canvas) {
          canvas.classList.remove('hidden');
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 3;
          ctx.strokeRect(80, 60, 180, 120);
          ctx.fillStyle = '#3b82f6';
          ctx.fillText('Object: person (0.91)', 85, 55);
        }
        resultArea.textContent = 'Detected objects: person, backpack. Top confidence: 91%';
      } else {
        resultArea.textContent = 'Transcription: "Hello from Ninxware mock inference pipeline."';
      }
      runLabel.textContent = 'Run Inference';
      runBtn.disabled = false;
    }, 1200);
  };

  const openInferenceModal = (modelId) => {
    const model = state.models.find((m) => m.id === modelId);
    if (!model) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = NinxModal.renderInferenceModal(model);
    document.body.appendChild(wrapper);

    document.getElementById('closeInferenceModal').addEventListener('click', () => wrapper.remove());
    wrapper.addEventListener('click', (e) => {
      if (e.target.id === 'inferenceModal') wrapper.remove();
    });

    document.getElementById('runInferenceBtn').addEventListener('click', () => simulateInference(model));
  };

  const handleDownload = (modelId) => {
    const model = state.models.find((m) => m.id === modelId);
    if (!model) return;
    const blob = new Blob([`Mock archive for ${model.name}`], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${model.id}.zip`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast('Download started (simulated).');
  };

  const attachAuthEvents = () => {
    document.getElementById('switchLogin')?.addEventListener('click', () => {
      state.authMode = 'login';
      renderApp();
    });
    document.getElementById('switchRegister')?.addEventListener('click', () => {
      state.authMode = 'register';
      renderApp();
    });

    document.getElementById('authForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const name = (form.get('name') || '').toString().trim();
      const email = (form.get('email') || '').toString().trim().toLowerCase();
      const password = (form.get('password') || '').toString();
      const feedback = document.getElementById('authFeedback');

      if (!NinxHelpers.isValidEmail(email)) {
        feedback.textContent = 'Please enter a valid email.';
        feedback.className = 'mt-3 text-sm text-rose-500';
        return;
      }
      if (password.length < 6) {
        feedback.textContent = 'Password must have at least 6 characters.';
        feedback.className = 'mt-3 text-sm text-rose-500';
        return;
      }

      if (state.authMode === 'register') {
        if (!name) {
          feedback.textContent = 'Name is required for registration.';
          feedback.className = 'mt-3 text-sm text-rose-500';
          return;
        }

        const existing = state.users.find((u) => u.email === email);
        if (existing) {
          feedback.textContent = 'Email already registered. Please login.';
          feedback.className = 'mt-3 text-sm text-rose-500';
          return;
        }

        state.users.push({ name, email, password });
        state.currentUser = { name, email };
        persist();
        showToast('Registration successful. Welcome!');
        window.location.hash = '#/home';
        return;
      }

      const user = state.users.find((u) => u.email === email && u.password === password);
      if (!user) {
        feedback.textContent = 'Invalid credentials.';
        feedback.className = 'mt-3 text-sm text-rose-500';
        return;
      }

      state.currentUser = { name: user.name, email: user.email };
      persist();
      showToast('Welcome back!');
      window.location.hash = '#/home';
    });
  };

  const attachUploadEvents = () => {
    document.getElementById('filesInput')?.addEventListener('change', (event) => {
      const files = Array.from(event.target.files || []);
      const metadataReads = files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve({ name: file.name, size: file.size, url: '#' });
            reader.onerror = () => resolve({ name: file.name, size: file.size, url: '#' });
            reader.readAsArrayBuffer(file.slice(0, 1));
          })
      );

      Promise.all(metadataReads).then((mapped) => {
        state.uploadDraft.files = mapped;
        renderApp();
      });
    });

    document.getElementById('uploadForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const modelName = (form.get('modelName') || '').toString().trim();
      const shortDescription = (form.get('shortDescription') || '').toString().trim();
      const fullDescription = (form.get('fullDescription') || '').toString().trim();
      const tags = form.getAll('tags').map(String);
      const feedback = document.getElementById('uploadFeedback');
      const btnLabel = document.getElementById('publishBtnLabel');

      if (!modelName || !shortDescription) {
        feedback.textContent = 'Model name and short description are required.';
        feedback.className = 'text-sm text-rose-500';
        return;
      }

      if (!tags.length) {
        feedback.textContent = 'Please select at least one tag.';
        feedback.className = 'text-sm text-rose-500';
        return;
      }

      btnLabel.innerHTML = '<span class="inline-flex items-center gap-2"><span class="spinner"></span>Publishing...</span>';

      setTimeout(() => {
        const id = modelName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || NinxHelpers.uid();
        const model = {
          id: `${id}-${Date.now()}`,
          name: modelName,
          shortDescription: shortDescription.slice(0, 150),
          fullDescription: fullDescription || shortDescription,
          author: state.currentUser,
          tags,
          createdAt: new Date().toISOString(),
          downloads: 0,
          likes: 0,
          files: state.uploadDraft.files.length
            ? state.uploadDraft.files
            : [{ name: 'model.bin', size: 1200000, url: '#' }],
          parameters: [
            { name: 'encoder.layer.0.weight', shape: '[768, 768]', dtype: 'float32' },
            { name: 'lm_head.weight', shape: '[32000, 768]', dtype: 'float32' },
          ],
          weight: NinxHelpers.formatBytes(
            state.uploadDraft.files.reduce((sum, file) => sum + (file.size || 0), 0) || 1200000
          ),
          readme: fullDescription || `# ${modelName}\n\n${shortDescription}`,
          usageExample:
            "from transformers import AutoModel\nmodel = AutoModel.from_pretrained('your-model-id')\n# continue with your inference pipeline",
        };

        state.models = [model, ...state.models];
        state.uploadDraft = {
          modelName: '',
          shortDescription: '',
          fullDescription: '',
          tags: ['NLP'],
          files: [],
        };
        persist();
        showToast('Model published successfully!');
        window.location.hash = `#/model/${model.id}`;
      }, 1100);
    });
  };

  const attachSharedEvents = () => {
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
      state.ui.mobileMenuOpen = !state.ui.mobileMenuOpen;
      renderApp();
    });

    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('themeToggleMobile')?.addEventListener('click', toggleTheme);

    const syncSearch = (value) => {
      state.globalSearch = value;
      state.filters.search = value;
      if (parseRoute().name !== 'models') {
        window.location.hash = '#/models';
      } else {
        renderApp();
      }
    };

    document.getElementById('globalSearch')?.addEventListener('input', (e) => syncSearch(e.target.value));
    document.getElementById('globalSearchMobile')?.addEventListener('input', (e) => syncSearch(e.target.value));

    document.querySelectorAll('#logoutBtn, #logoutBtnMobile').forEach((btn) =>
      btn.addEventListener('click', () => {
        state.currentUser = null;
        persist();
        showToast('Logged out.');
        window.location.hash = '#/home';
      })
    );

    document.querySelectorAll('.test-model-btn').forEach((btn) => {
      btn.addEventListener('click', () => openInferenceModal(btn.dataset.modelId));
    });

    document.getElementById('downloadModelBtn')?.addEventListener('click', (e) => handleDownload(e.target.dataset.modelId || e.currentTarget.dataset.modelId));
  };

  const attachModelsPageEvents = () => {
    document.getElementById('modelsSearch')?.addEventListener('input', (e) => {
      state.filters.search = e.target.value;
      state.globalSearch = e.target.value;
      renderApp();
    });

    document.getElementById('modelsSort')?.addEventListener('change', (e) => {
      state.filters.sort = e.target.value;
      renderApp();
    });

    document.querySelectorAll('.tag-filter').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.filters.tag = btn.dataset.tag;
        renderApp();
      });
    });
  };

  const attachEvents = (route) => {
    attachSharedEvents();

    if (route.name === 'login') attachAuthEvents();
    if (route.name === 'upload') attachUploadEvents();
    if (route.name === 'models') attachModelsPageEvents();
  };

  const init = () => {
    initData();
    window.addEventListener('hashchange', renderApp);
    if (!window.location.hash) window.location.hash = '#/home';
    renderApp();
  };

  init();
})();
