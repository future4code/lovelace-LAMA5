import BandBusiness from "../src/business/band/BandBusiness";
import { UserRole } from "../src/model/User.Model";
import { Authenticator } from "../src/services/Authenticator";
import { AuthenticatorMock } from "./mocks/services/authenticatorMock";
import { BandDatabaseMock } from "./mocks/band/bandDatabaseMock";
import { bandMock } from "./mocks/band/bandMock";
import { IdGeneratorMock } from "./mocks/services/idGeneratorMock";


const BandBusinessMock = new BandBusiness(
    new IdGeneratorMock(),
    new AuthenticatorMock() as Authenticator,
    new BandDatabaseMock()
)
describe("Testing registryBandBusiness", ()=>{
    
    test("Testing error token Empty or with invalid token", async ()=>{
        expect.assertions(2);
        try {
            const newBandDTO = {
                name:"Dinosouros do Rock",
                music_genre:"Rock",
                responsible: "Samyr"
            };
            
            await BandBusinessMock.registryBandBusiness(
                newBandDTO,
                ""
            )
        } catch (error) {
            expect(error.message).toEqual("Token inválido, expirado ou ausente da chave 'token' do cabeçalho");
            expect(error.code).toBe(403);
        }
    })

    test("Testing error with normal role token", async ()=>{
        expect.assertions(2);
        try {
            const newBandDTO = {
                name:"Dinosouros do Rock",
                music_genre:"Rock",
                responsible: "Samyr"
            };
            const tokenInvalid: string = new AuthenticatorMock().generateToken({
                id: "id_user_1",
                role: UserRole.NORMAL
            });
            await BandBusinessMock.registryBandBusiness(
                newBandDTO,
                tokenInvalid
            )
        } catch (error) {
            expect(error.message).toEqual("Você não tem autorização para completar esta ação");
            expect(error.code).toBe(401);
        }
    })

    test("Testing error with invalid fields", async ()=>{
        expect.assertions(2);
        try {
            const newBandDTO = {
                name:"",
                music_genre:"Rock",
                responsible: "Samyr"
            };
            const tokenValid: string = new AuthenticatorMock().generateToken({
                id: "id_user_2",
                role: UserRole.ADMIN
            });
            await BandBusinessMock.registryBandBusiness(
                newBandDTO,
                tokenValid
            )
        } catch (error) {
            expect(error.message).toEqual("Todos os campos são obrigatórios");
            expect(error.code).toEqual(422);
        }
    })

    test("Testing error with existing band", async ()=>{
        expect.assertions(2);
        try {
            const newBandDTO = {
                name:"Banda 1",
                music_genre:"Rock",
                responsible: "Samyr"
            };
            const tokenValid: string = new AuthenticatorMock().generateToken({
                id: "id_user_2",
                role: UserRole.ADMIN
            });
            await BandBusinessMock.registryBandBusiness(
                newBandDTO,
                tokenValid
            )
        } catch (error) {
            expect(error.message).toEqual("Banda já registrada.");
            expect(error.code).toEqual(401);
        }
    })

    test("Testing successfully on registry", async ()=>{
        expect.assertions(1);
        try {
            const newBandDTO = {
                name:"Banda 2",
                music_genre:"Rock",
                responsible: "Samyr"
            };
            const tokenValid: string = new AuthenticatorMock().generateToken({
                id: "id_user_2",
                role: UserRole.ADMIN
            });
            const result = await BandBusinessMock.registryBandBusiness(
                newBandDTO,
                tokenValid
            )
            expect(result).toBe(true);
            
        } catch (error) {
            console.log(error)
        }
    })
    
})
describe("Testing band datalis", ()=>{
    test("Testing error empty fields", async ()=>{
        expect.assertions(2);
        try {
            
            await BandBusinessMock.datailBand({
                    bandId: "",
                    bandName: ""
                })
        } catch (error) {            
            expect(error.message).toEqual("'bandId' ou 'bandName' não informado. Informe pelo menos um!");
            expect(error.code).toBe(422);
        }
    })
    test("Testing error band not found", async () =>{
        try {
            expect.assertions(2);
            await BandBusinessMock.datailBand({
                bandId: "Banda 2",
                bandName: ""
            })
        } catch (error) {
            expect(error.message).toEqual("Banda não encontrada!");
            expect(error.code).toBe(404)
        }
    })
    test("Testing get ok", async ()=>{
        expect.assertions(1)
        try {
            const result = await BandBusinessMock.datailBand({
                bandId: "id_band_1",
                bandName: ""
            })
            expect(result).toEqual(bandMock)
        } catch (error) {
            console.log(Error);
            
        }
    })
})