import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { ModificaFeedback } from 'src/app/models/dto/request/Modifica-Feedback';

@Component({
  selector: 'app-feedback-modify',
  templateUrl: './feedback-modify.component.html',
  styleUrls: ['./feedback-modify.component.css']
})
export class FeedbackModifyComponent {

  constructor(private feedbackService: FeedbackService, private router: Router, private activatedRoute: ActivatedRoute){}
  
    request: ModificaFeedback = {
      idFeedback: this.activatedRoute.snapshot.params['id'],
      descrizione: '',
      valutazione: 0 // Inizializzato a 0 (nessuna stella)
    };
  
  
  
    modificaFeedback(){
      this.feedbackService.modifyFeedbackOnProduct(this.request).subscribe({
        next :(data) =>{
          alert("feedback modificato");
        },
        error: (errori) =>{
          console.log(errori)
          alert("feedback non inserito");
        }
      })
    }

}
