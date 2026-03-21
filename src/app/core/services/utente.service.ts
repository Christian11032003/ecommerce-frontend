import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from 'src/app/models/Utente';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private AUTH_API = 'http://localhost:5051/api/utente';

  constructor(private http: HttpClient) { }

  public registration(utente: Utente): Observable<any> {
    return this.http.post(this.AUTH_API + '/registrazione', utente, { responseType: 'text' });
  }

  public getUtentiDisponibili(): Observable<any>{
    return this.http.get(this.AUTH_API + '/findUtentiDisponibili');
  }
}
