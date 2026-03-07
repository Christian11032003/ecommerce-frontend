import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdottoService } from 'src/app/core/services/prodotto.service';
import { Prodotto } from 'src/app/models/Prodotto';

@Component({
  selector: 'app-prodotto-venduto-grid',
  templateUrl: './prodotto-venduto-grid.component.html',
  styleUrls: ['./prodotto-venduto-grid.component.css']
})
export class ProdottoVendutoGridComponent {

  // Questa è la sorgente dati che verrà ciclata nell'HTML
    prodotti: Prodotto[] = [];
  
    constructor(private prodottoService: ProdottoService, private router: Router) {}
  
    ngOnInit(): void {
      this.caricaProdotti();
    }
  
    caricaProdotti() {
      this.prodottoService.getProdottiByUtenteNotUsername().subscribe({
        next: (data) => this.prodotti = data,
        error: (err) => console.error('Errore nel caricamento', err)
      });
    }

    aggiungiCarrello(idProdotto: any): void
    {

    }

}
