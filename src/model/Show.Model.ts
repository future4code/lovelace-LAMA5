export class ShowModel {
    constructor(
        private id: string,
        private week_day: WeekDay,
        private start_time: number,
        private end_time: number,
        private band_id: string
    ){ }
    public getId(){this.id}
    public getWeek_day(){this.week_day}
    public getStart_time(){this.start_time}
    public getEnd_time(){this.end_time}
    public getBand_id(){this.band_id}

    static toShowModel(show: any): ShowModel {
        return new ShowModel(show.id, show.week_day, show.start_time, show.end_time, show.band_id)
    }
}
export interface CreateShowDTO {
    week_day: WeekDay,
    start_time: string,  //"08:00"
    end_time: string,    //"09:00"
    band_id: string
}

export interface ShowOutputDTO {
    bandName: string,
    musicGenre: string
}

export enum WeekDay{
    SEXTA = "Sexta",
    SABADO = "Sabado",
    DOMINGO = "Domingo"
}
export const stringToWeekDay = (input: string): WeekDay | undefined => {
    
    switch(input){
        case "Sexta":
            return WeekDay.SEXTA;
        case "Sabado":
            return WeekDay.SABADO;
        case "Domingo":
            return WeekDay.DOMINGO;
        default:
            return undefined;
    }
}
export const stringToTime = (input: string): number => {  //  08:00
    const start_hours = Number(input.substr(0, 2));
    const start_minutes = Number(input.substr(3, 2));
    const result = new Date().setHours(start_hours, start_minutes)
    return result

    
}
export const isMarkingValid = (start_time: string, end_time: string): boolean => {  // "HH:MM"
    const start_hours = Number(start_time.substr(0, 2));
    const end_hours = Number(end_time.substr(0, 2));
    const start_minutes = start_time.substr(3, 2);
    const end_minutes = end_time.substr(3, 2);
    
    if( isNaN(start_hours) || isNaN(end_hours) ||
        (start_minutes !== "00") || (end_minutes !== "00") ||
        start_hours < Number("08") || end_hours > Number("23")
    ) {
        return false
    } else {
        return true
    }
    

}