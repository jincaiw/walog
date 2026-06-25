(() => {
  function getTheme(): string {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme: string) {
    const root = document.firstElementChild;
    if (!root) return;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }

  const theme = getTheme();
  setTheme(theme);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.firstElementChild?.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  }
})();
