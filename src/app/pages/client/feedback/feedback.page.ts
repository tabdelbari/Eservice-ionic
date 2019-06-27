import { Component, OnInit } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  //{user:user, demmande:this.demmande};
  data:any;
  feedback:number=0;

  constructor(private env:EnvService,private modalController: ModalController,private authService: AuthService,public events: Events) { 
    this.data = this.env.getParam();
  }

  ngOnInit() {
  }

  dismissFeedback(){
    this.modalController.dismiss();
  }
  setStar(i:number){
    this.feedback = i;
  }
  send(){
    if(this.feedback>0){
      this.authService.modifierDemmande(this.data['demmande']['id'],{etat:true, specialiste:this.data['user']['id'], feedback:this.feedback}).subscribe(msg =>{
        this.events.publish('demmande:created', null, Date.now());
      });
    }
    this.dismissFeedback();
  }

}
