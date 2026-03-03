import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/home/pages/login/login.component';
import { ProdottoGridComponent } from './modules/product/pages/prodotto-grid/prodotto-grid.component';
import { authGuard } from './core/guard/auth.guard';
import { RegistrationComponent } from './modules/home/pages/registration/registration.component';
import { WelcomeComponent } from './modules/home/pages/welcome/welcome.component';
import { ProdottoFormComponent } from './modules/product/pages/prodotto-form/prodotto-form.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"registration", component: RegistrationComponent},
  {path:"welcome", component: WelcomeComponent},
  {path:"prodotti",component: ProdottoGridComponent, canActivate: [authGuard]},
  {path: "add-prodotto", component: ProdottoFormComponent, canActivate: [authGuard]},
  {path: "", redirectTo: "welcome", pathMatch: "full" },
  { path: "**", redirectTo: "welcome" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
