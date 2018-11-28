import { AuthServiceService } from './../service/auth-service.service';
import { GlobalDataService } from './../service/global-data.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthServiceService, private globalData: GlobalDataService) { }

  ngOnInit() {

  }

  login() {
    this.auth.login();
  }

}
