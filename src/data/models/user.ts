import { User } from "@/domain/entities/user-entity/User";
import { Role } from "@/domain/enums/Role";

export type UserResponse = {
  id: string;
  name: string;
  role: string;
};

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  role?: Role;
  managedById?: string | null;
}
export type UserModel = User;
