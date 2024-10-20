import {NgModule} from '@angular/core';
import {TableComponent} from './components/table/table.component';
import {Table2Component} from './components/table2/table2.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import { NavbarComponent } from './components/navbar/navbar.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {DxPieChartModule, DxVectorMapModule} from 'devextreme-angular';

@NgModule({
  declarations: [
    TableComponent,
    Table2Component,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule.forRoot(),
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    DxVectorMapModule,
    DxPieChartModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
