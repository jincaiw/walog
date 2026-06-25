import type { Translation } from "./types";
import { zh } from "./lang/zh";

const translations: Record<string, Translation> = {
	"zh-CN": zh,
	zh: zh,
};

export function useTranslations(locale: string): Translation {
	return translations[locale] ?? zh;
}
