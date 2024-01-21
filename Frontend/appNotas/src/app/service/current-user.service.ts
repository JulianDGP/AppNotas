import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, pipe, tap } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public logoutEvent = new EventEmitter<void>();

  constructor(private loginService: LoginService) {
    this.loginService.loginEvent.subscribe(() => {
      this._isLoggedIn.next(true);
    });
  }
  
  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    console.log('User from local storage:', parsedUser);
    return parsedUser;
   }

 setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
 }

 login(username: string, password: string): Observable<any> {
  return this.loginService.login(username, password).pipe(
    tap(() => {
      this._isLoggedIn.next(true);
    })
  );
}

logout(): void {
  localStorage.removeItem('user');
  this._isLoggedIn.next(false);
  this.logoutEvent.emit();
}
}
