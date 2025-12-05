import { IDictionary } from '../generics/IDictionary';
import { IXsdAnySimpleType } from './IXsdAnySimpleType';
export default class XsdAnySimpleType implements IXsdAnySimpleType {
    content: string | number | boolean;
    attributes: IDictionary<string>;
    /**
     * @param content Simple content as string
     */
    constructor(content: string | number | boolean, attributes?: any);
    parseToJson(): any;
    validateContent(): void;
    private applyAttributes;
}
