import { Component } from '@angular/core';
import { ProdottoService } from 'src/app/core/services/prodotto.service';

@Component({
  selector: 'app-prodotto-comprato-grid',
  templateUrl: './prodotto-comprato-grid.component.html',
  styleUrls: ['./prodotto-comprato-grid.component.css']
})
export class ProdottoCompratoComponentGrid {

  listProdottiAcquistati: any[] = []; // Meglio usare un'interfaccia Prodotto[]
  isLoading: boolean = true;

  constructor(private prodottoService: ProdottoService) {}

  ngOnInit(): void {
    this.caricaProdotti();
  }

  caricaProdotti() {
    this.isLoading = true;
    // Qui chiami l'endpoint con il DISTINCT che abbiamo creato nel back-end
    this.prodottoService.getProdottiAlreadyTaken().subscribe({
      next: (data) => {
        this.listProdottiAcquistati = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

}
