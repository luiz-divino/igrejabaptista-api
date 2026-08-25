import { Role } from "../enums/Role";

export interface UserProps {
  name: string;
  email?: string | null;
  password_hash?: string | null;
  phone?: string | null;
  role: Role;
  managed_by_id?: string | null;
}