import type { UIStrings } from "./types";

export { tplStr } from "./format";

const modules = import.meta.glob<{ default: UIStrings }>("./lang/*.ts", {
	eager: true,
});

const translations: Record<string, UIStrings> = {};
for (const [path, mod] of Object.entries(modules)) {
	const locale = path.slice("./lang/".length, -".ts".length);
	translations[locale] = mod.default;
}

export function useTranslations(locale: string = "zh-CN"): UIStrings {
	const lang = locale.split("-")[0];
	return (
		translations[locale] ??
		translations[lang] ??
		translations["zh"] ??
		Object.values(translations)[0]
	);
}
