import BaseError from "../../../src/error/BaseError";
import { ShowModel, ShowOutputDTO, WeekDay } from "../../../src/model/Show.Model";

export class ShowDatabaseMock {
    public async createShow(show: ShowModel): Promise<string>{
        return "Show marcado com sucesso!"
    }
    public async getFreeTime(weekDay: WeekDay, startTime: number, endTime: number): Promise<boolean>{
        
        if (!((weekDay === WeekDay.SEXTA) && 
                ((new Date().setHours(8,0) <= startTime && startTime < new Date().setHours(9,0)) || 
                 (new Date().setHours(8,0) <= endTime && endTime <= new Date().setHours(9,0))
                ))
           ) {
                return true
             } else {
                 
                 return false
             }
    }

    public async getShowByWeekDay(weekDay: WeekDay): Promise<ShowOutputDTO[]>{
        try {
            
            const result = [
                {
                    bandName: "Banda 1",
                    musicGenre: "Rock"
                },
                {
                    bandName: "Banda 2",
                    musicGenre: "Pagode"
                },
                {
                    bandName: "Banda 3",
                    musicGenre: "Eletrônico"
                },
            ]
            
            return result
            
        } catch (error) {
            throw new BaseError("Erro ao consultar show",500);
        }
    }
}