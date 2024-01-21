import { Component } from '@angular/core';
import { CurrentUserService } from './service/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean=false;

  constructor(private currentUserService: CurrentUserService) { }
 
  ngOnInit(): void {
     this.currentUserService.isLoggedIn.subscribe(
       (loggedIn) => {
         this.isLoggedIn = loggedIn;
       }
     );
  }}
