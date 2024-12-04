import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { LoginComponent } from './login.component';

class MockAuthService {
  login(email: string, password: string) {
    return of({ access: 'fake-token' });
  }
}

class MockRouter {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.form.value).toEqual({ email: '', password: '' });
  });

  it('should call AuthService login method on login', () => {
    const loginSpy = spyOn(authService, 'login').and.callThrough();
    component.form.setValue({ email: 'test@example.com', password: 'password' });
    component.login();
    expect(loginSpy).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should navigate to /dashboard on successful login', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.form.setValue({ email: 'test@example.com', password: 'password' });
    component.login();
    expect(navigateSpy).toHaveBeenCalledWith('/dashboard');
  });
});
