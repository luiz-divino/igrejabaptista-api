import { User } from "@/domain/entities/user-entity/User";
import { CreateUserDTO, UserResponse } from "@/data/models/user";
import { IUseCaseService } from "@/domain/usecases";
import { UserVerificationError } from "@/domain/errors/verification";
import { Role } from "@/domain/enums/Role";
import { IUserRepository } from "@data/contracts/user-repository";

export class CreateUserService implements IUseCaseService {
  constructor(private userServiceRepository: IUserRepository) {}
  async execute(request: CreateUserDTO): Promise<UserResponse | null> {
    const emailExists = await this.userServiceRepository.findByEmail(
      request.email,
    );
    if (emailExists) {
      throw new UserVerificationError();
    }
    const user = User.create({
      name: request.name,
      password: request.password,
      email: request.email,
      phone: request.phone || null,
      role: request.role || Role.MEMBER,
      managedById: request.managedById ?? null,
    });

    await this.userServiceRepository.save(user);
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }
}
