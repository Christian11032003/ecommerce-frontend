import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { Feedback } from 'src/app/models/dto/response/Feedback';

@Component({
  selector: 'app-feedback-of-product',
  templateUrl: './feedback-of-product.component.html',
  styleUrls: ['./feedback-of-product.component.css']
})
export class FeedbackOfProductComponent implements OnInit {

  feedbacks: Feedback[] = [];
  idProdotto!: number;

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit(): void {
    // Recuperiamo l'ID del prodotto dall'URL
    this.idProdotto = this.route.snapshot.params['id'];
    this.caricaFeedback();
  }

  caricaFeedback() {
    // Supponendo che tu abbia un metodo nel service che accetta l'ID prodotto
    this.feedbackService.showAllFeedbackOnProduct(this.idProdotto).subscribe({
      next: (data) => {
        this.feedbacks = data;
      },
      error: (err) => console.error("Errore nel caricamento feedback", err)
    });
  }

  // Funzione helper per creare un array di stelle da ciclare nell'HTML
  getStars(rating: number) {
    return new Array(rating);
  }

}
