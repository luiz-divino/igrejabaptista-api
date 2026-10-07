import { Role } from "../../enums/Role";
import { UserProps } from "../../types/User-types";
import { User } from "./User";
import { UserEmail } from "./userEmail";

describe("User Entity", () => {
  const mockUser: UserProps = {
    id: "b195f587-8868-45d6-9e14-caef8e1bac74",
    name: "luiz fernando",
    email: "nando@gmail.com",
    password: "123456",
    phone: null,
    role: Role.ADMIN,
    managedById: null,
  };

  test("Should to return a new User(new Entity)", () => {
    const user = User.create(mockUser);
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined();
    expect(user.role).toBe("ADMIN");
  });

  test("Should reconstruct user preserving exact database ID and state (reconstruct entity)", () => {
    const mockUser: UserProps = {
      name: "luiz fernando",
      email: "nando@gmail.com",
      password: "123456",
      phone: null,
      role: Role.ADMIN,
      managedById: null,
    };
    const userId = "b195f587-8868-45d6-9e14-caef8e1bac74";
    const rawDbUser = {
      name: "luiz fernando",
      email: "nando@gmail.com",
      password: "123456",
      phone: null,
      role: Role.ADMIN,
      managedById: null,
    };

    const user = User.create(mockUser, userId);
    const restoredUser = User.restore(rawDbUser, userId);
    expect(restoredUser).toBeInstanceOf(User);
    expect(restoredUser.id).toEqual(user.id);
  });

  test("Should to return an User with role property member", () => {
    const user = User.create(mockUser);
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined();
    expect(user.role).toBe("ADMIN");
  });

  describe("User validation", () => {
    test("Should to return a valid email", () => {
      const email = new UserEmail("nando@gmail.com");
      const user = User.create(mockUser);
      expect(user).toBeInstanceOf(User);
      expect(user.email).toBe(email.getValue());
      expect(user.email).toBeTruthy();
    });
    test("Should to return false for invalid email", () => {
      const mockUser: UserProps = {
        name: "luiz fernando",
        email: "nando@.com",
        password: "123456",
        phone: null,
        managedById: null,
      };
      expect(() => User.create(mockUser)).toThrow();
      expect(() => new UserEmail("nando@.com")).toThrow("Invalid email");
    });
  });
});
