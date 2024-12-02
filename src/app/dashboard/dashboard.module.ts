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
import {UserDashboardComponent} from './components/user-dashboard/user-dashboard.component';
import { ModalListSettleUpComponent } from './components/modal-list-settle-up/modal-list-settle-up.component';
import { ModalCreateExpenseComponent } from './components/modal-create-expense/modal-create-expense.component';
import { ModalCreateGroupComponent } from './components/modal-create-group/modal-create-group.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalSettleExpenseUpComponent} from './components/modal-settle-expense-up/modal-settle-expense-up.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    GroupComponent,
    DashboardComponent,
    NavbarComponent,
    UserDashboardComponent,
    ModalListSettleUpComponent,
    ModalCreateExpenseComponent,
    ModalCreateGroupComponent,
    ModalSettleExpenseUpComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule.forRoot(),
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    DxVectorMapModule,
    DxPieChartModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
