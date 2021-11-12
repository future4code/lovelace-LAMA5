import { UserBusiness } from "../src/business/user/UserBusiness";
import { UserDatabase } from "../src/data/UserDatabase";
import { Authenticator } from "../src/services/Authenticator";
import { HashManager } from "../src/services/HashManager";
import { AuthenticatorMock } from "./mocks/authenticatorMock";
import { HashManagerMock } from "./mocks/hashManagerMock";
import { IdGeneratorMock } from "./mocks/idGeneratorMock";
import { UserDatabaseMock } from "./mocks/userDatabaseMock";

const userBusinessMock = new UserBusiness(
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock() as Authenticator,
    new UserDatabaseMock() as UserDatabase
)

describe("Testing SignupBusiness", () => {
    test("Should return error if name is empty", async () => {
        expect.assertions(2);
        try {
            const newUser = {
                name: "",
                email: "rafael.email.com",
                password: "12345678",
                role: "normal"
            };

            await userBusinessMock.createUser(newUser);
        } catch (error) {
            expect(error.message).toEqual("Todos os campos são obrigatórios");
            expect(error.statusCode).toBe(422);
        }
    });

    test("Should return error if email is invalid", async () => {
        expect.assertions(2);
        try {
            const newUser = {
                name: "Rafael",
                email:"rafael.email.com",
                password: "12345678",
                role: "normal"
            };


            await userBusinessMock.createUser(newUser);
        } catch (error) {
            expect(error.message).toEqual("'email' Inválido.");
            expect(error.statusCode).toBe(422);
        }
    });

    test("Should return error if password is invalid", async () => {
        expect.assertions(2);
        try {
            const newUser = {
                name: "Rafael",
                email: "rafael@email.com",
                password: 321,
                role: "normal"
            };

            await userBusinessMock.createUser(newUser);
        } catch (error) {
            expect(error.message).toEqual("É necessário um 'password' entre 8 e 40 caracteres.");
            expect(error.statusCode).toBe(406);
        }
    });
})