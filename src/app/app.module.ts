import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/home/pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { ProdottoGridComponent } from './modules/product/pages/prodotto-grid/prodotto-grid.component';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { RegistrationComponent } from './modules/home/pages/registration/registration.component';
import { WelcomeComponent } from './modules/home/pages/welcome/welcome.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ProdottoComponent } from './modules/product/components/prodotto/prodotto.component';
import { ProdottoFormComponent } from './modules/product/pages/prodotto-form/prodotto-form.component';
import { ProdottoModificaFormComponent } from './modules/product/pages/prodotto-modifica-form/prodotto-modifica-form.component';
import { ProdottoVendutoGridComponent } from './modules/product/pages/prodotto-venduto-grid/prodotto-venduto-grid.component';
import { ProdottoVenditaComponent } from './modules/product/components/prodotto-vendita/prodotto-vendita.component';
import { CarrelloComponent } from './modules/cart/pages/carrello/carrello.component';
import { OggettoCarrelloComponent } from './modules/cart/components/oggetto-carrello/oggetto-carrello.component';
import { FeedbackFormComponent } from './modules/feedback/pages/feedback-form/feedback-form.component';
import { ProdottoCompratoComponent } from './modules/product/components/prodotto-comprato/prodotto-comprato.component';
import { ProdottoCompratoComponentGrid } from './modules/product/pages/prodotto-comprato-grid/prodotto-comprato-grid.component';
import { FeedbackOfProductComponent } from './modules/feedback/pages/feedback-of-product/feedback-of-product.component';
import { FeedbackModifyComponent } from './modules/feedback/pages/feedback-modify/feedback-modify.component';
import { ConversazioneFormComponent } from './modules/messaggio/pages/conversazione-form/conversazione-form.component';
import { ConversazioniPersonaliComponent } from './modules/messaggio/pages/conversazioni-personali/conversazioni-personali.component';
import { MessaggiPersonaliComponent } from './modules/messaggio/pages/messaggi-personali/messaggi-personali.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProdottoGridComponent,
    RegistrationComponent,
    WelcomeComponent,
    NavbarComponent,
    ProdottoComponent,
    ProdottoFormComponent,
    ProdottoModificaFormComponent,
    ProdottoVendutoGridComponent,
    ProdottoVenditaComponent,
    CarrelloComponent,
    OggettoCarrelloComponent,
    FeedbackFormComponent,
    ProdottoCompratoComponent,
    ProdottoCompratoComponentGrid,
    FeedbackOfProductComponent,
    FeedbackModifyComponent,
    ConversazioneFormComponent,
    ConversazioniPersonaliComponent,
    MessaggiPersonaliComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
