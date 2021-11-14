import { BandDatabase } from "../../data/BandDatabase";
import { ShowDatabase } from "../../data/ShowDatabase";
import BaseError from "../../error/BaseError";
import { isMarkingValid, ShowModel, ShowOutputDTO, stringToTime, stringToWeekDay } from "../../model/Show.Model";
import { IdGenerator } from "../../services/IdGenerator";

export class ShowBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private showData: ShowDatabase,
        private bandData: BandDatabase
    ){}
    async createShow(input: any): Promise<string>{
        const {start_time, end_time, band_id} = input;
    
        const week_day = stringToWeekDay(input.week_day)
        if(!week_day){
            throw new BaseError("Dia inválido", 400)
        }
        
        if  (!isMarkingValid(start_time, end_time)
            ){
            throw new BaseError("Horario inválido", 400)
        }
        if(!band_id){
            throw new BaseError("'band_id' é obrigatório", 422)
        }
        
        const existBand = await this.bandData.datailBand({
            bandId: band_id,
            bandName: ""
        })
        if(!existBand){
            throw new BaseError("'band_id' não encontrado", 404)
        }

        const freeTime = await this.showData.getFreeTime(week_day, 
            stringToTime(start_time),
            stringToTime(end_time));
        if(!freeTime){
        throw new BaseError("Horário não disponível!", 404)
        }
        const id = this.idGenerator.generate();
        const newShow = new ShowModel(
            id,
            week_day,
            Number(start_time),
            Number(end_time),
            band_id 
        )
        await this.showData.createShow(newShow)
        return "Show marcado com sucesso"
    }
    public async getShowByWeekDay(weekDay: string): Promise<ShowOutputDTO[]>{
        const week_day = stringToWeekDay(weekDay)
        if(!week_day){
            throw new BaseError("Dia inválido! Informe Sexta, Sabado ou Domingo", 400)
        }
        const result = await this.showData.getShowByWeekDay(week_day);
        return result
    }
}
