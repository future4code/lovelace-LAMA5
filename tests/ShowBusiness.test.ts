import { ShowBusiness } from "../src/business/show/ShowBusiness";
import { BandDatabase } from "../src/data/BandDatabase";
import { ShowDatabase } from "../src/data/ShowDatabase";
import { BandDatabaseMock } from "./mocks/band/bandDatabaseMock";
import { IdGeneratorMock } from "./mocks/services/idGeneratorMock";
import { ShowDatabaseMock } from "./mocks/show/showDatabaseMock";

const showBusinessMock = new ShowBusiness(
    new IdGeneratorMock(),
    new ShowDatabaseMock() as ShowDatabase,
    new BandDatabaseMock() as BandDatabase
)

describe("Testing Create Show", () => {
    test("Testing invalid week_day", async ()=>{
        try {
            expect.assertions(2)
            const newShow = {
                week_day: "Segunda",
                start_time: "08:00",
                end_time: "09:00",
                band_id: "id_band_1"
            }
            
            await showBusinessMock.createShow(newShow)
        } catch (error) {
            expect(error.message).toEqual("Dia inválido");
            expect(error.code).toBe(400);
        }
    })

    test("Testing invalid start_time", async ()=>{
        try {
            expect.assertions(2)
            const newShow = {
                week_day: "Sexta",
                start_time: "07:00",
                end_time: "09:00",
                band_id: "id_band_1"
            }
            
            await showBusinessMock.createShow(newShow)
        } catch (error) {
            expect(error.message).toEqual("Horario inválido");
            expect(error.code).toBe(400);
        }
    })

    test("Testing invalid start_time", async ()=>{
        try {
            expect.assertions(2)
            const newShow = {
                week_day: "Sexta",
                start_time: "10:30",
                end_time: "09:00",
                band_id: "id_band_1"
            }
            
            await showBusinessMock.createShow(newShow)
        } catch (error) {
            expect(error.message).toEqual("Horario inválido");
            expect(error.code).toBe(400);
        }
    })
    
    test("Testing invalid end_time", async ()=>{
        try {
            expect.assertions(2)
            const newShow = {
                week_day: "Sexta",
                start_time: "08:00",
                end_time: "24:00",
                band_id: "id_band_1"
            }
            
            await showBusinessMock.createShow(newShow)
        } catch (error) {
            expect(error.message).toEqual("Horario inválido");
            expect(error.code).toBe(400);
        }
    })

    test("Testing invalid end_time", async ()=>{
        try {
            expect.assertions(2)
            const newShow = {
                week_day: "Sexta",
                start_time: "08:00",
                end_time: "18:30",
                band_id: "id_band_1"
            }
            
            await showBusinessMock.createShow(newShow)
        } catch (error) {
            expect(error.message).toEqual("Horario inválido");
            expect(error.code).toBe(400);
        }
    })

    test("Testing existing schedule", async ()=>{
        try {
            expect.assertions(2)
            const newShow = {
                week_day: "Sexta",
                start_time: "08:00",
                end_time: "09:00",
                band_id: "id_band_1"
            }
            
            await showBusinessMock.createShow(newShow)
        } catch (error) {
            expect(error.message).toEqual("Horário não disponível!");
            expect(error.code).toBe(404);
        }
    })

    test("Testing invalid band_id", async ()=>{
        try {
            expect.assertions(2)
            const newShow = {
                week_day: "Sexta",
                start_time: "08:00",
                end_time: "09:00",
                band_id: undefined
            }
            
            await showBusinessMock.createShow(newShow)
        } catch (error) {
            expect(error.message).toEqual("'band_id' é obrigatório");
            expect(error.code).toBe(422);
        }
    })

    test("Testing band_id not found", async ()=>{
        try {
            expect.assertions(2)
            const newShow = {
                week_day: "Sexta",
                start_time: "09:00",
                end_time: "10:00",
                band_id: "id_band_2"
            }
            
            await showBusinessMock.createShow(newShow)
        } catch (error) {
            expect(error.message).toEqual("'band_id' não encontrado");
            expect(error.code).toBe(404);
        }
    })

    test("Testing success in creation", async ()=>{
        try {
            expect.assertions(1)
            const newShow = {
                week_day: "Sexta",
                start_time: "09:00",
                end_time: "10:00",
                band_id: "id_band_1"
            }
            
            await jest.fn(() => { 
                showBusinessMock.createShow(newShow)
            })
            // await showBusinessMock.createShow(newShow)

            expect(showBusinessMock.createShow).toEqual("Show marcado com sucesso")
            expect(showBusinessMock.createShow).toHaveBeenCalled()
            // expect(new ShowDatabaseMock().getFreeTime).toHaveBeenCalled()
            // expect(new BandDatabaseMock().datailBand).toHaveBeenCalledTimes(1)
            // expect(new IdGeneratorMock().generate).toHaveBeenCalled()
            // 
            // expect(new ShowDatabaseMock().createShow).toHaveBeenCalled()
        } catch (error) {
            console.log(error);
            
        }
    })
})
describe("Testing getShowsByWeekDay", ()=>{
    test("Testing Week Day invalid", async()=>{
        expect.assertions(2)
        try {
            const result = await showBusinessMock.getShowByWeekDay("Segunda");
        } catch (error) {
            expect(error.message).toEqual("Dia inválido! Informe Sexta, Sabado ou Domingo")
            expect(error.code).toEqual(400)
        }
    })
    
    test("Testing Week Day valid", async()=>{
        expect.assertions(1)
        try {
            const result = await showBusinessMock.getShowByWeekDay("Sexta")
            expect(result).toContainEqual({
                    bandName: "Banda 1",
                    musicGenre: "Rock"
                })
            // expect(new ShowDatabaseMock().getShowByWeekDay(WeekDay.SEXTA)).toHaveBeenCalled()
        } catch (error) {
            console.log(error);
            
        }
    })
})