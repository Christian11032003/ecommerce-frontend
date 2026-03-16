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
      next :(data) =>{ console.log(data)
        alert("feedback inserito");
      },
      error: (errori) =>{
        console.log(errori)
        alert("feedback non inserito");
      }
    })
  }

}
