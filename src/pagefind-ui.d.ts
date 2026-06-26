declare module "@pagefind/default-ui" {
	interface PagefindUIOptions {
		element?: string | HTMLElement;
		bundlePath?: string;
		pageSize?: number;
		resetStyles?: boolean;
		showImages?: boolean;
		showSubResults?: boolean;
		excerptLength?: number;
		baseUrl?: string;
		autofocus?: boolean;
	}
	export class PagefindUI {
		constructor(options: PagefindUIOptions);
	}
	export default PagefindUI;
}
