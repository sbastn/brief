// Reference pages only: a theme switcher (System, Light, Dark) remembered per browser.
// Products set data-theme on <html> however they like; Brief only reads it.
(() => {
	const order = ['system', 'light', 'dark'];
	const read = () => { try { return localStorage.getItem('brief-theme') || 'system'; } catch { return 'system'; } };
	const apply = (theme) => {
		if (theme === 'system') document.documentElement.removeAttribute('data-theme');
		else document.documentElement.dataset.theme = theme;
	};
	apply(read());
	document.addEventListener('DOMContentLoaded', () => {
		const button = document.querySelector('[data-theme-toggle]');
		if (!button) return;
		const label = (theme) => (button.textContent = `Theme: ${theme[0].toUpperCase()}${theme.slice(1)}`);
		label(read());
		button.addEventListener('click', () => {
			const next = order[(order.indexOf(read()) + 1) % order.length];
			try { localStorage.setItem('brief-theme', next); } catch {}
			apply(next);
			label(next);
		});
	});
})();
