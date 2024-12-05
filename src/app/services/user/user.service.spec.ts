import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user information', () => {
    const dummyUser = { id: 1, name: 'Alexander' };

    service.getUserInformation().subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.url}/api/buddy-profiles/me/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should create a new user', () => {
    const newUser = { name: 'Carmela' };
    const createdUser = { id: 2, name: 'Carmela' };

    service.createNewUser(newUser).subscribe(user => {
      expect(user).toEqual(createdUser);
    });

    const req = httpMock.expectOne(`${environment.url}/api/buddy-profiles/`);
    expect(req.request.method).toBe('POST');
    req.flush(createdUser);
  });

  it('should get members and admin of a group', () => {
    const groupId = 1;
    const members = [{ id: 1, name: 'Alexander' }, { id: 2, name: 'Carmela' }];

    service.getMemberAndAdminOfAGroup(groupId).subscribe(data => {
      expect(data).toEqual(members);
    });

    const req = httpMock.expectOne(`${environment.url}/api/buddy-profiles/group/${groupId}`);
    expect(req.request.method).toBe('GET');
    req.flush(members);
  });

  it('should get all members', () => {
    const members = [{ id: 1, name: 'Alexander' }, { id: 2, name: 'Carmela' }];

    service.getAllMembers().subscribe(data => {
      expect(data).toEqual(members);
    });

    const req = httpMock.expectOne(`${environment.url}/api/buddy-profiles/`);
    expect(req.request.method).toBe('GET');
    req.flush(members);
  });
});
