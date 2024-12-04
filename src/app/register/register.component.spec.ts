import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { RegisterComponent } from './register.component';

class MockUserService {
  createNewUser(user: any) {
    return of(user);
  }
}

class MockRouter {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.form.value).toEqual({ full_name: '', email: '', password: '' });
  });

  it('should call UserService createNewUser method on createNewUser', () => {
    const createNewUserSpy = spyOn(userService, 'createNewUser').and.callThrough();
    component.form.setValue({ full_name: 'John Doe', email: 'john@example.com', password: 'password' });
    component.createNewUser();
    expect(createNewUserSpy).toHaveBeenCalledWith({ full_name: 'John Doe', user: { email: 'john@example.com', password: 'password' } });
  });

  it('should navigate to /login on successful user creation', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.form.setValue({ full_name: 'John Doe', email: 'john@example.com', password: 'password' });
    component.createNewUser();
    expect(navigateSpy).toHaveBeenCalledWith('/login');
  });
});
