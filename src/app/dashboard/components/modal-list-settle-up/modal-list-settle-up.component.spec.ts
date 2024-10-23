import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListSettleUpComponent } from './modal-list-settle-up.component';

describe('ModalListSettleUpComponent', () => {
  let component: ModalListSettleUpComponent;
  let fixture: ComponentFixture<ModalListSettleUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalListSettleUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalListSettleUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
