import { ShowModel, ShowOutputDTO, WeekDay } from "../../model/Show.Model";

export default interface ShowRepository {
    createShow(show: ShowModel): Promise<string>;
    getFreeTime(weekDay: WeekDay, startTime: number, endTime: number): Promise<boolean>;
    getShowByWeekDay(weekDay: WeekDay): Promise<ShowOutputDTO[]>;
}