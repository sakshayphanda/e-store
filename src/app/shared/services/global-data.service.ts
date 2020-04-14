import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  @Output('toggleMenu') toggleMenu = new EventEmitter();
  currentUser;
  constructor() { }
}
