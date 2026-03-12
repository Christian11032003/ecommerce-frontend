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

  constructor(private authService: AuthService,private oggettoCarrelloService: OggettoCarrelloService ,private router: Router) {}
  
  usernameLogged: string = '';
  
  carrelloCount: number = 0;
  

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {

      const user = this.authService.getUser();
      console.log(user);
      this.usernameLogged = user.username;

      this.oggettoCarrelloService.carrelloCount$.subscribe(count => {
      this.carrelloCount = count; 
      });
      // Qui potresti anche chiamare un servizio per ottenere il numero di prodotti nel carrello
    }
  }

  // Controlla se nascondere la navbar
  isPublicPage(): boolean {
    const publicPages = ['/', '/login', '/registration', '/welcome'];
    return publicPages.includes(this.router.url);
  }

  logout(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
