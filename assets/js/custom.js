// 1. Commutateur de thème (Noir / Blanc)
(function () {
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const sunIcon = toggle.querySelector('.icon-sun');
    const moonIcon = toggle.querySelector('.icon-moon');

    function updateIcons(isDark) {
      if (sunIcon && moonIcon) {
        if (isDark) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
    }

    function isDarkTheme() {
      if (document.documentElement.classList.contains('light')) return false;
      if (document.documentElement.classList.contains('dark')) return true;
      return !window.matchMedia('(prefers-color-scheme: light)').matches;
    }

    updateIcons(isDarkTheme());

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const currentDark = isDarkTheme();
      const newTheme = currentDark ? 'light' : 'dark';
      
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(newTheme);
      try {
        localStorage.setItem('theme', newTheme);
      } catch (err) {}
      updateIcons(newTheme === 'dark');
    });
  }

  // 2. Mémorisation de la langue choisie
  function initLang() {
    const langLinks = document.querySelectorAll('.btn-lang[data-lang]');
    langLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        const lang = this.getAttribute('data-lang');
        if (lang) {
          try {
            localStorage.setItem('preferred_lang', lang);
          } catch (e) {}
        }
      });
    });
  }

  function init() {
    initTheme();
    initLang();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
