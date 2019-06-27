import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://127.0.0.1/api/';

  param:any=null;

  constructor(private plt:Platform) {
    /*if(this.plt.is('android')){
      this.API_URL = 'http://10.0.2.2/api/';
    }*/
   }

  setParam(data:any){
    this.param = data;
  }
  getParam():any{
    return this.param;
  }
}
