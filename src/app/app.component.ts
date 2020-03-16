import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  authServiceSubscription: Subscription;

  constructor(private authService: AuthService, router: Router) {
    this.authServiceSubscription = authService.userObservable.subscribe(
      user => {
        if (user) {
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
