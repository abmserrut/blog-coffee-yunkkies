(function () {
  var root = document.documentElement;
  var themeToggle = document.querySelector(".theme-toggle");
  var scrollTopButton = document.querySelector(".scroll-top");
  var storageKey = "coffee-yunkkies-theme";

  function readStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function writeStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function getPreferredTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function updateThemeButton(theme) {
    if (!themeToggle) {
      return;
    }

    var nextLabel =
      theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro";

    themeToggle.setAttribute("aria-label", nextLabel);
    themeToggle.setAttribute("title", nextLabel);
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    updateThemeButton(theme);
  }

  function initTheme() {
    var storedTheme = readStoredTheme();
    var initialTheme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : getPreferredTheme();

    applyTheme(initialTheme);

    if (!themeToggle) {
      return;
    }

    themeToggle.addEventListener("click", function () {
      var nextTheme =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";

      applyTheme(nextTheme);
      writeStoredTheme(nextTheme);
    });
  }

  function updateScrollTopVisibility() {
    if (!scrollTopButton) {
      return;
    }

    if (window.scrollY > 500) {
      scrollTopButton.classList.add("is-visible");
      return;
    }

    scrollTopButton.classList.remove("is-visible");
  }

  function initScrollTop() {
    if (!scrollTopButton) {
      return;
    }

    updateScrollTopVisibility();

    window.addEventListener("scroll", updateScrollTopVisibility, {
      passive: true,
    });

    scrollTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  initTheme();
  initScrollTop();
})();
