import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ModalCreateGroupComponent } from './modal-create-group.component';
import { UserService } from '../../../services/user/user.service';
import { GroupService } from '../../../services/group/group.service';

class MockUserService {
  getAllMembers() {
    return of([{ id: '1', name: 'User 1' }]);
  }
}

class MockGroupService {
  createGroup(group) {
    return of({});
  }
}

describe('ModalCreateGroupComponent', () => {
  let component: ModalCreateGroupComponent;
  let fixture: ComponentFixture<ModalCreateGroupComponent>;
  let userService: UserService;
  let groupService: GroupService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreateGroupComponent],
      imports: [ReactiveFormsModule, NgbModalModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: UserService, useClass: MockUserService },
        { provide: GroupService, useClass: MockGroupService },
        NgbModal
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateGroupComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    groupService = TestBed.inject(GroupService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize users on init', () => {
    spyOn(userService, 'getAllMembers').and.returnValue(of([{ id: '1', name: 'User 1' }]));
    component.ngOnInit();
    expect(userService.getAllMembers).toHaveBeenCalled();
    expect(component.users).toEqual([{ id: '1', name: 'User 1' }]);
  });


});
