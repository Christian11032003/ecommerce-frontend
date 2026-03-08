import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdottoService } from 'src/app/core/services/prodotto.service';
import { ProdottoVendita } from 'src/app/models/dto/Prodotto-vendita';

@Component({
  selector: 'app-prodotto-venduto-grid',
  templateUrl: './prodotto-venduto-grid.component.html',
  styleUrls: ['./prodotto-venduto-grid.component.css']
})
export class ProdottoVendutoGridComponent {

  // Questa è la sorgente dati che verrà ciclata nell'HTML


    prodottiVendita: ProdottoVendita[] = []
  
    constructor(private prodottoService: ProdottoService, private router: Router) {}
  
    ngOnInit(): void {
      this.prodottoService.getProdottiByUtenteNotUsername().subscribe({
        next: (data) => this.prodottiVendita = data,
        error: (err) => console.error('Errore nel caricamento', err)
      });
    }

    aggiungiCarrello(idProdotto: any): void
    {

    }

}
