import dayjs from "dayjs";

export function formatDatetime(date: Date): string {
	return dayjs(date).format("YYYY-MM-DD");
}
