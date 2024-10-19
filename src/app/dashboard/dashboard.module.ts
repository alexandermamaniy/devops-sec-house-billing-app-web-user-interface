import {NgModule} from '@angular/core';
import {TableComponent} from './components/table/table.component';
import {Table2Component} from './components/table2/table2.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {NavbarComponent} from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    TableComponent,
    Table2Component,
    NavbarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
