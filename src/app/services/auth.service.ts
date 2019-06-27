import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Demmande } from '../models/demmande';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  current_user:User;
  token:any;
  headers: HttpHeaders;

  constructor( private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService) {}
  
  login(email: String, password: String,remember_me:boolean) {
    return this.http.post(this.env.API_URL + 'auth/login',
      {email: email, password: password, remember_me: remember_me}
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        this.current_user = token['user'];
        this.headers = new HttpHeaders({
          'Authorization': token["token_type"]+" "+token["access_token"]
        });
        return token;
      }),
    );
  }

  mes_demmandes(lat:string="",lng:string=""){
    /*const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });*/
    if(this.current_user.specialiste){
      let params = new HttpParams().set("lat", lat).set("lng", lng);
      return this.http.get<Demmande[]>(this.env.API_URL + 'demmande',{ headers: this.headers, params : params} )
      .pipe(
        tap(demmandes => {
          return demmandes;
        })
      );
    }else{
      return this.http.get<Demmande[]>(this.env.API_URL + 'demmande', { headers: this.headers })
      .pipe(
        tap(demmandes => {
          return demmandes;
        })
      );
    }
    
    
  }
  addDemmande(demmande:Demmande){//localhost/api/demmande
    /*const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    console.log(headers);
    */

    return this.http.post(this.env.API_URL + 'demmande', demmande, { headers: this.headers }).pipe(
      tap(resp => {
        return resp;
      }),
    );

  }


  signup(name: String, email: String, password: String, password_confirmation:String, specialiste:Boolean, salaire:Number, tel:String) {
    let new_user = {
      name : name,
      email : email,
      password : password,
      password_confirmation: password_confirmation,
      specialiste : specialiste,
      salaire : salaire,
      tel : tel
    };
    //console.log(new_user);
    return this.http.post(this.env.API_URL + 'auth/signup',new_user)
  }

  logout() {
    /*const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });*/
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: this.headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }
  supprimerDemmande(demmande:Demmande) {
    /*const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });*/
    return this.http.delete(this.env.API_URL + 'demmande/'+demmande.id, { headers: this.headers })
    .pipe(
      tap(data => {
        return data;
      })
    )
  }
  modifierDemmande(id,data){//localhost/api/demmande/10
    return this.http.patch(this.env.API_URL + 'demmande/'+id, data, { headers: this.headers }).pipe(
      tap(resp => {
        return resp;
      }),
    );
  }

  modifierUser(data){//localhost/api/user
    return this.http.patch(this.env.API_URL + 'user', data, { headers: this.headers }).pipe(
      tap(resp => {
        return resp;
      }),
    );
  }

  tags(){
    return this.http.get<Tag[]>(this.env.API_URL + 'tag', { headers: this.headers })
    .pipe(
      tap(data => {
        return data;
      })
    )
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }
  
  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;

        if(this.token != null) {
          this.isLoggedIn=true;
          this.current_user = this.token['user'];
          this.headers = new HttpHeaders({
            'Authorization': this.token["token_type"]+" "+this.token["access_token"]
          });
        } else {
          this.isLoggedIn=false;
          this.current_user = null;
        }
      },
      error => {
        this.token = null;
        this.current_user = null;
        this.isLoggedIn=false;
      }
    );
  }

}
