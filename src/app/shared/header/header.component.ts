import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private router: Router) { }

  fromFacebookLogin = this.userService.facebookProvider;
  _subscription = this.userService.facebookProviderChange.subscribe((value) => {
    this.fromFacebookLogin = value;
  });

  ngOnInit() { }

  facebookLogIn() {
    this.userService.socialSignIn("facebook");
  }

  logout() {
    localStorage.removeItem("data");
    localStorage.clear();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}