import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  isLoggedIn = false;
  errorMessage = '';

  // Iniezione del servizio nel costruttore
  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      
      next: (data) => {
        this.authService.saveUser(data); // Salva i dati usando il servizio

        this.authService.updateUserStatus();

        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/i-miei-prodotti']);
        } else {
          // Se arriviamo qui, c'è un problema di sincronizzazione
          console.error('Errore: Token salvato ma isLoggedIn() restituisce false!');
        }
      },
      error: (err) => {
      console.error("Dettagli errore:", err);

      if (typeof err.error === 'string') {
        // Caso attuale: il server manda una stringa semplice
        this.errorMessage = err.error;
      } else if (err.error && err.error.message) {
        // Caso futuro: il server manda un oggetto JSON { "message": "..." }
        this.errorMessage = err.error.message;
      } else {
        // Caso di emergenza (es. server spento o errore generico)
        this.errorMessage = "Errore tecnico del server";
      }
    }
    });
  }
}

