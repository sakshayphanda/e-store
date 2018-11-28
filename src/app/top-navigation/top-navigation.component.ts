import { AdminAuthGuardService } from './../service/admin-auth-guard.service';
import { AuthServiceService } from './../service/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalDataService } from './../service/global-data.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/internal/Observable';
import { observable } from 'rxjs';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.sass']
})
export class TopNavigationComponent implements OnInit {
  user$: Observable<firebase.User>;
  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private adminAuthGuardService: AdminAuthGuardService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user$ = this.auth.userData;

    this.auth.appUser.subscribe( // checking if the logged in user has isLogged in key as true(ie he is an admin)
      user => {
        if(user.isAdmin) {
          this.adminAuthGuardService.adminEmail = true;
        }
      }
    );
    if (this.user$) { // if there is a logged in user take him to the dynamic component
      this.router.navigate([''] , {
              relativeTo: this.activatedRoute
            });
    }
    }

  logOut() {
    this.auth.logOut(); // logging out of the application
    window.location.reload(); // reloading the webpage when the logout is clicked
  }

}
