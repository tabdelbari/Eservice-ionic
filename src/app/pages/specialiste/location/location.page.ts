import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform, Events } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  map;
  @ViewChild('mapElement') mapElement;
  marker:any;

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private geolocation: Geolocation,
    private platform:Platform,public events: Events) { }

  ngOnInit() {
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
      console.log(error);
    });
  }

  dismissPosition() {
    if(this.marker!=null)this.events.publish('position:changer', {lat : this.marker.getPosition().lat(), lng : this.marker.getPosition().lng()}, Date.now());
    this.modalController.dismiss();
  }
  reset(){
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
      console.log(error);
    });
  }


}
