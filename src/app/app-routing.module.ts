import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path:'dashboard',
    component:DashboardComponent,
    loadChildren:() =>import('./dashboard/dashboard.module').then(x=>x.DashboardModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    CommonModule,
    BrowserModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
