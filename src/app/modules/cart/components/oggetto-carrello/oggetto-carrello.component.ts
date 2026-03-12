import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OggettoCarrelloService } from 'src/app/core/services/oggetto-carrello.service';

@Component({
  selector: 'app-oggetto-carrello',
  templateUrl: './oggetto-carrello.component.html',
  styleUrls: ['./oggetto-carrello.component.css']
})
export class OggettoCarrelloComponent{


  @Input() dati!: any; 
  
  // Creiamo l'evento in uscita
  @Output() onElimina = new EventEmitter<number>();

  get prodotto() {
    return this.dati.prodotto;
  }

  elimina() {
    // Emettiamo l'ID del prodotto (o dell'oggetto carrello) verso il padre
    this.onElimina.emit(this.dati.id); 
  }



}
