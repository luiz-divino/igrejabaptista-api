import { Role } from "../enums/Role";

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  role?: Role;
  managedById?: string | null;
}
