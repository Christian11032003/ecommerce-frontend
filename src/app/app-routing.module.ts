import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/home/pages/login/login.component';
import { ProdottoWildcardComponent } from './modules/product/components/prodotto-wildcard/prodotto-wildcard.component';
import { authGuard } from './core/guard/auth.guard';
import { RegistrationComponent } from './modules/home/pages/registration/registration.component';
import { WelcomeComponent } from './modules/home/pages/welcome/welcome.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"registration", component: RegistrationComponent},
  {path:"welcome", component: WelcomeComponent},
  {path:"prodotti",component: ProdottoWildcardComponent, canActivate: [authGuard]},
  {path: "", redirectTo: "welcome", pathMatch: "full" },
  { path: "**", redirectTo: "welcome" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
