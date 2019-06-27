import { Component} from '@angular/core';
import { Demmande } from 'src/app/models/demmande';
import { EnvService } from 'src/app/services/env.service';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { FeedbackPage } from '../feedback/feedback.page';

@Component({
  selector: 'app-demmande',
  templateUrl: './demmande.page.html',
  styleUrls: ['./demmande.page.scss'],
})
export class DemmandePage {
  editing:boolean=false;
  demmande: Demmande;

  constructor(private env:EnvService,private modalController: ModalController) {
    this.demmande = this.env.getParam(); 
  }

  dismissDetails() {
    this.modalController.dismiss();
  }

  async feedback(user:User){
    let param = {user:user, demmande:this.demmande};
    this.env.setParam(param);
    const feedbackModal = await this.modalController.create({
      component: FeedbackPage,
    });
    return await feedbackModal.present();
  }


}
