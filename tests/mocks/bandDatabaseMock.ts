import { BandModel } from "../../src/model/Band.Model";
import { bandMock } from "./bandMock";

export class bandDatabaseMock {
    public async registryBand(band: BandModel): Promise<boolean>{
        return true
    }
    public async findByName(bandName: string): Promise<BandModel[] | boolean>{
        switch (bandName){
            case "Banda 1":
                return true;
            default:
                return [bandMock];
        }
    }
}