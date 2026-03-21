import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessaggioService } from 'src/app/core/services/messaggio.service';
import { AuthService } from 'src/app/core/services/auth.service'; // <--- 1. Importa il servizio
import { Messaggio } from 'src/app/models/dto/response/Messaggio';
import { interval, Subscription, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-messaggi-personali',
  templateUrl: './messaggi-personali.component.html',
  styleUrls: ['./messaggi-personali.component.css']
})
export class MessaggiPersonaliComponent implements OnInit, OnDestroy {

  conversazioneId!: number;
  messaggi: Messaggio[] = [];
  nuovoTesto: string = '';
  messaggioInModifica: Messaggio | null = null;
  testoModifica: string = '';
  utenteLoggato: string = '';

  private pollingSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessaggioService,
    private authService: AuthService // <--- 2. Iniettalo nel costruttore
  ) {}

  ngOnInit(): void {
    this.conversazioneId = this.route.snapshot.params['id'];

    // <--- 3. Fondamentale: recupera lo username dell'utente loggato
    // Se il tuo authService ha un metodo diverso (es. getUsername() o user.username), adattalo
    this.utenteLoggato = this.authService.getUser(); 
    
    // Per sicurezza fai un log per vedere se il valore è corretto
    console.log('Utente attualmente loggato:', this.utenteLoggato);

    this.startPolling();
  }

  ngOnDestroy(): void {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  startPolling(): void {
    this.pollingSub = interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.messageService.getMessaggiByConversazione(this.conversazioneId))
      )
      .subscribe({
        next: (data) => {
          this.messaggi = data;
          // DEBUG: Controlla se il mittente del messaggio coincide con utenteLoggato
          if(this.messaggi.length > 0) {
            console.log('Mittente primo msg:', this.messaggi[0].usernameMittente);
          }
        },
        error: (err) => console.error('Errore nel polling dei messaggi', err)
      });
  }

  inviaMessaggio(): void {
    if (!this.nuovoTesto.trim()) return;

    this.messageService.inviaMessaggio({
      conversazioneId: this.conversazioneId,
      testo: this.nuovoTesto
    }).subscribe({
      next: (msg) => {
        this.messaggi.push(msg);
        this.nuovoTesto = '';
      },
      error: (err) => console.error('Errore invio messaggio', err)
    });
  }

  iniziaModifica(messaggio: Messaggio): void {
    this.messaggioInModifica = messaggio;
    this.testoModifica = messaggio.testo;
  }

  confermaModifica(): void {
    if (!this.messaggioInModifica || !this.testoModifica.trim()) return;

    this.messageService.modificaMessaggio(this.messaggioInModifica.id, {
      conversazioneId: this.conversazioneId,
      testo: this.testoModifica
    }).subscribe({
      next: (msgAggiornato) => {
        const index = this.messaggi.findIndex(m => m.id === msgAggiornato.id);
        if (index !== -1) this.messaggi[index] = msgAggiornato;
        this.annullaModifica();
      },
      error: (err) => console.error('Errore modifica messaggio', err)
    });
  }

  annullaModifica(): void {
    this.messaggioInModifica = null;
    this.testoModifica = '';
  }

  torna(): void {
    this.router.navigate(['/le-mie-conversazioni']);
  }
}