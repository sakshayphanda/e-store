import { AuthServiceService } from '../../service/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }

  ngOnInit() {

  }

  login() {
    this.authService.login();
  }

}
