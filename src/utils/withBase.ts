export function getAssetPath(path: string): string {
	const base = import.meta.env.BASE_URL;
	const basePath = base.endsWith("/") ? base.slice(0, -1) : base;
	return `${basePath}/${path}`;
}

export function stripBase(path: string): string {
	const base = import.meta.env.BASE_URL;
	if (base && path.startsWith(base)) {
		return path.slice(base.length - 1) || "/";
	}
	return path;
}

export function stripLocale(path: string, locale: string): string {
	const prefix = `/${locale}`;
	if (path.startsWith(prefix)) {
		return path.slice(prefix.length) || "/";
	}
	return path;
}
