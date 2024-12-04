import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ModalCreateExpenseComponent } from './modal-create-expense.component';
import { ExpenseService } from '../../../services/expense/expense.service';
import { UserService } from '../../../services/user/user.service';

class MockExpenseService {
  createExpense(expense) {
    return of({});
  }
}

class MockUserService {
  getMemberAndAdminOfAGroup(groupId: string) {
    return of({ members_of_group: [] });
  }
}

describe('ModalCreateExpenseComponent', () => {
  let component: ModalCreateExpenseComponent;
  let fixture: ComponentFixture<ModalCreateExpenseComponent>;
  let expenseService: ExpenseService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreateExpenseComponent],
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
    fixture = TestBed.createComponent(ModalCreateExpenseComponent);
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


  it('should add item to participants_of_expense_payment', () => {
    component.addItem('1', 50);
    expect(component.form.value.participants_of_expense_payment).toEqual([{
      participant_id: '1',
      amount_to_pay: 50,
      percentage_to_pay: 0,
      payment_balance: 0
    }]);
  });

  it('should remove item from participants_of_expense_payment', () => {
    component.form.value.participants_of_expense_payment.push({
      participant_id: '1',
      amount_to_pay: 50,
      percentage_to_pay: 0,
      payment_balance: 0
    });
    component.removeItem(0);
    expect(component.form.value.participants_of_expense_payment.length).toBe(0);
  });
});
