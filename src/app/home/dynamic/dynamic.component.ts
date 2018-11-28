import { AuthServiceService } from './../../service/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.sass']
})
export class DynamicComponent implements OnInit {

  currentUserDetails;
  constructor(private auth: AuthServiceService) { }


  ngOnInit() {
  this.auth.userData.subscribe(
    user => {
      this.currentUserDetails = user;
    }
  );
  }

}
