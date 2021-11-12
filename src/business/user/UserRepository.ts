import { UserModel } from "../../model/User.Model";

export default interface userRepository {
    createUser(id: string,
               email: string,
               name: string,
               password: string,
               role: string): Promise<void>;

    getUserByEmail(email: string): Promise<UserModel>
}