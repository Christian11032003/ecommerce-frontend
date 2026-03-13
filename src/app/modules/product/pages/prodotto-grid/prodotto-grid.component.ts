import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdottoService } from 'src/app/core/services/prodotto.service';
import { Prodotto } from 'src/app/models/Prodotto';

@Component({
  selector: 'app-prodotto-grid',
  templateUrl: './prodotto-grid.component.html',
  styleUrls: ['./prodotto-grid.component.css']
})
export class ProdottoGridComponent implements OnInit {

  // Array dei prodotti da visualizzare
  prodotti: Prodotto[] = [];
  
  // Stato per il caricamento
  isLoading: boolean = true;

  constructor(
    private prodottoService: ProdottoService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.caricaProdotti();
  }

  /**
   * Recupera i prodotti dell'utente loggato dal backend
   */
  caricaProdotti(): void {
    this.isLoading = true; // Attiviamo lo spinner prima della chiamata
    
    this.prodottoService.getProdottiByUtenteUsername().subscribe({
      next: (data) => {
        this.prodotti = data;
        this.isLoading = false; // Caricamento completato con successo
      },
      error: (err) => {
        console.error('Errore nel caricamento prodotti:', err);
        this.isLoading = false; // Fermiamo lo spinner anche in caso di errore
      }
    });
  }

  /**
   * Naviga alla pagina di modifica per un prodotto specifico
   */
  modificaProdotto(id: number): void {
    this.router.navigate(['/modify-product', id]);
  }

  /**
   * Gestisce l'evento di eliminazione emesso dal componente figlio
   * @param idDaEliminare ID del prodotto da rimuovere
   */
  gestisciEliminazione(idDaEliminare: number): void {
    if (confirm('Vuoi davvero eliminare questo prodotto?')) {
      // Opzionale: potresti mettere un altro spinner specifico per l'eliminazione qui
      this.prodottoService.deleteProdotto(idDaEliminare).subscribe({
        next: () => {
          // Aggiornamento ottimistico della UI: filtriamo l'array locale
          this.prodotti = this.prodotti.filter(p => p.id !== idDaEliminare);
          console.log('Prodotto rimosso con successo');
        },
        error: (err) => {
          console.error('Errore durante l\'eliminazione:', err);
          alert('Errore durante l\'eliminazione del prodotto. Riprova più tardi.');
        }
      });
    }
  }

  
}