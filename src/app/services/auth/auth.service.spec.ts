import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and return a user', () => {
    const dummyUser = { email: 'test@example.com', password: 'password123' };
    const email = 'test@example.com';
    const password = 'password123';

    service.login(email, password).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.url}/api/token/`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });
});
