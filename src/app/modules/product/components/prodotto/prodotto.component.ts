import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prodotto } from 'src/app/models/Prodotto';

@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrls: ['./prodotto.component.css']
})
export class ProdottoComponent 
{

  // Riceve il dato dal padre
  @Input() prodotto!: Prodotto;

  // Notifica al padre quando l'utente clicca su elimina
  @Output() onElimina = new EventEmitter<number>();

  elimina() {
    this.onElimina.emit(this.prodotto.id);
  }
}

