import { Component } from '@angular/core';
import { CurrentUserService } from './service/current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean=false;

  constructor(private currentUserService: CurrentUserService, private router: Router) { }
 
  ngOnInit(): void {
     this.currentUserService.isLoggedIn.subscribe(
       (loggedIn) => {
         this.isLoggedIn = loggedIn;
       }
     );

     this.currentUserService.logoutEvent.subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
  logout(): void {
    this.currentUserService.logout();
  }
}
