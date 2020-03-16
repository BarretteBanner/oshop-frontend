import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';
import { User } from '../models/user';
@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {
  userObservable: Observable<User>;
  constructor(private authService: AuthService) {
    this.userObservable = authService.userObservable;
  }
  logout() {
    this.authService.logout();
  }
}
