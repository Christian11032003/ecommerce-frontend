import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { AggiungiFeedback } from 'src/app/models/dto/request/Aggiungi-Feedback';
import { Feedback } from 'src/app/models/dto/response/Feedback';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent {

  constructor(private feedbackService: FeedbackService, private router: Router, private activatedRoute: ActivatedRoute){}

  request: AggiungiFeedback = {
    idProdotto: +this.activatedRoute.snapshot.params['id'],
    descrizione: '',
    valutazione: 0 // Inizializzato a 0 (nessuna stella)
  };



  aggiungiFeedback(){
    this.feedbackService.insertFeedback(this.request).subscribe({
      next :(data) =>{
        alert("feedback inserito");
      },
      error: (err) =>{
        if (err.status === 400) {
        // MESSAGGIO RAPIDO COME DICEVI TU
        alert("Attenzione: hai già recensito questo prodotto. Puoi solo modificarlo.");
        this.router.navigate(['/prodotti-acquistati']);
        // Magari qui lo mandi alla pagina di modifica
        }
      }
    })
  }

  modificaFeedback(){
    this.feedbackService.insertFeedback(this.request).subscribe({
      next :(data) =>{ console.log(data)
        alert("feedback modificato");
      },
      error: (errori) =>{
        console.log(errori)
        alert("feedback non inserito");
      }
    })
  }

}
