import { UserModel } from "@/data/models";

export interface IUserRepository {
  save: (user: UserModel) => Promise<void>;
  findByEmail: (email: string) => Promise<UserModel | null>;
}
