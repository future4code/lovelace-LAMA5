import { Request, Response } from "express";
import { ShowBusiness } from "../business/show/ShowBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { CreateShowDTO } from "../model/Show.Model";
import { IdGenerator } from "../services/IdGenerator";

export class ShowController {
    private showBusiness: ShowBusiness;
    constructor(){
        this.showBusiness = new ShowBusiness(
            new IdGenerator(),
            new ShowDatabase(),
            new BandDatabase()
        )
    }
    async createShow(req:Request, res: Response) {
        try {
            const input: CreateShowDTO = {
                week_day: req.body.week_day,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                band_id: req.body.band_id
            }
            await this.showBusiness.createShow(input)
        } catch (error) {
            console.log(error);
            res.status(error.Code).send({ message: error.message })
        }
    }

    async getShowByWeekDay(req:Request, res: Response) {
        try {
            const week_day = req.body.week_day;
            
            await this.showBusiness.getShowByWeekDay(week_day)
        } catch (error) {
            console.log(error);
            res.status(error.Code).send({ message: error.message })
        }
    }
}