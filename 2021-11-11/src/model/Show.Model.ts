
export class ShowModel {
    constructor(
        private id: string,
        private week_day: string,
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