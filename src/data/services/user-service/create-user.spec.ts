import { test, expect, vi, type Mocked } from "vitest";
import { IUserRepository } from "@/data/contracts/user-repository";
import { User } from "@/domain/entities/user-entity/User";
import { Role } from "@/domain/enums/Role";
import { CreateUserService } from "./create-user";

test("Should to return a throw if user already exists", async () => {
  const userMockServiceRepository: Mocked<IUserRepository> = {
    save: vi.fn(),
    findByEmail: vi.fn(),
  };
  const userService = new CreateUserService(userMockServiceRepository);

  const userRestored = User.restore(
    {
      name: "luiz fernando",
      email: "nando@gmail.com",
      password: "123456",
      phone: null,
      role: Role.ADMIN,
      managedById: null,
    },
    "31013873-05eb-46a1-b95f-bee8227c14d0",
  );

  const userReturnMocked =
    userMockServiceRepository.findByEmail.mockResolvedValue(userRestored);
  await expect(
    userService.execute({
      name: "luiz fernando",
      email: "nando@gmail.com",
      password: "123456",
      phone: null,
      role: Role.ADMIN,
      managedById: null,
    }),
  ).rejects.toThrow();
});
