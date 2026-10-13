import { User } from "@/domain/entities/user-entity/User";
import { UserMysqlRow } from "../contracts/IUser-mapper";

export class UserMapper {
  toDomain(row: UserMysqlRow) {
    return User.restore(
      {
        name: row.name,
        email: row.email,
        phone: row.phone,
        password: row.password,
        role: row.role,
        managedById: row.managedById,
      },
      row.id,
    );
  }
}
