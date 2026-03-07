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
    ProdottoVendutoGridComponent
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
