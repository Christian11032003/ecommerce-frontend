import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProdottoVendita } from 'src/app/models/dto/Prodotto-vendita';
import { Prodotto } from 'src/app/models/Prodotto';

@Component({
  selector: 'app-prodotto-comprato',
  templateUrl: './prodotto-comprato.component.html',
  styleUrls: ['./prodotto-comprato.component.css']
})
export class ProdottoCompratoComponent {

  constructor(authService: AuthService){ }
    
    // Riceve il dato dal padre
    @Input() prodottoVendita!: ProdottoVendita;
  

}
