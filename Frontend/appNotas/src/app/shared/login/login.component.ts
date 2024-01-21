import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService,private router: Router) { }

  login(): void {
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        // Aquí puedes manejar la lógica después de un inicio de sesión exitoso
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
        // Aquí puedes manejar la lógica después de un inicio de sesión fallido
      }
    );
  }
}