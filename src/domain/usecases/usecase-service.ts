import { CreateUserDTO, UserResponse } from "@/data/models/user";

export interface IUseCaseService {
  execute(request: CreateUserDTO): Promise<UserResponse | null>;
}
