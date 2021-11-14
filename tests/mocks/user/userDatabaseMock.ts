
import { UserModel } from "../../../src/model/User.Model";
import { userAdminMock, userNormalMock } from "./userMock";

export class UserDatabaseMock {
  
  public async createUser(user: UserModel): Promise<boolean> {
      return true
    }

  public async getUserByEmail(email: string): Promise<UserModel | boolean> {
    switch (email) {
      case "user1@gmail.com":
        return userNormalMock;
      case "user2@gmail.com":
        return userAdminMock;
      default:
        return false;
    }
  }

}