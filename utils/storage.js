window.NinxStorage = (() => {
  const KEYS = {
    USERS: 'ninx_users',
    MODELS: 'ninx_models',
    CURRENT_USER: 'ninx_current_user',
    THEME: 'ninx_theme',
  };

  const read = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  return {
    KEYS,
    read,
    write,
    remove: (key) => localStorage.removeItem(key),
  };
})();
