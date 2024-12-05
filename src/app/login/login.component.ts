import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit, OnDestroy {
  focus;
  focus1;
  form: FormGroup;

  constructor(private  fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(3)]]
    })
  }


  private setSession(data) {
    localStorage.setItem('id_token', data.access);
  }

  login(){
    const  val = this.form.value;
    if(this.form.get('email').valid && this.form.get('password').valid ){
      this.authService.login(val.email, val.password)
        .subscribe( (data) => {
         console.log("User is logged in", data);
         this.setSession(data);
         this.router.navigateByUrl("/dashboard");
      }, error => {
          console.log("Error ingreso", error);
        }
      );
    }
  }

  register(){
    this.router.navigateByUrl("/register");
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
