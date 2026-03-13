import { Component, OnInit } from '@angular/core';
import { OggettoCarrelloService } from 'src/app/core/services/oggetto-carrello.service';
import { ModificaCarrello } from 'src/app/models/dto/request/Modifica-Carrello';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  listaCarrello: any[] = [];
  
  // 1. Aggiungi la variabile di stato
  isLoading: boolean = false;

  constructor(private oggettoCarrelloService: OggettoCarrelloService) {}

  ngOnInit(): void {
    this.caricaCarrello();
  }

  caricaCarrello() {
    this.isLoading = true; // Attiva lo spinner
    this.oggettoCarrelloService.showProductInCart().subscribe({
      next: (data) => {
        this.listaCarrello = data;
        this.oggettoCarrelloService.updateCount(data.length);
        this.isLoading = false; // Disattiva lo spinner
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  gestisciEliminazione(idOggettoCarrello: number) {
    this.isLoading = true; // Opzionale: attiva lo spinner anche durante l'eliminazione
    this.oggettoCarrelloService.deleteProductInCart(idOggettoCarrello).subscribe({
      next: () => {
        this.listaCarrello = this.listaCarrello.filter(item => item.id !== idOggettoCarrello);
        this.oggettoCarrelloService.updateCount(this.listaCarrello.length);
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Errore durante l'eliminazione:", err);
        alert("Errore nella rimozione.");
        this.isLoading = false;
      }
    });
  }
}
