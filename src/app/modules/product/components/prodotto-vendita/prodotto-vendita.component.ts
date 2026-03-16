import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { ProdottoVendita } from 'src/app/models/dto/Prodotto-vendita';
import { AggiungiCarrello } from 'src/app/models/dto/request/Aggiungi-Carrello';

@Component({
  selector: 'app-prodotto-vendita',
  templateUrl: './prodotto-vendita.component.html',
  styleUrls: ['./prodotto-vendita.component.css']
})
export class ProdottoVenditaComponent {

  // Riceve il dato dal padre
  @Input() prodottoVendita!: ProdottoVendita;

  //quantità scelta
  @Input() quantitaSelezionata: number = 1;

  @Output() onAggiungiAlCarrello = new EventEmitter<AggiungiCarrello>();

  constructor(private router: Router){}

  aggiungiAlCarrello(){
  
    // Verifichiamo che la quantità sia valida prima di inviare
    if (this.quantitaSelezionata > 0) {
      this.onAggiungiAlCarrello.emit({
        idProdotto: this.prodottoVendita.id,
        quantita: this.quantitaSelezionata
      });
    } else {
      console.warn("Seleziona almeno una unità");
    }
  }


}
