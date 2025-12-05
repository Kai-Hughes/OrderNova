import XsdAnySimpleType from './XsdAnySimpleType';
/**
 * xsd:boolean
 * The type xsd:boolean represents logical yes/no values.
 * The valid values for xsd:boolean are true, false, 0, and 1.
 * Values that are capitalized (e.g. TRUE) or abbreviated (e.g. T) are not valid.
 * More info http://www.datypic.com/sc/xsd/t-xsd_boolean.html
 */
export declare class XsdBoolean extends XsdAnySimpleType {
    constructor(content: string | boolean, attributtes?: any);
    validateContent(): void;
}
