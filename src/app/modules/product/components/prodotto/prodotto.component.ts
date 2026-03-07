import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Prodotto } from 'src/app/models/Prodotto';

@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrls: ['./prodotto.component.css']
})
export class ProdottoComponent implements OnInit
{

  constructor(authService: AuthService){ }
  
  ngOnInit(): void {

    
   
  }
  // Riceve il dato dal padre
  @Input() prodotto!: Prodotto;

  // Notifica al padre quando l'utente clicca su elimina
  @Output() onElimina = new EventEmitter<number>();

  @Output() onAggiungiAlCarrello = new EventEmitter<number>();

  elimina() {
    this.onElimina.emit(this.prodotto.id);
  }

  aggiungiAlCarrello(){
    this.onAggiungiAlCarrello.emit(this.prodotto.id);
  }
}

