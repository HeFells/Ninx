window.NinxHelpers = (() => {
  dayjs.extend(window.dayjs_plugin_relativeTime);

  const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return '—';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
  };

  const escapeHtml = (unsafe) =>
    String(unsafe)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  const markdownToHtml = (markdown = '') => {
    const escaped = escapeHtml(markdown);
    return escaped
      .replace(/^### (.*)$/gim, '<h3>$1</h3>')
      .replace(/^## (.*)$/gim, '<h2>$1</h2>')
      .replace(/^# (.*)$/gim, '<h1>$1</h1>')
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\n\n/gim, '</p><p>')
      .replace(/\n/gim, '<br/>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  };

  const uid = () =>
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const isValidEmail = (email) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(String(email).toLowerCase());

  const relativeTime = (isoDate) => dayjs(isoDate).fromNow();

  return {
    formatBytes,
    escapeHtml,
    markdownToHtml,
    uid,
    isValidEmail,
    relativeTime,
  };
})();
