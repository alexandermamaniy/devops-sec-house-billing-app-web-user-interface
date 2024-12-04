import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GroupService } from './group.service';
import { environment } from '../../../environments/environment';

describe('GroupService', () => {
  let service: GroupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupService]
    });
    service = TestBed.inject(GroupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get groups', () => {
    const dummyGroups = [{ id: 1, name: 'Group 1' }, { id: 2, name: 'Group 2' }];

    service.getGroups().subscribe(groups => {
      expect(groups).toEqual(dummyGroups);
    });

    const req = httpMock.expectOne(`${environment.url}/api/buddy-groups/me`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGroups);
  });

  it('should create a new group', () => {
    const newGroup = { name: 'New Group' };
    const createdGroup = { id: 1, name: 'New Group' };

    service.createGroup(newGroup).subscribe(group => {
      expect(group).toEqual(createdGroup);
    });

    const req = httpMock.expectOne(`${environment.url}/api/buddy-groups/`);
    expect(req.request.method).toBe('POST');
    req.flush(createdGroup);
  });
});
