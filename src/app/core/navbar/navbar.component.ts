import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { OggettoCarrelloService } from '../services/oggetto-carrello.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private authService: AuthService, private oggettoCarrelloService: OggettoCarrelloService ,private router: Router) {}
  
  usernameLogged: string = '';
  
  carrelloCount: number = 0;

  isLoading: boolean = true
  

  ngOnInit(): void {
  // Ci iscriviamo ai cambiamenti dell'utente
  this.authService.user$.subscribe(user => {
    if (user) {
      this.usernameLogged = user.username;
      this.isLoading = false;
      this.caricaConteggioIniziale();
    } else {
      this.usernameLogged = '';
      this.carrelloCount = 0;
    }
  });
  }

  // Controlla se nascondere la navbar
  isPublicPage(): boolean {
    const publicPages = ['/', '/login', '/registration', '/welcome'];
    return publicPages.includes(this.router.url);
  }

  logout(): void {
    this.authService.logout(); // Pulisce i dati nel servizio
    this.router.navigate(['/login']); // Naviga dolcemente senza reload()
  }

  private caricaConteggioIniziale() {
  this.oggettoCarrelloService.countProductInCart().subscribe({
    next: (data) => {
      // Notifichiamo il conteggio basandoci sulla lunghezza dell'array ricevuto
      this.oggettoCarrelloService.updateCount(data.length);
    },
    error: (err) => console.error("Errore nel recupero conteggio carrello", err)
  });
  }

}
