import { Tag } from './tag';
import { Demmande } from './demmande';

export class User{
    id: number;
    name:string;
    email:string;
    specialiste:boolean;
    tel:string;
    salaire:number;
    excellence:number;
    avatarurl:string;
    tags:Tag[];
    interessepar:Demmande[];


    constructor(data:any){
        this.id = data.id;
        this.name = data.name;
        this.specialiste = data.specialiste;
        this.salaire = data.salaire;
        this.tel = data.tel;
        this.excellence = data.excellence;
        this.avatarurl = data.avatarurl;
        this.tags = data.tags;
        this.interessepar=data.interessepar;
    }
}