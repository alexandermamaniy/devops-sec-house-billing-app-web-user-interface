import {Component, Input, OnInit} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpenseService} from '../../../services/expense/expense.service';
import {UserService} from '../../../services/user/user.service';
import {ModalOpenParent} from '../modal-open-parent';




@Component({
  selector: 'app-modal-settle-expense-up',
  templateUrl: './modal-settle-expense-up.component.html',
  styleUrls: ['./modal-settle-expense-up.component.scss']
})
export class ModalSettleExpenseUpComponent extends  ModalOpenParent implements OnInit{

  @Input() expensa_id;
  @Input() groupId: string;
  public members_and_admins_of_group:any = {};

  public form: FormGroup;

  constructor(private  fb: FormBuilder, public modalService: NgbModal, private router:Router, private expenseService:ExpenseService, private userService: UserService) {
    super(modalService);
    this.form = this.fb.group({
      who_settle_simple_payment_up: ["", Validators.required],
      what_expense_belong: ["", Validators.required],
      amount_payment: ["", Validators.required]
    })
  }
  ngOnInit() {
    console.log("on init",this.groupId);
    this.userService.getMemberAndAdminOfAGroup(this.groupId).subscribe(data => {
      this.members_and_admins_of_group = data.members_of_group;
    });
  }

  settle_up(){
    this.form.value.what_expense_belong = this.expensa_id;
    this.expenseService.settleUpExpenseParticipant(this.form.value).subscribe(data => {
      console.log(data);
      this.form.reset();
      this.modalService.dismissAll();
      this.reloadCurrentRoute();
    })
  }


  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  addItem(participant_id, amount_to_pay) {

    this.form.value.participants_of_expense_payment.push({
      participant_id: participant_id,
      amount_to_pay: amount_to_pay,
      percentage_to_pay: 0,
      payment_balance: 0
    });

  }


}
