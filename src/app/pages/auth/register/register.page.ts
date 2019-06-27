import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { Tag } from 'src/app/models/tag';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  specialiste:boolean = false;
  user_tags:Array<Tag> = new Array();
  tag_liste:Array<Tag> = null;

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {
    this.authService.tags().subscribe(tags =>{
      this.tag_liste = tags;
    });
   }
  ngOnInit() {
  }
  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }
  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

  register(form: NgForm) {
    if(form.valid){
      let tags_id = new Array();
      this.user_tags.forEach(element => {
        tags_id.push(element.id);
      });
      this.authService.signup(form.value.name, form.value.email, form.value.password, form.value.password_confirmation, this.specialiste, form.value.salaire, form.value.tel).subscribe(
        data => {
          console.log(data);
          
          this.authService.modifierUser({user:data['user']['id'],tags_id:tags_id}).subscribe(msg =>{
          });
          this.alertService.presentToast(data['message']);
          this.modalController.dismiss();
        },
        error => {
          console.log(error);
          this.alertService.presentToast("Valeurs entrees sont incorrectes!!\n ou email deja associe!!");
        },
        () => {
          //this.dismissRegister();
        }
      );
    }else{
      if(this.user_tags.length==0)this.alertService.presentToast("Veuillez selectionner au moins une tag!!");
      else this.alertService.presentToast("Veuillez saisir tous les champs!!");
    }
    
  }
  addTag(tag:Tag){
    this.user_tags.push(tag);
    this.tag_liste=this.tag_liste.filter((elem)=>{
      return elem.nom!=tag.nom;
    });
  }
  removeTag(tag:Tag){
    this.tag_liste.push(tag);
    this.user_tags=this.user_tags.filter((elem)=>{
      return elem.nom!=tag.nom;
    });
  }
}
