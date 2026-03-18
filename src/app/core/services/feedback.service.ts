import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AggiungiFeedback } from 'src/app/models/dto/request/Aggiungi-Feedback';
import { ModificaFeedback } from 'src/app/models/dto/request/Modifica-Feedback';
import { Feedback } from 'src/app/models/dto/response/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private AUTH_API = 'http://localhost:5051/api/feedback';

  constructor(private http: HttpClient) { }

  public insertFeedback(request: AggiungiFeedback): Observable<any>{
      return this.http.post(this.AUTH_API + '/insertFeedback', request);
  }

  public showAllFeedbackOnProduct(id: number): Observable<any>{
    return this.http.get<Feedback[]>(this.AUTH_API +`/findAllFeedbackByProdotto/${id}`);
  }

  public modifyFeedbackOnProduct(request: ModificaFeedback): Observable<any>{
    return this.http.put(this.AUTH_API + '/modifyFeedback', request);
  }


}
