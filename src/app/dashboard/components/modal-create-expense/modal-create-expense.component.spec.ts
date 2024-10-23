import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateExpenseComponent } from './modal-create-expense.component';

describe('ModalCreateExpenseComponent', () => {
  let component: ModalCreateExpenseComponent;
  let fixture: ComponentFixture<ModalCreateExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
