import { UserModel } from "@/data/models/user";

export interface IUserRepository {
  save: (user: UserModel) => Promise<void>;
  findByEmail: (email: string) => Promise<UserModel | null>;
}
