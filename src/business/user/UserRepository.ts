import { UserModel } from "../../model/User.Model";

export default interface UserRepository {
    createUser(user: UserModel): Promise<boolean>;
    getUserByEmail(email: string): Promise<UserModel| boolean>
}