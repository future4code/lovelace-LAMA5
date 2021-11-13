export class BandModel {
    constructor(
        private id: string,
        private name: string,
        private music_genre: string,
        private responsible: string
    ){ }

    public getId() {this.id}
    public getName() {this.name}
    public getMusic_genere() {this.music_genre}
    public getResponsible() {this.responsible}

    static toUserModel(band: any): BandModel {
        return new BandModel(band.id, band.name, band.music_genre, band.responsible);
      }
    
}
export interface BandRegistryDTO {
    name: string,
    music_genre: string,
    responsible: string
}