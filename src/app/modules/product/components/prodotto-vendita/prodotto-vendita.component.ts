import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProdottoVendita } from 'src/app/models/dto/Prodotto-vendita';

@Component({
  selector: 'app-prodotto-vendita',
  templateUrl: './prodotto-vendita.component.html',
  styleUrls: ['./prodotto-vendita.component.css']
})
export class ProdottoVenditaComponent {

  // Riceve il dato dal padre
  @Input() prodottoVendita!: ProdottoVendita;

  //quantità scelta
  @Input() quantitaSelezionata!: number

  @Output() onAggiungiAlCarrello = new EventEmitter<number>();

  aggiungiAlCarrello(){
    this.onAggiungiAlCarrello.emit(this.prodottoVendita.id);
  }

}
