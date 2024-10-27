import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GroupService} from '../../../services/group/group.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy{
  profileGroups:any = {};

  constructor(private groupService:GroupService, private router:Router, private activatedRoute:ActivatedRoute)  {

  }

  getDate(created_date){
    return new Date(created_date).toDateString()
  }

  groupDetail(group_id){
    this.router.navigate(['/dashboard/group/'+group_id]);
    // this.router.navigateByUrl('/dashboard/group/',  { state: group});
  }

  ngOnDestroy(): void {
        // throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe(data => {
      this.profileGroups  = data;
    })

    console.log(this.profileGroups)
        // throw new Error('Method not implemented.');
    }


  protected readonly Date = Date;
}
