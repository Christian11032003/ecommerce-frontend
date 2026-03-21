import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConversazioneService } from 'src/app/core/services/conversazione.service';
import { Conversazione } from 'src/app/models/dto/response/Conversazione';

@Component({
  selector: 'app-conversazioni-personali',
  templateUrl: './conversazioni-personali.component.html',
  styleUrls: ['./conversazioni-personali.component.css']
})
export class ConversazioniPersonaliComponent {

  conversazioni: Conversazione[] = [];

  constructor(
    private conversationService: ConversazioneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadConversazioni();
  }

  loadConversazioni(): void {
    this.conversationService.getConversazioni().subscribe({
      next: (data) => this.conversazioni = data,
      error: (err) => console.error('Errore nel caricamento conversazioni', err)
    });
  }

  apriConversazione(id: number): void {
    this.router.navigate(['/i-miei-messaggi', id]);
  }

  nuovaConversazione(): void {
    this.router.navigate(['/add-conversazione']);
  }

}
