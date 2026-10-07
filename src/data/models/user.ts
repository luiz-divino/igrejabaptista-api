import { User } from "@/domain/entities/user-entity/User";

export type UserResponse = {
  id: string;
  name: string;
  role: string;
};

export type UserModel = User;
