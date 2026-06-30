"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedAttempt = exports.InvalidToken = exports.InvalidInfo = void 0;
// Server Errors
class InvalidInfo extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidInfo';
        Object.setPrototypeOf(this, InvalidInfo.prototype);
    }
}
exports.InvalidInfo = InvalidInfo;
class InvalidToken extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidToken';
        Object.setPrototypeOf(this, InvalidToken.prototype);
    }
}
exports.InvalidToken = InvalidToken;
class UnauthorizedAttempt extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedAttempt';
        Object.setPrototypeOf(this, UnauthorizedAttempt.prototype);
    }
}
exports.UnauthorizedAttempt = UnauthorizedAttempt;
