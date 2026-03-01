import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/home/pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { ProdottoWildcardComponent } from './modules/product/components/prodotto-wildcard/prodotto-wildcard.component';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { RegistrationComponent } from './modules/home/pages/registration/registration.component';
import { WelcomeComponent } from './modules/home/pages/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProdottoWildcardComponent,
    RegistrationComponent,
    WelcomeComponent
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
