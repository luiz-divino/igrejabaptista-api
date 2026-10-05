import { Role } from "../../enums/Role";
import { UserProps } from "../../types/User-types";
import { User } from "./User";
import { UserEmail } from "./userEmail";

describe("User Entity", () => {
  test("Primeiro teste", () => {
    const nome = "Nando";
    expect(nome).toBe("Nando");
  });

  test("Should to return a new User(new Entity)", () => {
    const mockUser: UserProps = {
      name: "luiz fernando",
      email: "nando@gmail.com",
      password_hash: "123456",
      phone: null,
      role: Role.ADMIN,
      managed_by_id: null,
    };
    const user = User.create(mockUser);
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined();
    console.log(user.id);
    expect(user.role).toBe("ADMIN");
  });

  test("Should reconstruct user preserving exact database ID and state (reconstruct entity)", () => {
    const mockUser: UserProps = {
      name: "luiz fernando",
      email: "nando@gmail.com",
      password_hash: "123456",
      phone: null,
      role: Role.ADMIN,
      managed_by_id: null,
    };
    const user = User.create(mockUser);
    const restoredUser = User.restore(mockUser, user.id);
    expect(restoredUser).toBeInstanceOf(User);
    expect(restoredUser.id).toBe(user.id);
  });

  test("Should to return an User with role property member", () => {
    const mockUser: UserProps = {
      name: "luiz fernando",
      email: "nando@gmail.com",
      password_hash: "123456",
      phone: null,
      managed_by_id: null,
    };
    const user = User.create(mockUser);
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined();
    expect(user.role).toBe("MEMBER");
  });

  describe("User validation", () => {
    test("Should to return a valid email", () => {
      const email = new UserEmail("nando@gmail.com");
      const mockUser: UserProps = {
        name: "luiz fernando",
        email: email.getValue(),
        password_hash: "123456",
        phone: null,
        managed_by_id: null,
      };
      const user = User.create(mockUser);
      expect(user).toBeInstanceOf(User);
      expect(user.email).toBe(email.getValue());
      expect(user.email).toBeTruthy();
    });
    test("Should to return false for invalid email", () => {
      const mockUser: UserProps = {
        name: "luiz fernando",
        email: "nando@.com",
        password_hash: "123456",
        phone: null,
        managed_by_id: null,
      };
      expect(() => User.create(mockUser)).toThrow();
      expect(() => new UserEmail("nando@.com")).toThrow("Invalid email");
    });
  });
});
