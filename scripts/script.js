// theme.js
(function () {
    const THEME_KEY = 'theme-preference';
    const html = document.documentElement;

    // Aplica el tema guardado al cargar la página (antes de que se pinte, para evitar parpadeo)
    function applyTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            html.setAttribute('data-theme', theme);
        } else {
            html.removeAttribute('data-theme'); // deja que prefers-color-scheme decida
        }
    }

    // Lee la preferencia guardada (o null si nunca ha elegido manualmente)
    const savedTheme = localStorage.getItem(THEME_KEY);
    applyTheme(savedTheme);

    document.addEventListener('DOMContentLoaded', () => {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            let next;

            if (current === 'dark') {
                next = 'light';
            } else if (current === 'light') {
                next = 'dark';
            } else {
                // No hay preferencia manual todavía: alterna respecto al sistema
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                next = systemPrefersDark ? 'light' : 'dark';
            }

            applyTheme(next);
            localStorage.setItem(THEME_KEY, next);
        });
    });
})();