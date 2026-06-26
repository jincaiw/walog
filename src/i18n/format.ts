export function tplStr(
	template: string,
	vars: Record<string, string | number>,
): string {
	return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
		const value = vars[key];
		return value !== undefined && value !== null ? String(value) : "";
	});
}
