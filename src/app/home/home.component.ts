import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../service/global-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  showMenu = true;
  constructor(
    private globalData: GlobalDataService
  ) { }

  ngOnInit() {
    this.mobileResponsiveness();
    this.globalData.toggleMenu.subscribe(
      response => {
        if (response === 'show') {
          this.showMenu = true;
        } else {
          this.showMenu = !this.showMenu;
        }
      }
    );
  }

  mobileResponsiveness() {
    window.addEventListener('click', (event) => {
      if (window.innerWidth < 900) {
        if (event.target['parentElement']['id'] !== 'side' &&
          event.target !== document.getElementById('side') &&
          event.target !== document.getElementById('menu')) {
          if (this.showMenu) {
            this.showMenu = false;
          }
        }
      }
    });
  }
}
