import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8001';
  private username: string = '';

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded'
    });
 
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
 
    return this.http.post(`${this.baseUrl}/login`, body.toString(), { headers, responseType: 'text' });
 }

 setUsername(username: string): void {
  this.username = username;
}

getUsername(): string {
  return this.username;
}
  }
