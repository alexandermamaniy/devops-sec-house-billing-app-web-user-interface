import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isMobileResolution: boolean;
  userProfile:any ={};

  constructor(private userService: UserService, private router: Router) {
    if (window.innerWidth < 1200) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  ngOnDestroy(): void {
    }


  @HostListener("window:resize", ["$event"])
  isMobile(event) {
    if (window.innerWidth < 1200) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  ngOnInit() {
    this.userService.getUserInformation().subscribe((data) => {
      this.userProfile = data;
    }, (error) => {
      console.log("Error perras: " + error);
      this.router.navigateByUrl("/login");
    });


  }

}

