import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AggiungiCarrello } from 'src/app/models/dto/request/Aggiungi-Carrello';
import { ModificaCarrello } from 'src/app/models/dto/request/Modifica-Carrello';
import { OggettoCarrello } from 'src/app/models/dto/response/OggettoCarrello';

@Injectable({
  providedIn: 'root'
})
export class OggettoCarrelloService {

  private AUTH_API = 'http://localhost:5051/api/oggettoCarrello';

  private carrelloCount = new BehaviorSubject<number>(0);
  carrelloCount$ = this.carrelloCount.asObservable(); // La Navbar leggerà da qui

  constructor(private http: HttpClient) { }

  updateCount(count: number) {
    this.carrelloCount.next(count);
  }

  getValue(): number {
    return this.carrelloCount.getValue();
  }

  incrementCountBy(qta: number): void {
  this.carrelloCount.next(this.carrelloCount.getValue() + qta);
  }

  decrementCount(): void {
    this.carrelloCount.next(this.getValue() - 1);
  }

  public addToCart(request: AggiungiCarrello): Observable<any> {
      return this.http.post(this.AUTH_API + `/addToCart`, request);
  }

  public showProductInCart(): Observable<any>{
    return this.http.get<OggettoCarrello[]>(this.AUTH_API + '/showProductInCart');
  }

  public modifyProductInCart(request: ModificaCarrello): Observable<any>{
    return this.http.put(this.AUTH_API + '/modifyFromKart', request)
  }

  public deleteProductInCart(id: number): Observable<any>{
    return this.http.delete(this.AUTH_API + `/deleteFromKart/${id}`)
  }

  public countProductInCart(): Observable<any>{
    return this.http.get<OggettoCarrello[]>(this.AUTH_API + '/countIntoKart');
  }

  public showProductAlreadyBuy() :Observable<any>{
    return this.http.get<OggettoCarrello[]>(this.AUTH_API + '/showProductInCartTaken')
  }



}
