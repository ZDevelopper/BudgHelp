import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { GestionComponent } from './gestion/gestion.component';

const appRoutes: Routes = [
  { path: 'connexion', component: SigninComponent },
  { path: 'inscription', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gestion', component: GestionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
