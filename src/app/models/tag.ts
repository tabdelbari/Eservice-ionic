export class Tag{
    id:number;
    nom: string;
    
    constructor(data:any){
        this.id = data.id;
        this.nom = data.nom;
    }
}