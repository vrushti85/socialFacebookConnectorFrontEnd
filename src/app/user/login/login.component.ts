import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService, private http: HttpClient) { }
  
  private loggedIn: boolean;
  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.loggedIn = (user != null);
    });
  }

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
        console.log(userData.token);
        localStorage.setItem('data',JSON.stringify(userData));
        this.http.post("http://localhost:2000/api/resData", userData)
          .subscribe(res => {
            console.log("msg from api",res);
          });
      });
  }
  onLogout(){
    this.socialAuthService.signOut();
    localStorage.clear();
  }
}