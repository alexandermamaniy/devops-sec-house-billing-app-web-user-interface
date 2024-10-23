import {NgModule} from '@angular/core';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {GroupComponent} from './components/group/group.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import { NavbarComponent } from './components/navbar/navbar.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {DxPieChartModule, DxVectorMapModule} from 'devextreme-angular';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import { ExpensesComponent } from './components/expenses/expenses.component';
import {UserDashboardComponent} from './components/user-dashboard/user-dashboard.component';
import { ModalListSettleUpComponent } from './components/modal-list-settle-up/modal-list-settle-up.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    GroupComponent,
    DashboardComponent,
    NavbarComponent,
    ExpensesComponent,
    UserDashboardComponent,
    ModalListSettleUpComponent,
    ModalListSettleUpComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule.forRoot(),
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    DxVectorMapModule,
    DxPieChartModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
