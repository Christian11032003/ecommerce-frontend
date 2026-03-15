import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private AUTH_API = 'http://localhost:5051/api/feedback';

  constructor(private http: HttpClient) { }
}
