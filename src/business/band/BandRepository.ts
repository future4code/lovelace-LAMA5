import { BandDetailsDTO, BandModel } from "../../model/Band.Model";

export default interface BandRepository {
    registryBand(band: BandModel): Promise<boolean>
    findByName(name: string): Promise<BandModel[] | boolean>
    datailBand(input: BandDetailsDTO): Promise<BandModel | undefined>
}