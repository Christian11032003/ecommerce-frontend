import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConversazioneService } from 'src/app/core/services/conversazione.service';
import { UtenteService } from 'src/app/core/services/utente.service';
import { UtenteConversazione } from 'src/app/models/dto/response/Utente-Conversazione';

@Component({
  selector: 'app-conversazione-form',
  templateUrl: './conversazione-form.component.html',
  styleUrls: ['./conversazione-form.component.css']
})
export class ConversazioneFormComponent {

  utentiDisponibili: UtenteConversazione[] = [];

  constructor(
    private utenteService: UtenteService,
    private conversationService: ConversazioneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.utenteService.getUtentiDisponibili().subscribe({
      next: (data) => this.utentiDisponibili = data,
      error: (err) => console.error('Errore nel caricamento utenti', err)
    });
  }

  creaConversazione(utenteId: number): void {
    this.conversationService.creaConversazione({ utenteDestinatarioId: utenteId }).subscribe({
      next: (conv) => this.router.navigate(['/messaggi', conv.id]),
      error: (err) => console.error('Errore nella creazione conversazione', err)
    });
  }

  torna(): void {
    this.router.navigate(['/messaggi']);
  }

}
