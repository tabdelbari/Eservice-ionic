import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController, Events } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Demmande } from 'src/app/models/demmande';
import { AddPage } from '../add/add.page';
import { DemmandePage } from '../demmande/demmande.page';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: User;
  demmandes:Demmande[];
  

  constructor(private menu: MenuController, private authService: AuthService,private modalController: ModalController, private navCtrl: NavController,private env:EnvService,public events: Events) {
    this.menu.enable(true);
   }

  ngOnInit() {
  }
  supprimer(demmande:Demmande){
    this.authService.supprimerDemmande(demmande).subscribe();
    this.authService.mes_demmandes().subscribe(
      demmandes => {
        this.demmandes = demmandes;
      }
    );
  }
  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
    this.authService.mes_demmandes().subscribe(
      demmandes => {
        this.demmandes = demmandes;
      }
    );
    this.events.subscribe('demmande:created', (demmande, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', demmande, 'at', time);
      this.authService.mes_demmandes().subscribe(
        demmandes => {
          this.demmandes = demmandes;
        }
      );
    });
  }
  async add() {
    const addModal = await this.modalController.create({
      component: AddPage,
    });
    return await addModal.present();
  }
  async details(demmande:Demmande){
    this.env.setParam(demmande);
    const detailModal = await this.modalController.create({
      component: DemmandePage,
    });
    return await detailModal.present();
  }
}
