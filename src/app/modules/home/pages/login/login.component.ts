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

        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/prodotti']);
        } else {
          // Se arriviamo qui, c'è un problema di sincronizzazione
          console.error('Errore: Token salvato ma isLoggedIn() restituisce false!');
        }
      },
      error: (err) => {
        this.errorMessage = 'Credenziali errate o server offline';
        console.error(err);
      }
    });
  }

}
