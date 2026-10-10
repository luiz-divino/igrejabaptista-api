import { UserModel } from "@/data/models/user";
import { Role } from "@/domain/enums/Role";
import { RowDataPacket } from "mysql2";

export interface UserMysqlRow extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  role: Role;
  managedById: string | null;
}
