import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteService } from 'src/app/core/services/utente.service';
import { Utente } from 'src/app/models/Utente';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  // Inizializziamo l'oggetto con valori vuoti
  utente = {
    username: '',
    password: '',
    ruolo: 'USER' // Magari impostiamo un default
  };

  constructor(private utenteService: UtenteService, private router: Router) {}

  onSubmit(): void {
    // Non serve passare nulla, 'this.utente' è già aggiornato!
    this.utenteService.registration(this.utente).subscribe({
      next: (res) => {
        alert('Registrazione completata con successo!');
        this.router.navigate(['/login']);
        console.log(res);
      },
      error: (err) => {
        console.error('Errore durante la registrazione', err);
      }
    });
  }

}
