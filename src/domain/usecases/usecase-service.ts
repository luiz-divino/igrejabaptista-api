import { UserModel, UserResponse } from "../../data/models";

export interface IUseCaseService {
  execute(request: UserModel): Promise<UserResponse | null>;
}
