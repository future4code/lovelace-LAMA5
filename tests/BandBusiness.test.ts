import BandBusiness from "../src/business/band/BandBusiness";
import { Authenticator } from "../src/services/Authenticator";
import { AuthenticatorMock } from "./mocks/authenticatorMock";
import { bandDatabaseMock } from "./mocks/bandDatabaseMock";
import { bandMock } from "./mocks/bandMock";
import { IdGeneratorMock } from "./mocks/idGeneratorMock";


const BandBusinessMock = new BandBusiness(
    new IdGeneratorMock(),
    new AuthenticatorMock() as Authenticator,
    new bandDatabaseMock()
)
describe("Testing registryBandBusiness", ()=>{
    test("Testing token validity", async ()=>{
        try {
            const newBand = {
                name:"",
                music_genre:"Rock",
                responsible: "Samyr"
            };
            await BandBusinessMock.registryBandBusiness(
                newBand,
                
            )
        } catch (error) {
            
        }
    })
})