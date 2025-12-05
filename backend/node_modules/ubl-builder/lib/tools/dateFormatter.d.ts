interface Options {
    timezone?: string;
}
/**
 *
 * @param ts
 * @param options
 */
declare function decomposeTime(ts: number, options?: Options): {
    year: any;
    monthStr: string;
    month: string;
    week: any;
    dayOfWeek: any;
    dayOfWeekStr: string;
    dayOfYear: any;
    dayOfMonth: string;
    hourOfDay: string;
    minute: string;
    second: string;
    milliseconds: string;
};
export { decomposeTime };
