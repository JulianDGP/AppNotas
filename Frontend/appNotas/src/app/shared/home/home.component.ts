import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  user: any;

  constructor(private currentUserService: CurrentUserService) { }
 
  ngOnInit(): void {
    this.user = this.currentUserService.getUser();
  }
}
