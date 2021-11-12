import { UserDatabase } from "../../data/UserDatabase";
import BaseError from "../../error/BaseError";
import { UserInputDTO, LoginInputDTO, UserRole, UserModel } from "../../model/User.Model";
import { Authenticator } from "../../services/Authenticator";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/IdGenerator";
import { isEmail, passwdLength } from "../../utils/helpers";


export class UserBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private userData: UserDatabase
    ) { }

    async createUser(input: UserInputDTO) {

        const { name, email, password } = input;
        let { role } = input;

        if (!name || !email || !password) {
            throw new BaseError("Todos os campos são obrigatórios", 422);
        }

        if (!isEmail(email)) {
            throw new BaseError("'email' Inválido.", 422);
        }

        if (!passwdLength(password)) {
            throw new BaseError(
                "É necessário um 'password' entre 8 e 40 caracteres.",
                406
            );
        }

        if (!role) {
            role = UserRole.NORMAL;
        }

        role = role.toUpperCase();
        if (!(role in UserRole)) {
            throw new BaseError(
                "'role' Inválido. É possível criar somente users 'ADMIN' e 'NORMAL'.",
                406
            );
        }

        const user = await this.userData.getUserByEmail(email);

        if (user) {
            throw new BaseError("Email já cadastrado.", 401);
        }

        const id = this.idGenerator.generate();

        const newUser = new UserModel(
            id,
            name,
            email,
            this.hashManager.hash(password),
            role as UserRole,
        );

        const result = await this.userData.createUser(newUser);

        const token = this.authenticator.generateToken({ id, role });

        if (result === false) {
            throw new BaseError(
                'Oops! Ocorreu um error inesperado. Tente novamente mais tarde',
                400
            );
        } else {
            return {
                message: 'Usuário cadastrado com sucesso!',
                token,
            };
        }
    };


    async getUserByEmail(input: LoginInputDTO) {
        const { email, password } = input;

        if (!email || !password) {
            throw new BaseError('Todos os campos são obrigatórios', 422);
        }

        if (!isEmail(email)) {
            throw new BaseError('`email` Inválido.', 401);
        }

        const user = await this.userData.getUserByEmail(email) as UserModel;

        if (!user) {
            throw new BaseError('Usuário não encontrado.', 401);
        }

        if (!this.hashManager.compare(password, user.getPassword())) {
            throw new BaseError('`email` ou `senha` Inválidos.', 401);
        }

        const token = this.authenticator.generateToken({ id: user.getId(), role: user.getRole() });

        return {
            token
        };
    }
}