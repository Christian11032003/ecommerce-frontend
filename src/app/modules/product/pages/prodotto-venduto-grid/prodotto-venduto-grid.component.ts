import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OggettoCarrelloService } from 'src/app/core/services/oggetto-carrello.service';
import { ProdottoService } from 'src/app/core/services/prodotto.service';
import { ProdottoVendita } from 'src/app/models/dto/Prodotto-vendita';
import { AggiungiCarrello } from 'src/app/models/dto/request/Aggiungi-Carrello';

@Component({
  selector: 'app-prodotto-venduto-grid',
  templateUrl: './prodotto-venduto-grid.component.html',
  styleUrls: ['./prodotto-venduto-grid.component.css']
})
export class ProdottoVendutoGridComponent {

  // Questa è la sorgente dati che verrà ciclata nell'HTML


    prodottiVendita: ProdottoVendita[] = []
  
    constructor(private prodottoService: ProdottoService, private oggettoCarrello: OggettoCarrelloService ,private router: Router) {}
  
    ngOnInit(): void {
      this.prodottoService.getProdottiByUtenteNotUsername().subscribe({
        next: (data) => this.prodottiVendita = data,
        error: (err) => console.error('Errore nel caricamento', err)
      });
    }

    aggiungiCarrello(request: AggiungiCarrello): void {
      this.oggettoCarrello.addToCart(request).subscribe({
      next: (res) => {
        console.log('Prodotto aggiunto al carrello:', res);
        // Aggiorniamo la quantità nel frontend senza ricaricare la pagina
        const prodotto = this.prodottiVendita.find(p => p.id === request.idProdotto);
        if (prodotto) {
        prodotto.quantita -= request.quantita;
        
        // Opzionale: se la quantità arriva a 0, potresti voler rimuovere il prodotto dalla lista
        if (prodotto.quantita <= 0) {
          this.prodottiVendita = this.prodottiVendita.filter(p => p.id !== request.idProdotto);
        }
      }
      },
      error: (err) => { // La proprietà corretta è 'error', non 'err'
        console.error("Errore durante l'aggiunta al carrello:", err);
      }
    }); // Mancava la chiusura della tonda del subscribe
  }

}
