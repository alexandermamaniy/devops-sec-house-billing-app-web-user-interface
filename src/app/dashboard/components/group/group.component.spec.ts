import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GroupComponent } from './group.component';
import { UserService } from '../../../services/user/user.service';

class MockUserService {
  getMemberAndAdminOfAGroup(groupId: string) {
    return of({});
  }
}

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;
  let userService: UserService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => 'test-group-id'
            })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize groupId and members_and_admins_of_group', () => {
    spyOn(userService, 'getMemberAndAdminOfAGroup').and.returnValue(of({ members: [], admins: [] }));

    component.ngOnInit();

    expect(component.groupId).toBe('test-group-id');
    expect(userService.getMemberAndAdminOfAGroup).toHaveBeenCalledWith('test-group-id');
    expect(component.members_and_admins_of_group).toEqual({ members: [], admins: [] });
  });
});
