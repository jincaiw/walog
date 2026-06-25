declare module "remark-collapse" {
	import type { Plugin } from "unified";
	interface RemarkCollapseOptions {
		test: string | RegExp;
	}
	const remarkCollapse: Plugin<[RemarkCollapseOptions]>;
	export default remarkCollapse;
}
