import { BaseDatabase } from "./BaseDatabase";
import { UserModel } from "../model/User.Model";
import UserRepository from '../business/user/UserRepository';

export class UserDatabase extends BaseDatabase implements UserRepository {
  constructor() {
    super('lama_users');
  }

  public async createUser(user: UserModel): Promise<boolean> {
    try {
      await this.getConnection()
        .insert({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
          role: user.getRole()
        })
        .into(this.tableName);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async getUserByEmail(email: string): Promise<UserModel | boolean> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableName)
        .where({ email });

      return UserModel.toUserModel(result[0]);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
