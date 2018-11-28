import { AuthServiceService } from './../service/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalDataService } from './../service/global-data.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.sass']
})
export class TopNavigationComponent implements OnInit {
  user$: Observable<firebase.User>;
  constructor(private auth: AuthServiceService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user$ = this.auth.userData;

    if(this.user$) {
      this.router.navigate([''] , {
              relativeTo: this.activatedRoute
            });
    }
    // this.afAuth.authState.subscribe(
    //   state => {
    //     this.user$ = state;
    //     this.router.navigate([''] , {
    //       relativeTo: this.activatedRoute
    //     });

    //   }
    // );
  }

  logOut() {
    this.auth.logOut();

  }

}
