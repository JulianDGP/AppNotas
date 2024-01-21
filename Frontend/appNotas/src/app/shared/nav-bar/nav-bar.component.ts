import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/service/current-user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoggedIn: boolean=false;

  constructor(private currentUserService: CurrentUserService) { }
  
  ngOnInit(): void {
      this.currentUserService.isLoggedIn.subscribe(
        (loggedIn) => {
          this.isLoggedIn = loggedIn;
        }
      );
  }
 
  logout(): void {
    this.currentUserService.logout();
  }

}
