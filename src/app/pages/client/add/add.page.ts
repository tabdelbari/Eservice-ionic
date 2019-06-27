import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, ModalController, Platform, Events } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Demmande } from 'src/app/models/demmande';
import { Tag } from 'src/app/models/tag';
declare var google;

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements AfterViewInit{
  msg:string="";
  demmande_tags:Array<Tag> = new Array();
  tag_liste:Array<Tag> = null;
  demmande:Demmande;
  map;
  @ViewChild('mapElement') mapElement;
  marker:any;


  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private geolocation: Geolocation,
    private platform:Platform,public events: Events) {

    this.authService.tags().subscribe(tags =>{
      console.log(tags);
      
      this.tag_liste = tags;
    });
      
  }
  ngAfterViewInit(){
    this.geolocation.getCurrentPosition({enableHighAccuracy:true,timeout:1500}).then((resp)=>{
      this.map = new google.maps.Map(this.mapElement.nativeElement,{
        center:{lat:resp.coords.latitude, lng:resp.coords.longitude},
        zoom:10
      });
      this.marker = new google.maps.Marker({
        position: {lat:resp.coords.latitude, lng:resp.coords.longitude},
        map: this.map,
        draggable:true,
        title:"You are here!"
      });
    }).catch((error)=>{
      this.msg = error.message;
    });
  }

  dismissAdd() {
    this.modalController.dismiss();
  }

  add(form: NgForm) {
    if(form.valid && this.demmande_tags.length>0){
      let tags_id = new Array();
      this.demmande_tags.forEach(element => {
        tags_id.push(element.id);
      });
      this.demmande = new Demmande({
        titre : form.value.titre,
        description : form.value.description,
        estimation : form.value.estimation,
        lat : this.marker.getPosition().lat(),
        lng : this.marker.getPosition().lng()
      });
      this.authService.addDemmande(this.demmande).subscribe(
        data => {
          this.alertService.presentToast(data["message"]);
          //console.log("test: "+data['data']['id']+ {tags_id : tags_id});
          let body = {tags_id : tags_id};
          this.authService.modifierDemmande(data['data']['id'],body).subscribe(msg =>{
            this.events.publish('demmande:created', this.demmande, Date.now());
          });
          this.modalController.dismiss();
        },
        error => {
          console.log(error);
          this.alertService.presentToast(error['error']['message']);
        },
        () => {
          this.modalController.dismiss();
        }
      );
      //this.demmande.tags = [];
      /*this.authService.login(form.value.email, form.value.password, true).subscribe(
        data => {
          this.alertService.presentToast(data["expires_at"]);
          if(data["specialiste"])this.navCtrl.navigateRoot('/specialiste');
          else this.navCtrl.navigateRoot('/client');
        },
        error => {
          console.log(error);
        },
        () => {
          this.dismissAdd();
        }
      );*/
    }else{
      this.alertService.presentToast("Veuillez saisir tous les champs!! \net Selectionner au moins une tag!!");
    }
    
  }
  addTag(tag:Tag){
    this.demmande_tags.push(tag);
    this.tag_liste=this.tag_liste.filter((elem)=>{
      return elem.nom!=tag.nom;
    });
  }
  removeTag(tag:Tag){
    this.tag_liste.push(tag);
    this.demmande_tags=this.demmande_tags.filter((elem)=>{
      return elem.nom!=tag.nom;
    });
  }
}
