import { Component, OnInit } from '@angular/core';
import { MenuController, Events, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Demmande } from 'src/app/models/demmande';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationPage } from '../location/location.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: User;
  demmandes:Demmande[];
  lat:number;
  lng:number;

  constructor(private menu: MenuController,private geolocation: Geolocation, private authService: AuthService,public events:Events,private modalController: ModalController) { 
    this.menu.enable(true);
    this.user = authService.current_user;
  }
  ngOnInit() {
    
  }
  ionViewWillEnter() {
    this.geolocation.getCurrentPosition({enableHighAccuracy:true,timeout:1500}).then((resp)=>{  
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.authService.mes_demmandes(this.lat+"",this.lng+"").subscribe(
        demmandes => {
          this.demmandes = demmandes;
        }
      );      
    }).catch((error)=>{
      console.log(error);
    });
    
    this.events.subscribe('position:changer', (position, time) => {
      this.lat = position.lat;
      this.lng = position.lng;
      this.authService.mes_demmandes(this.lat+"",this.lng+"").subscribe(
        demmandes => {
          this.demmandes = demmandes;
        }
      );
    });
  }
  interesser(demmande:Demmande){
    this.authService.modifierDemmande(demmande.id,{}).subscribe(msg =>{
      this.events.publish('position:changer', {lat:this.lat,lng:this.lng}, Date.now());
    });
  }
  async position(){
    const addModal = await this.modalController.create({
      component: LocationPage,
    });
    return await addModal.present();
  }
}
