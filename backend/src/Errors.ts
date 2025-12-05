// Server Errors
export class InvalidInfo extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidInfo';
    Object.setPrototypeOf(this, InvalidInfo.prototype);
  }
}

export class InvalidToken extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidToken';
    Object.setPrototypeOf(this, InvalidToken.prototype);
  }
}

export class UnauthorizedAttempt extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedAttempt';
    Object.setPrototypeOf(this, UnauthorizedAttempt.prototype);
  }
}
