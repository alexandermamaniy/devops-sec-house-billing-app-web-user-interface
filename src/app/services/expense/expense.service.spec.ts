import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExpenseService } from './expense.service';
import { environment } from '../../../environments/environment';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExpenseService]
    });
    service = TestBed.inject(ExpenseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get expenses by group ID', () => {
    const groupId = 1;
    const dummyExpenses = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }];

    service.getExpenseByGroupId(groupId).subscribe(expenses => {
      expect(expenses).toEqual(dummyExpenses);
    });

    const req = httpMock.expectOne(`${environment.url}/api/buddy-expenses/group/${groupId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyExpenses);
  });

  it('should get expenses by authenticated user', () => {
    const dummyExpenses = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }];

    service.getExpenseByUserAuthenticated().subscribe(expenses => {
      expect(expenses).toEqual(dummyExpenses);
    });

    const req = httpMock.expectOne(`${environment.url}/api/buddy-expenses/me`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyExpenses);
  });

  it('should create a new expense', () => {
    const newExpense = { amount: 100 };
    const createdExpense = { id: 1, amount: 100 };

    service.createExpense(newExpense).subscribe(expense => {
      expect(expense).toEqual(createdExpense);
    });

    const req = httpMock.expectOne(`${environment.url}/api/buddy-expenses/`);
    expect(req.request.method).toBe('POST');
    req.flush(createdExpense);
  });

  it('should get settle-ups by expense ID', () => {
    const expenseId = 1;
    const dummySettleUps = [{ id: 1, amount: 50 }, { id: 2, amount: 75 }];

    service.getSettleUps(expenseId).subscribe(settleUps => {
      expect(settleUps).toEqual(dummySettleUps);
    });

    const req = httpMock.expectOne(`${environment.url}/api/buddy-expenses/settle-up/${expenseId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummySettleUps);
  });

  it('should settle up expense participant', () => {
    const settleUpData = { amount: 50 };
    const response = { success: true };

    service.settleUpExpenseParticipant(settleUpData).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${environment.url}/api/buddy-expenses/settle-up-participant`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });
});
