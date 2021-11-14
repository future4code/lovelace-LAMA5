import { Request, Response } from "express";
import {BandRegistryDTO} from "../business/band/BandBusiness"
import BandBusiness from "../business/band/BandBusiness"
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";


export default class BandController {
    private bandBusiness: BandBusiness;

    constructor() {
        this.bandBusiness = new BandBusiness(
                new IdGenerator(),
                new Authenticator(),
                new BandDatabase()
            );
    }


    async registry(req: Request, res: Response) {
        try {
            const token = req.headers.token as string

            const input: BandRegistryDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }

            const result = await this.bandBusiness.registryBandBusiness(input, token);

            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(error.Code).send({ message: error.message })
        }
    }
    async datailBand(req: Request, res: Response) {
        try {
            const { bandId, bandName} = req.body;
            const result = this.bandBusiness.datailBand({bandId, bandName});
            res.status(201).send(result)
        } catch (error) {
            console.log(error);
            res.status(error.Code).send({ message: error.message })
        }
    }
}