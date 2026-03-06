import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdottoService } from 'src/app/core/services/prodotto.service';
import { ProdottoDTO } from 'src/app/models/dto/Prodotto-dto';

@Component({
  selector: 'app-prodotto-form',
  templateUrl: './prodotto-form.component.html',
  styleUrls: ['./prodotto-form.component.css']
})
export class ProdottoFormComponent {

  constructor(private prodottoService: ProdottoService, private router: Router) {}

  // Creiamo un oggetto prodotto vuoto coerente con il modello
  prodottoDTO: ProdottoDTO = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    quantita: 1
  };

  errori: any = {}; 
  messaggioGenerico: string = '';


  onSubmit() {
    this.prodottoService.addProdotto(this.prodottoDTO).subscribe({
      next: (res) => {
        console.log('Prodotto salvato:', res);
        alert('Prodotto aggiunto con successo!');
        // Navighiamo verso la griglia dei prodotti
        this.router.navigate(['/i-miei-prodotti']); 
      },
      error: (err) => {
         console.error('Errore durante la registrazione', err);

        // 1. Estraiamo il corpo dell'errore (gestendo se è stringa o oggetto)
        let errorBody = err.error;
        if (typeof err.error === 'string') {
          try {
            errorBody = JSON.parse(err.error);
          } catch (e) {
            console.error("Errore nel parsing del JSON", e);
          }
        }

        // 2. Gestione Errore 400 (Validazione campi)
        if (err.status === 400 && errorBody.errors) {
          this.errori = errorBody.errors;
        } 
        
        // 3. Fallback per altri errori
        else {
          this.messaggioGenerico = 'Si è verificato un errore tecnico imprevisto.';
        }
      }
    });
  }
  

}
