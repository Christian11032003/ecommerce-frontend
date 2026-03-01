import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prodotto } from 'src/app/models/Prodotto';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {

  private AUTH_API = 'http://localhost:5051/api/prodotti';

  constructor(private http: HttpClient) { }

  public getProdottiByUtenteUsername(): Observable<any> {
    return this.http.get<Prodotto[]>(this.AUTH_API + `/findAllProductsByUtenteUsername`);
  }
}
