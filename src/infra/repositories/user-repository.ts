import { IuserRepository } from "../../data/contracts";
import { UserModel } from "../../data/models";

export class UserRepository implements IuserRepository {
    private database: UserModel[] = [];
    async save(user: UserModel):Promise<void>{
        this.database.push(user);
    }
    async findByEmail(email: string): Promise<UserModel | null>{
      const user = this.database.find(item => item.email === email);
      return user || null;
    }

}