(() => {
	const themeBtn = document.getElementById("theme-btn");
	if (!themeBtn) return;

	const setTheme = (newTheme: string) => {
		const root = document.documentElement;
		root.setAttribute("data-theme", newTheme);
		root.classList.toggle("dark", newTheme === "dark");
		localStorage.setItem("theme", newTheme);
		themeBtn.setAttribute("aria-label", newTheme);
	};

	themeBtn.addEventListener("click", () => {
		const root = document.documentElement;
		const current = root.getAttribute("data-theme") || "light";
		setTheme(current === "dark" ? "light" : "dark");
	});

	// Sync with system preference changes
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	mediaQuery.addEventListener("change", (e) => {
		if (!localStorage.getItem("theme")) {
			setTheme(e.matches ? "dark" : "light");
		}
	});
})();
