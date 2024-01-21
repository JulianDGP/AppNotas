import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private baseUrl = 'http://localhost:8001'
  constructor(private http: HttpClient) { }

  getNotes(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}/notes`);
 }
}
