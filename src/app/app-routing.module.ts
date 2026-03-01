import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/home/pages/login/login.component';
import { ProdottoWildcardComponent } from './modules/product/components/prodotto-wildcard/prodotto-wildcard.component';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"prodotti",component: ProdottoWildcardComponent, canActivate: [authGuard]},
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
