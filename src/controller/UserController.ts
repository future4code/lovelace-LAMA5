import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User.Model";
import { UserBusiness } from "../business/user/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class UserController {
    private userBusiness: UserBusiness;

    constructor(){
        this.userBusiness = new UserBusiness(
            new IdGenerator,
            new HashManager,
            new Authenticator,
            new UserDatabase
        )
    }
    

    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }

            const token = await this.userBusiness.createUser(input);

            res.status(200).send({ token });

        } catch (error) {
            res.status(error.code).send({ message: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };


            const token = await this.userBusiness.getUserByEmail(loginData);

            res.status(200).send({ token });

        } catch (error) {
            res.status(error.code).send({ message: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}