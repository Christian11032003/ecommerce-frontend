import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AggiungiMessaggio } from 'src/app/models/dto/request/Aggiungi-Messaggio';
import { Messaggio } from 'src/app/models/dto/response/Messaggio';

@Injectable({
  providedIn: 'root'
})
export class MessaggioService {

  private AUTH_API = 'http://localhost:5051/api/messaggio';

  constructor(private http: HttpClient) { }

  inviaMessaggio(request: AggiungiMessaggio): Observable<Messaggio>
  {
    return this.http.post<Messaggio>(this.AUTH_API +'/sendMessage', request)
  }

  modificaMessaggio(id: number, request: AggiungiMessaggio): Observable<Messaggio> {
    return this.http.put<Messaggio>(this.AUTH_API +`/modifyMessage/${id}`, request);
  }

  getMessaggiByConversazione(conversazioneId: number): Observable<Messaggio[]> {
    return this.http.get<Messaggio[]>(this.AUTH_API +`/conversation/${conversazioneId}`);
  }
}
