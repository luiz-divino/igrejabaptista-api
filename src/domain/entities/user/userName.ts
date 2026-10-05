import { ValidateFieldError } from "../../errors/validatefield";

export class UserName {
  constructor(private value: string) {
    if (!this.validateUserName(value))
      throw new ValidateFieldError("Invalid name");
  }
  private validateUserName(name: string) {
    if (!name) return false;
    if (!name.match(/^.+\s.+$/)) return false;
    return true;
  }

  public getValue(): string {
    return this.value;
  }
}
