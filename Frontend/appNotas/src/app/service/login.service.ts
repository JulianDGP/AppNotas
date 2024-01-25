import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8001';
  public loginEvent = new EventEmitter<void>();
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post(`${this.baseUrl}/login`, body.toString(), { headers }).pipe(
      map(user => {
        // Almacena los detalles del usuario en el almacenamiento local
        localStorage.setItem('user', JSON.stringify(user));
        this.loginEvent.emit();
        return user;
      })
    );
  }
}
