import { BaseDatabase } from "./BaseDatabase";
import { UserModel } from "../model/User.Model";

export class UserDatabase extends BaseDatabase {
  constructor(){
    super('lama_users')
  }


  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(this.tableName);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<UserModel> {
    const result = await this.getConnection()
      .select("*")
      .from(this.tableName)
      .where({ email });

    return UserModel.toUserModel(result[0]);
  }

}
