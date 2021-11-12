import BandRepository from "../business/band/BandRepository";
import BaseError from "../error/BaseError";
import { BandModel } from "../model/Band.Model";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase implements BandRepository {
    constructor(){
        super('lama_bands')
    }

    public async registryBand(band: BandModel): Promise<boolean>{
        try {
            await this.getConnection()
                .insert(band)
                .into(this.tableName);


            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


     public async findByName(bandName: string): Promise<BandModel[] | boolean>{
        try {
            const result = await this.getConnection()
            .select("*")
            .from(this.tableName)
            .where({name: bandName})
                
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }


}