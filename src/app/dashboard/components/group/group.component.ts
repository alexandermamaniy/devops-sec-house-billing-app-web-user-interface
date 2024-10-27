import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {UserService} from '../../../services/user/user.service';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
  // private activatedRoute = inject(ActivatedRoute);
  public groupId!:string;
  public members_and_admins_of_group:any = {};
  constructor(private userService:UserService, private route:ActivatedRoute) {



  }


  ngOnDestroy() {

  }

  ngOnInit() {
    // console.log(history.state);

    this.route.paramMap.subscribe((params) => {
      this.groupId = params.get('id')!;
      this.userService.getMemberAndAdminOfAGroup(this.groupId).subscribe(data => {
        this.members_and_admins_of_group = data;
        console.log("FRom group component", this.groupId,this.members_and_admins_of_group);
      });
    });

  }
}
