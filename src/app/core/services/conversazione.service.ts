import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AggiungiConversazione } from 'src/app/models/dto/request/Aggiungi-Conversazione';
import { Conversazione } from 'src/app/models/dto/response/Conversazione';

@Injectable({
  providedIn: 'root'
})
export class ConversazioneService {

  private AUTH_API = 'http://localhost:5051/api/conversazione';

  constructor(private http: HttpClient) { }

  creaConversazione(request: AggiungiConversazione): Observable<Conversazione>
  {
    return this.http.post<Conversazione>(this.AUTH_API +`/addConversation`, request)
  }

  getConversazioni(): Observable<Conversazione[]>{
    return this.http.get<Conversazione[]>(this.AUTH_API +`/findMyConversation`)
  }
  
}
