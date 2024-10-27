
import {Component, OnInit, ElementRef, Input} from '@angular/core';

import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import {
  Location,
} from "@angular/common";
import {GroupService} from '../../../services/group/group.service';


interface UserData {
  full_name: string;
  user: {
    email: string;
  }
}

interface GroupData {
  groups_that_manage: any[];
  groups_that_belong: any[]
}

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public focus;
  // public listTitles: any[];
  public location: Location;
  sidenavOpen: boolean = true;
  @Input() userProfile: UserData;

  profileGroups:GroupData;
  isAdmin: boolean;

  constructor(location: Location, private router: Router, private groupService: GroupService) {
    this.location = location;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator

      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator

        if (window.innerWidth < 1200) {
          document.body.classList.remove("g-sidenav-pinned");
          document.body.classList.add("g-sidenav-hidden");
          this.sidenavOpen = false;
        }
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });

  }
  updateData(){
    console.log("me llevo el evento");
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe((data) => {
      this.profileGroups = data;
      console.log(this.profileGroups)
      this.isAdmin = this.profileGroups.groups_that_manage.length === 0 ? false : true;
      console.log(this.isAdmin);
    });

  }

  logout() {
    localStorage.removeItem("id_token");
    this.router.navigateByUrl("/login");
  }

  openSearch() {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function() {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  }
  closeSearch() {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  }
}
