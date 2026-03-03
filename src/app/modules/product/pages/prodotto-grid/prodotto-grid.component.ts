import { Component, OnInit } from '@angular/core';
import { ProdottoService } from 'src/app/core/services/prodotto.service';
import { Prodotto } from 'src/app/models/Prodotto';

@Component({
  selector: 'app-prodotto-grid',
  templateUrl: './prodotto-grid.component.html',
  styleUrls: ['./prodotto-grid.component.css']
})
export class ProdottoGridComponent implements OnInit {

  // Questa è la sorgente dati che verrà ciclata nell'HTML
  prodotti: Prodotto[] = [];

  constructor(private prodottoService: ProdottoService) {}

  ngOnInit(): void {
    this.caricaProdotti();
  }

  caricaProdotti() {
    this.prodottoService.getProdottiByUtenteUsername().subscribe({
      next: (data) => this.prodotti = data,
      error: (err) => console.error('Errore nel caricamento', err)
    });
  }

  // Questa funzione viene chiamata quando il FIGLIO emette l'evento (onElimina)
  gestisciEliminazione(idDaEliminare: number) {
    if (confirm('Vuoi davvero eliminare questo prodotto?')) {
      this.prodottoService.deleteProdotto(idDaEliminare).subscribe({
        next: () => {
          // Filtriamo l'array localmente per aggiornare l'interfaccia subito
          this.prodotti = this.prodotti.filter(p => p.id !== idDaEliminare);
          console.log('Prodotto rimosso con successo');
        },
        error: (err) => alert('Errore durante l\'eliminazione')
      });
    }
  }
}