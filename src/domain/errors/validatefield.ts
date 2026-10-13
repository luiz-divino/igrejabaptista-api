export class ValidateFieldError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidateFieldError";
  }
}
