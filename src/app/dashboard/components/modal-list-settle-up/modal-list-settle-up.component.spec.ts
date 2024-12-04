import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { ModalListSettleUpComponent } from './modal-list-settle-up.component';
import { ExpenseService } from '../../../services/expense/expense.service';

class MockExpenseService {
  getSettleUps(settle_up_id) {
    return of([]);
  }
}

describe('ModalListSettleUpComponent', () => {
  let component: ModalListSettleUpComponent;
  let fixture: ComponentFixture<ModalListSettleUpComponent>;
  let expenseService: ExpenseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalListSettleUpComponent],
      imports: [NgbModalModule],
      providers: [
        { provide: ExpenseService, useClass: MockExpenseService },
        NgbModal
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListSettleUpComponent);
    component = fixture.componentInstance;
    expenseService = TestBed.inject(ExpenseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize list_settle_up on init', () => {
    spyOn(expenseService, 'getSettleUps').and.returnValue(of([{ id: '1', amount: 100 }]));
    component.settle_up_id = 'test-settle-up-id';
    component.ngOnInit();
    expect(expenseService.getSettleUps).toHaveBeenCalledWith('test-settle-up-id');
    expect(component.list_settle_up).toEqual([{ id: '1', amount: 100 }]);
  });
});
