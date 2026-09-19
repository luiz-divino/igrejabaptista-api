import { randomUUID } from "crypto";
import { Role } from "../enums/Role";
import { UserProps } from "../types/User-types";

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string | null;
  private _phone: string | null;
  private _role: Role;
  private _managed_by_id: string | null;

  private constructor(props: UserProps, id?: string) {
    this._id = id ?? randomUUID();
    this._name = props.name;
    this._email = props.email;
    this._password = props.password_hash ?? null;
    this._phone = props.phone ?? null;
    this._role = props.role ?? Role.MEMBER;
    this._managed_by_id = props.managed_by_id ?? null;
  }

  static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }
  get password(): string | null {
    return this._password;
  }
  get role(): Role {
    return this._role;
  }
  get managedById(): string | null {
    return this._managed_by_id;
  }

  get phone(): string | null {
    return this._phone;
  }
}
