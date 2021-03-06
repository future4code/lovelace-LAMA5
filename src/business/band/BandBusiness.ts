import BaseError  from "../../error/BaseError";
import { UserRole } from "../../model/User.Model";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";
import BandRepository from "./BandRepository";
import { BandDetailsDTO, BandModel } from "../../model/Band.Model";


export default class BandBusiness {

     constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private bandData: BandRepository
    ) { }
    
    async registryBandBusiness (input: BandRegistryDTO, token: string): Promise<object> {
        const tokenVerify = this.authenticator.getData(token);
        
        if (!tokenVerify) {
            throw new BaseError(
                "Token inválido, expirado ou ausente da chave 'token' do cabeçalho",
                403
            );
        }
        
        if (tokenVerify.role !== UserRole.ADMIN){
            throw new BaseError(
                "Você não tem autorização para completar esta ação",
                401
            );
        }

        const {name, music_genre, responsible} = input 

        if (!name || !music_genre || !responsible){
            throw new BaseError(
                "Todos os campos são obrigatórios",
                422
            ); 
        }
        const band = await this.bandData.findByName(name);

        if (band) {
            throw new BaseError("Banda já registrada.", 401);
        }

        const id = this.idGenerator.generate()
        
        const newBand = new BandModel(
            id,
            name,
            music_genre,
            responsible
        ) 
        
        const result = await this.bandData.registryBand(newBand)

        if(result){
            return {
                message: 'Banda registrada com sucesso!'
            };            
        }else {
            throw new BaseError("Erro ao criar Banda", 400)
        }
    }

    async datailBand(input: BandDetailsDTO): Promise<BandModel | undefined>{
        
        if(!input.bandId && !input.bandName){
            throw new BaseError(
                "'bandId' ou 'bandName' não informado. Informe pelo menos um!", 422);
        }
        const result = await this.bandData.datailBand(input);
        if(!result){
            throw new BaseError("Banda não encontrada!", 404)
        }
        return result
    }
}

export interface BandRegistryDTO {
    name: string,
    music_genre: string,
    responsible: string
}