
import { IuserRepository } from "../contracts";
import { User } from "../../domain/entities";
import { UserModel, UserResponse } from "../models";
import { IUseCase } from "../../domain/usecases";
import { UserVerificationError } from "../../domain/errors";

export class CreateUserService implements IUseCase<UserModel, UserResponse > {
  constructor(private userServiceRepository: IuserRepository) {}
  async execute(request: UserModel): Promise<UserResponse> {

    const emailExists = await this.userServiceRepository.findByEmail(request.email);
    if(emailExists){
        throw new UserVerificationError();
    }

    const user = User.create({
      name: request.name,
      password_hash: request.password,
      email: request.email,
      phone: request.phone ?? "",
      role: request.role,
      managed_by_id: request.managedById,
    });
    await this.userServiceRepository.save(user);
    return {
      id: request.id,
      name: request.name,
      role: request.role,
    };
  }
}
