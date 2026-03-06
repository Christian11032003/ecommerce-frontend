import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdottoDTO } from 'src/app/models/dto/Prodotto-dto';
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

  public addProdotto(prodottoDTO: ProdottoDTO): Observable<any> {
    return this.http.post(this.AUTH_API + `/addProduct`,prodottoDTO);
  }

  public modifyProdotto(prodotto: Prodotto): Observable<any> {
    return this.http.put(this.AUTH_API + `/modifyProduct`, prodotto);
  }

  public deleteProdotto(id: number): Observable<any> {
    return this.http.delete(this.AUTH_API + `/deleteProduct/${id}`);
  }

  public getProdottoById(id: number): Observable<any> {
    return this.http.get<Prodotto>(this.AUTH_API + `/getProductById/${id}`);
  }
}
