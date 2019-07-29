import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) { }
  fromFacebookLogin = this.userService.facebookProvider;
  _subscription = this.userService.facebookProviderChange.subscribe((value) => {
    this.fromFacebookLogin = value;
  });

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
