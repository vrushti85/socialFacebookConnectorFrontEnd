import { Injectable } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private socialAuthService: AuthService, private http: HttpClient, private router: Router) { }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData, typeof (userData));
        localStorage.setItem('data', JSON.stringify(userData));
        localStorage.setItem('token',userData.token);
        this.http.post("http://localhost:5000/api/addDataFromProvider", userData)
          .subscribe(res => {
            this.router.navigate(['home']);
          }) 
      });
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  onLogout() {
    this.socialAuthService.signOut();
    localStorage.clear();
  }
}
