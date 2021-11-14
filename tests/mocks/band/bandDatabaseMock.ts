import { BandDetailsDTO, BandModel } from "../../../src/model/Band.Model";
import { bandMock } from "./bandMock";

export class BandDatabaseMock {
    public async registryBand(band: BandModel): Promise<boolean>{
        return true
    }
    public async findByName(bandName: string): Promise<BandModel[] | boolean>{
        switch (bandName){
            case "Banda 1":
                return [bandMock];;
            default:
                return false
        }
    }
    public async datailBand(input: BandDetailsDTO): Promise<BandModel | undefined>{

        if((input.bandId === "id_band_1") || (input.bandName === "Banda 1")){
            return bandMock
        } else {
            return undefined
        }
        
    }
}