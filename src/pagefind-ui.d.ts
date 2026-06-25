declare module "@pagefind/default-ui" {
  interface PagefindUIProps {
    element?: string | HTMLElement;
    bundlePath?: string;
    pageSize?: number;
    resetStyles?: boolean;
    showImages?: boolean;
    showSubResults?: boolean;
    showEmptyFilters?: boolean;
    processTerm?: (term: string) => string;
    processResult?: (result: any) => any;
    debounceTimeoutMs?: number;
    mergeIndex?: boolean;
    highlightParam?: string;
  }
  export class PagefindUI {
    constructor(props: PagefindUIProps);
    triggerSearch(query: string): void;
  }
}
