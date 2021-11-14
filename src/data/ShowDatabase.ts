import ShowRepository from "../business/show/ShowRepository";
import BaseError from "../error/BaseError";
import { ShowModel, ShowOutputDTO, WeekDay } from "../model/Show.Model";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase implements ShowRepository{
    constructor(){
        super('lama_shows')
    }
    public async createShow(show: ShowModel): Promise<string>{
        try {
            await this.getConnection()
                .insert({
                    id: show.getBand_id(),
                    week_day: show.getWeek_day(),
                    start_time: show.getStart_time(),
                    end_time: show.getEnd_time(),
                    band_id: show.getBand_id()
                })
                .into(this.tableName);
                return "Show marcado com sucesso"
        } catch (error) {
            throw new BaseError("Erro ao criar show",500);
        }
    }
    public async getFreeTime(weekDay: WeekDay, startTime: number, endTime: number): Promise<boolean>{
        try {
            
            const result = await this.getConnection().raw(`
                SELECT COUNT(*) FROM ${this.tableName} 
                WHERE (week_day = ${weekDay}) AND 
                      ((start_time <= ${startTime}) AND (${startTime} >= end_time) OR
                       (start_time <= ${endTime}) AND (${endTime} <= end_time))
            `);
            if(result === 0){
                return true
            } else {
                return false
            }
            
        } catch (error) {
            throw new BaseError("Erro ao consultar show",500);
        }
    }
    public async getShowByWeekDay(weekDay: WeekDay): Promise<ShowOutputDTO[]>{
        try {
            
            const result = await this.getConnection().raw(`
                SELECT BD.name as bandName, BD.music_genre as musicGenre FROM ${this.tableName} as SW
                JOIN lama_bands BD ON BD.id ON SW.band_id
                WHERE (week_day = ${weekDay})
                ORDER BY SW.start_time
            `);
            return result[0]
            
        } catch (error) {
            throw new BaseError("Erro ao consultar show",500);
        }
    }
}