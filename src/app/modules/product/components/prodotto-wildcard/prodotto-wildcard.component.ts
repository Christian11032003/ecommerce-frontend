import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProdottoService } from 'src/app/core/services/prodotto.service';
import { Prodotto } from 'src/app/models/Prodotto';

@Component({
  selector: 'app-prodotto-wildcard',
  templateUrl: './prodotto-wildcard.component.html',
  styleUrls: ['./prodotto-wildcard.component.css']
})
export class ProdottoWildcardComponent implements OnInit {

  prodotti: Prodotto[] = [];
  
  ngOnInit(): void {
    this.getProdottiByUtenteUsername();
  }

  constructor(private prodottoService: ProdottoService, private authService: AuthService, private router: Router){}

  getProdottiByUtenteUsername() {
    this.prodottoService.getProdottiByUtenteUsername().subscribe({
      next: (response) => {
        this.prodotti = response as Prodotto[];
        console.log(this.prodotti);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
