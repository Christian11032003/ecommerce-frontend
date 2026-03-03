import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdottoService } from 'src/app/core/services/prodotto.service';
import { ProdottoDTO } from 'src/app/models/dto/Prodotto-dto';
import { Prodotto } from 'src/app/models/Prodotto';

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


  onSubmit() {
    this.prodottoService.addProdotto(this.prodottoDTO).subscribe({
      next: (res) => {
        console.log('Prodotto salvato:', res);
        alert('Prodotto aggiunto con successo!');
        // Navighiamo verso la griglia dei prodotti
        this.router.navigate(['/prodotti']); 
      },
      error: (err) => {
        console.error('Errore durante il salvataggio:', err);
        alert('Si è verificato un errore durante il caricamento del prodotto.');
      }
    });
  }
  

}
