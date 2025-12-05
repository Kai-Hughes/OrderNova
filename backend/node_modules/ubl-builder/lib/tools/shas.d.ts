export declare class SHA256 {
    /**
     *
     * @param content string to hash
     * @param inputEncoding input encoding "utf8" | "base64" | "binary" | "hex"
     * @param outputEncoding output "utf8" | "base64" | "binary" | "hex"
     */
    getHash(content: string, inputEncoding?: any, outputEncoding?: any): string;
    getAlgorithmName(): string;
}
export declare class SHA384 {
    /**
     *
     * @param content string to hash
     * @param inputEncoding input encoding "utf8" | "base64" | "binary" | "hex"
     * @param outputEncoding output encoding "utf8" | "base64" | "binary" | "hex"
     */
    getHash(content: string, inputEncoding?: any, outputEncoding?: any): string;
    getAlgorithmName(): string;
}
export declare class SHA1 {
    /**
     *
     * @param content string to hash
     * @param inputEncoding input encoding "utf8" | "base64" | "binary" | "hex"
     * @param outputEncoding output encoding "utf8" | "base64" | "binary" | "hex"
     */
    getHash(content: string, inputEncoding?: any, outputEncoding?: any): string;
    getAlgorithmName(): string;
}
export declare class SHA512 {
    /**
     *
     * @param content string to hash
     * @param inputEncoding input encoding "utf8" | "base64" | "binary" | "hex"
     * @param outputEncoding output encoding "utf8" | "base64" | "binary" | "hex"
     */
    getHash(content: string, inputEncoding?: any, outputEncoding?: any): string;
    getAlgorithmName(): string;
}
