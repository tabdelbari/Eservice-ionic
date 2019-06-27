import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Events } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  error_msg:string ="hello";
  
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,private events:Events
  ) { }
  ngOnInit() {
  }
  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }
  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  login(form: NgForm) {
    if(form.valid){
      this.authService.login(form.value.email, form.value.password, true).subscribe(
        data => {
          //this.alertService.presentToast(data["expires_at"]);
          this.events.publish('user:connected', data['user'], Date.now());
          if(data['user']["specialiste"])this.navCtrl.navigateRoot('/specialiste');
          else this.navCtrl.navigateRoot('/client');
        },
        error => {
          console.log(error);
          this.alertService.presentToast(error['error']['message']);
        },
        () => {
          this.dismissLogin();
        }
      );
    }else{
      this.alertService.presentToast("Veuillez saisir tous les champs!!");
    }
    
  }
}