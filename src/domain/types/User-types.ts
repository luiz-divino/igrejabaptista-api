import { Role } from "../enums/Role";

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password_hash: string;
  phone?: string | null;
  role?: Role;
  managed_by_id?: string | null;
}
