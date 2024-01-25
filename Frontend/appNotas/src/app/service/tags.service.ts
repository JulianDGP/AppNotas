import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private baseUrl = 'http://localhost:8001';
  constructor(private http: HttpClient) { }

  getAllTags(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tags`);
 }

 createTag(tagName: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/tags`, { name: tagName });
 }
}
