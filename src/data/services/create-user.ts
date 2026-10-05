import { IuserRepository } from "../contracts";
import { User } from "../../domain/entities/user/User";
import { UserModel, UserResponse } from "../models";
import { IUseCaseService } from "../../domain/usecases";
import { UserVerificationError } from "../../domain/errors/verification";
import { Role } from "../../domain/enums/Role";

export class CreateUserService implements IUseCaseService {
  constructor(private userServiceRepository: IuserRepository) {}
  async execute(request: UserModel): Promise<UserResponse | null> {
    const emailExists = await this.userServiceRepository.findByEmail(
      request.email,
    );
    if (emailExists) {
      throw new UserVerificationError();
    }
    const user = User.create({
      id: request.id,
      name: request.name,
      password_hash: request.password,
      email: request.email,
      phone: request.phone || null,
      role: request.role || Role.MEMBER,
      managed_by_id: request.managedById ?? null,
    });

    await this.userServiceRepository.save(user);
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }
}
