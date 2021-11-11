
import { UserModel } from "../../src/model/User.Model";
import { userAdminMock, userNormalMock } from "./userMock";

export class UserDatabaseMock {
  
  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string): Promise<void> {}

  public async getUserByEmail(email: string): Promise<UserModel | undefined> {
    switch (email) {
      case "user1@gmail.com":
        return userNormalMock;
      case "user2@gmail.com":
        return userAdminMock;
      default:
        return undefined;
    }
  }

}