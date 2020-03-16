import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.firebaseUserObservable
      .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()))
      .pipe(map(appUser => appUser.isAdmin));
  }
}
