import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user/user.service';

@Component({
  selector: "app-register",
  templateUrl: "register.component.html"
})
export class RegisterComponent implements OnInit, OnDestroy {
  focus;
  focus1;
  focus2;
  form: FormGroup;

  constructor(private  fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      full_name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }
  logout() {
    localStorage.removeItem("id_token");
    this.router.navigateByUrl("/login");
  }
  createNewUser(){
    const  val = this.form.value;
    if(val.full_name && val.email && val.password ){
      this.userService.createNewUser({full_name: val.full_name ,user: {email: val.email, password: val.password}})
        .subscribe( (data) => {
            this.logout();

          }
        );
    }
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
  }
}
