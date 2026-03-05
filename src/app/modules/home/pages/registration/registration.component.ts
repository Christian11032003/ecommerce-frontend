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
    nome: '',
    cognome: '',
    email: '',
    username: '',
    password: '',
    ruolo: 'USER' // Magari impostiamo un default
  };

  // Qui salviamo gli errori: chiave = nome campo, valore = messaggio
  errori: any = {}; 
  messaggioGenerico: string = '';

  constructor(private utenteService: UtenteService, private router: Router) {}

  onSubmit(): void {
    // Reset degli errori ad ogni tentativo
    this.errori = {};
    this.messaggioGenerico = '';

    this.utenteService.registration(this.utente).subscribe({
      next: (res) => {
        alert('Registrazione completata con successo!');
        this.router.navigate(['/login']);
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
        // 3. Gestione Errore 409 (Email/User già esistente)
        else if (err.status === 409) {
          this.messaggioGenerico = errorBody.message || 'Utente già esistente.';
        } 
        // 4. Fallback per altri errori
        else {
          this.messaggioGenerico = 'Si è verificato un errore tecnico imprevisto.';
        }
      }
    });
  }
}

