import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ModalSettleExpenseUpComponent } from './modal-settle-expense-up.component';
import { ExpenseService } from '../../../services/expense/expense.service';
import { UserService } from '../../../services/user/user.service';

class MockExpenseService {
  settleUpExpenseParticipant(expense) {
    return of({});
  }
}

class MockUserService {
  getMemberAndAdminOfAGroup(groupId: string) {
    return of({ members_of_group: [] });
  }
}

describe('ModalSettleExpenseUpComponent', () => {
  let component: ModalSettleExpenseUpComponent;
  let fixture: ComponentFixture<ModalSettleExpenseUpComponent>;
  let expenseService: ExpenseService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSettleExpenseUpComponent],
      imports: [ReactiveFormsModule, NgbModalModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: ExpenseService, useClass: MockExpenseService },
        { provide: UserService, useClass: MockUserService },
        NgbModal
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSettleExpenseUpComponent);
    component = fixture.componentInstance;
    expenseService = TestBed.inject(ExpenseService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize members_and_admins_of_group on init', () => {
    spyOn(userService, 'getMemberAndAdminOfAGroup').and.returnValue(of({ members_of_group: [{ id: '1', name: 'User 1' }] }));
    component.groupId = 'test-group-id';
    component.ngOnInit();
    expect(userService.getMemberAndAdminOfAGroup).toHaveBeenCalledWith('test-group-id');
    expect(component.members_and_admins_of_group).toEqual([{ id: '1', name: 'User 1' }]);
  });

});
