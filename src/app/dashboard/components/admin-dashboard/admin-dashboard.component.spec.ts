import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { GroupService } from '../../../services/group/group.service';
import { ActivatedRoute, Router } from '@angular/router';

class MockGroupService {
  getGroups() {
    return of({
      groups_that_manage: [],
      groups_that_belong: []
    });
  }
}

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let groupService: GroupService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: GroupService, useClass: MockGroupService },
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
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    groupService = TestBed.inject(GroupService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize profileGroups', () => {
    spyOn(groupService, 'getGroups').and.returnValue(of({
      groups_that_manage: [{ id: '1', name: 'Group 1' }],
      groups_that_belong: []
    }));

    component.ngOnInit();

    expect(groupService.getGroups).toHaveBeenCalled();
    expect(component.profileGroups.groups_that_manage.length).toBe(1);
  });

  it('should navigate to group detail', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.groupDetail('1');
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/group/1']);
  });

  it('should return formatted date', () => {
    const date = component.getDate('2023-01-01T00:00:00Z');
    expect(date).toBe('Sun Jan 01 2023');
  });
});
