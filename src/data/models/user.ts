import { User } from "../../domain/entities";

export type UserModel = User;
export type UserResponse = {
    id: string,
    name: string,
    role: string
}

