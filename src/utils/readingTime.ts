/**
 * Calculate reading time optimized for mixed Chinese/English text.
 * Chinese: ~400 chars/min, English: ~200 words/min
 */
export function getReadingTime(text: string): number {
	const cjkChars = (
		text.match(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g) || []
	).length;
	const wordChars = text
		.replace(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g, "")
		.split(/\s+/)
		.filter(Boolean).length;
	const totalMinutes = Math.ceil(cjkChars / 400 + wordChars / 200);
	return Math.max(1, totalMinutes);
}
