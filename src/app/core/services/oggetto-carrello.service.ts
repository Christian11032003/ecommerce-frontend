import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AggiungiCarrello } from 'src/app/models/dto/request/Aggiungi-Carrello';

@Injectable({
  providedIn: 'root'
})
export class OggettoCarrelloService {

  private AUTH_API = 'http://localhost:5051/api/oggettoCarrello';

  constructor(private http: HttpClient) { }

  public addToCart(aggiungiCarrello: AggiungiCarrello): Observable<any> {
      return this.http.post(this.AUTH_API + `/findAllProductsByUtenteUsername`, aggiungiCarrello);
  }



}
