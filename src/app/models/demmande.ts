import { Tag } from './tag';
import { User } from './user';

export class Demmande{
    id: number;
    titre:string;
    description:string;
    etat:boolean;
    lat:number;
    lng:number;
    estimation:number;
    tags:Tag[];
    specialistes:User[];
    interesse:boolean;
    
    constructor(data:any){
        this.id = data.id;
        this.titre = data.titre;
        this.description = data.description;
        this.etat = data.etat;
        this.lat = data.lat;
        this.lng = data.lng;
        this.estimation = data.estimation;
        this.tags = data.tags;
        this.specialistes = data.specialistes;
        this.interesse = data.interesse;
    }
}