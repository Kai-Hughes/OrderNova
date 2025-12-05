/**
 *
 * @param items items to apply addition operation
 * @param digits digits for precision
 */
declare function addition(items: number[], digits?: number): string;
/**
 *
 * @param { number | String } value number to fix
 */
declare function fixDecimals(value: number | string, decimals?: number): string;
export { addition, fixDecimals };
