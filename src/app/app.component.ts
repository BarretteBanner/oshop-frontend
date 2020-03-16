import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  authServiceSubscription: Subscription;

  constructor(
    private authService: AuthService,
    router: Router,
    private userService: UserService
  ) {
    this.authServiceSubscription = authService.firebaseUserObservable.subscribe(
      user => {
        if (user) {
          userService.save(user);

          let returnUrl = localStorage.getItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    );
  }

  ngOnDestroy() {
    this.authServiceSubscription.unsubscribe();
  }
}
