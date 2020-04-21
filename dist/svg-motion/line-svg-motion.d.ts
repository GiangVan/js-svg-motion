export declare class LineSvgMotion {
    protected lineAnimations: symbol[];
    constructor();
    getLineAnimations(): symbol[];
    static drawLineGroupToVolume(dAttribute: string, element: HTMLElement, volume: number, reverse?: boolean): string;
    animateLineGroup(dAttribute: string, element: HTMLElement, { time: time, step: step, isReversed: isReversed, mode: mode }: {
        time?: number;
        step?: number;
        isReversed?: boolean;
        mode?: string;
    }, finishCallback?: () => void): symbol;
    protected calcMotionTrigonometricEquations(x: number): number;
    protected generateLineAnimationId(): symbol;
    protected removeLineAnimation(id: symbol): void;
    protected existLineAnimation(id: symbol): boolean;
    protected pushNewLineAnimation(): symbol;
    protected handleAnimationLoadingMode(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, time: number, isReversed: boolean): void;
    protected handleAnimationLoading2Mode(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, time: number, isReversed: boolean): void;
    protected handleAnimationLoading3Mode(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, time: number, isReversed: boolean): void;
    protected handleAnimationLoading4Mode(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, time: number, isReversed: boolean): void;
    protected handleAnimationCollapseMode(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, time: number, isReversed: boolean, finishCallback?: () => void): void;
    protected handleAnimationNormalMode(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, time: number, isReversed: boolean, finishCallback?: () => void): void;
    protected recursiveAnimationLineGroup(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, speed: number, currentStep: number, isExpand: any, isReversed: boolean, finishCallback?: () => void): void;
    protected static generatePointGroups(dAttribute: string): null | number[][][];
    protected static countOccurrences(text: string, search: string): number;
    protected static getRangeOf(text: string, search: string, no: number): number[] | null;
    protected static getPointsDistance(point1: number[], point2: number[]): number;
    protected static getLineLength(pointGroup: number[][]): number;
    protected static roundPoint(point: number[]): number[];
    protected static changePointGroupAtLength(pointGroup: number[][], length: number): number[][];
    protected static getPointGroupStringMissing(pointGroupString: string, pointGroupNo: number): string;
    static drawLineToVolume(pointGroup: number[][], pointGroupNo: number, dAttribute: string, element: HTMLElement, volume: number): string;
}
