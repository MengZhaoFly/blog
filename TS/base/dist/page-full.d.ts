export declare function beFull(el?: HTMLElement, options?: FullscreenOptions): Promise<void>;
export declare function exitFull(): Promise<void>;
export declare function isFull(el: HTMLElement | EventTarget): boolean;
export declare function toggleFull(el?: HTMLElement, options?: FullscreenOptions): Promise<void>;
export declare function watchFull(el: HTMLElement, callback: (isFull: boolean) => void): {
    cancel: () => void;
};
