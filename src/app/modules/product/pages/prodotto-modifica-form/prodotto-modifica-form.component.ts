import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdottoService } from 'src/app/core/services/prodotto.service';
import { ProdottoDTO } from 'src/app/models/dto/Prodotto-personale';
import { Prodotto } from 'src/app/models/Prodotto';

@Component({
  selector: 'app-prodotto-modifica-form',
  templateUrl: './prodotto-modifica-form.component.html',
  styleUrls: ['./prodotto-modifica-form.component.css']
})
export class ProdottoModificaFormComponent implements OnInit {

  constructor(private prodottoService: ProdottoService, private router: Router, private activatedRoute: ActivatedRoute) {}

  prodotto!: Prodotto;


  ngOnInit(): void 
  {
    this.prodottoService.getProdottoById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (data) => this.prodotto = data,
      error: (err) => console.error('Errore nel caricamento del prodotto')
    });
  }

    errori: any = {}; 
    messaggioGenerico: string = '';

    onSubmit(){
      console.log(this.prodotto)
      this.prodottoService.modifyProdotto(this.prodotto).subscribe({
        next: (res) => {
          this.prodotto = res
          console.log('Prodotto modificato:', res);
          this.router.navigate(["/i-miei-prodotti"]);
        },
        error: (err) => {
           // 1. Estraiamo il corpo dell'errore (gestendo se è stringa o oggetto)
           console.log(err)
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
          
          // 3. Fallback per altri errori
          else {
            this.messaggioGenerico = 'Si è verificato un errore tecnico imprevisto.';
          }
        }
    })
    };

}
