import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { GroupComponent } from "./components/group/group.component";
import {UserDashboardComponent} from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "user",
    pathMatch: "full"
  },
  { path: 'user', component: UserDashboardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'group/:id', component: GroupComponent }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}

