import { ValidateFieldError } from "../../errors/validatefield";

export class UserEmail {
  constructor(private value: string) {
    if (!this.validateUserEmail(value))
      throw new ValidateFieldError("Invalid email");
  }
  private validateUserEmail(email: string) {
    if (!email) return false;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return false;
    return true;
  }

  public getValue(): string {
    return this.value;
  }
}
