import { AuthServiceService } from './service/auth-service.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy {
  userDataSubscription;

  constructor(private userService: UserService, private auth: AuthServiceService, private router: Router) {
    this.userDataSubscription = this.auth.userData.subscribe(
      user => {
        if (user) {
          this.userService.save(user); // when the website is loaded we save the logged in user to the firebase database
          this.router.navigateByUrl(localStorage.getItem('returnUrl'));
          // navigating to the url we get from the local storage to the component the user is coming from
        }
      }
    );
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe(); // its important to unsubscribe a subscribed observabe when the component is destroyed
  }
}
