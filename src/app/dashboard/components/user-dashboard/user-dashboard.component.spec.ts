import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserDashboardComponent } from './user-dashboard.component';
import { ExpenseService } from '../../../services/expense/expense.service';
import { GroupService } from '../../../services/group/group.service';

class MockExpenseService {
  getExpenseByGroupId(groupId: string) {
    return of([]);
  }

  getExpenseByUserAuthenticated() {
    return of([]);
  }
}

class MockGroupService {
  getGroups() {
    return of({
      groups_that_manage: [],
      groups_that_belong: []
    });
  }
}

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let expenseService: ExpenseService;
  let groupService: GroupService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDashboardComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ExpenseService, useClass: MockExpenseService },
        { provide: GroupService, useClass: MockGroupService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    expenseService = TestBed.inject(ExpenseService);
    groupService = TestBed.inject(GroupService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize expenses and groups for admin', () => {
    component.isAdmin = true;
    component.groipId = 'test-group-id';

    spyOn(expenseService, 'getExpenseByGroupId').and.returnValue(of([]));
    spyOn(groupService, 'getGroups').and.returnValue(of({
      groups_that_manage: [],
      groups_that_belong: []
    }));

    component.ngOnInit();

    expect(expenseService.getExpenseByGroupId).toHaveBeenCalledWith('test-group-id');
    expect(groupService.getGroups).toHaveBeenCalled();
  });

  it('should initialize expenses and groups for non-admin', () => {
    component.isAdmin = false;

    spyOn(expenseService, 'getExpenseByUserAuthenticated').and.returnValue(of([]));
    spyOn(groupService, 'getGroups').and.returnValue(of({
      groups_that_manage: [],
      groups_that_belong: []
    }));

    component.ngOnInit();

    expect(expenseService.getExpenseByUserAuthenticated).toHaveBeenCalled();
    expect(groupService.getGroups).toHaveBeenCalled();
  });

  it('should return formatted date', () => {
    const date = component.getDate('2023-01-01T00:00:00Z');
    expect(date).toBe('Sun Jan 01 2023');
  });

  it('should return group name by id', () => {
    component.groups = [{ id: '1', name: 'Group 1' }];
    const groupName = component.getGroupName('1');
    expect(groupName).toBe('Group 1');
  });
});
