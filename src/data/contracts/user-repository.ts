import { UserModel } from "@/data/models";

export interface IuserRepository {
  save: (user: UserModel) => Promise<void>;
  findByEmail: (email: string) => Promise<UserModel | null>;
}
