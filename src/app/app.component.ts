import { Component } from '@angular/core';
import { Platform, NavController, Events, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { User } from './models/user';
import { ProfilePage } from './pages/profile/profile.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  user:User;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,private events:Events,private modalController:ModalController
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
      //this.splashScreen.hide();
      this.authService.getToken();
      this.events.subscribe('user:connected', (user, time) => {
        this.user = user;
      });
    });
  }
  // When Logout Button is pressed 
  logout() {
    this.authService.logout().subscribe(
      data => {
        this.alertService.presentToast(data['message']);        
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/landing');
      }
    );
  }
  async profile(){
    const addModal = await this.modalController.create({
      component: ProfilePage,
    });
    return await addModal.present();
  }
}