import { Component, OnInit } from '@angular/core';
import { OggettoCarrelloService } from 'src/app/core/services/oggetto-carrello.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit{


  listaCarrello: any[] = [];

  constructor(private oggettoCarrelloService: OggettoCarrelloService) {}

  ngOnInit(): void {
    this.caricaCarrello();
  }

  caricaCarrello() {
  this.oggettoCarrelloService.showProductInCart().subscribe({
    next: (data) => {
      this.listaCarrello = data;
      // Ora 'data' è accessibile e il conteggio viene aggiornato
      this.oggettoCarrelloService.updateCount(data.length);
    },
    error: (err) => console.error(err)
  });
}

  // Questa funzione viene eseguita quando il figlio emette l'evento
  gestisciEliminazione(idOggettoCarrello: number) {
  this.oggettoCarrelloService.deleteProductInCart(idOggettoCarrello).subscribe({
    next: () => {
      // SOLO SE IL SERVER CONFERMA:
      // 1. Rimuovo l'oggetto dalla lista locale
      this.listaCarrello = this.listaCarrello.filter(item => item.id !== idOggettoCarrello);
      
      // 2. Notifico la Navbar del nuovo conteggio
      this.oggettoCarrelloService.updateCount(this.listaCarrello.length);
      
      console.log("Oggetto eliminato e magazzino ripristinato");
    },
    error: (err) => {
      // Se il server risponde con errore, l'oggetto resta nel carrello dell'utente
      console.error("Errore durante l'eliminazione:", err);
      alert("Non è stato possibile rimuovere l'oggetto. Riprova.");
      }
    });
  }

}
