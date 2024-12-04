import {Component, Input, OnInit} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpenseService} from '../../../services/expense/expense.service';
import {UserService} from '../../../services/user/user.service';


@Component({
  selector: 'app-modal-create-expense',
  templateUrl: './modal-create-expense.component.html',
  styleUrls: ['./modal-create-expense.component.scss']
})
export class ModalCreateExpenseComponent implements OnInit{

  @Input() groupId: string;
  public members_and_admins_of_group:any = {};
  closeResult: string;
  form: FormGroup;

  constructor(private  fb: FormBuilder, private modalService: NgbModal, private router:Router, private expenseService:ExpenseService, private userService: UserService) {

    this.form = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      total_amount: ["", Validators.required],
      currency: ["", Validators.required],
      participants_of_expense_payment: this.fb.array([]),
      buddy_group: [this.groupId, Validators.required]
    })
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === 'lg') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'lg', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
      this.modalService.open(content,{ centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  'with: $reason';
    }
  }
  ngOnInit() {
    console.log("on init",this.groupId);
    this.userService.getMemberAndAdminOfAGroup(this.groupId).subscribe(data => {
      this.members_and_admins_of_group = data.members_of_group;
      console.log("FRom group component", this.groupId,this.members_and_admins_of_group);
    });
  }

  create_expense(){
    let membersnode: any = document.getElementsByName("member_expense_user");

    for (const memberNode of membersnode) {
      let id_user = memberNode.id;
      let amount_user = memberNode.getElementsByTagName("input")[0].value;
      this.addItem(id_user, amount_user);
    }

    this.form.value.buddy_group = this.groupId;
    console.log(this.form.value)
    this.expenseService.createExpense(this.form.value).subscribe(data => {
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

  removeItem(index: any) {
    const items = this.form.get('participants_of_expense_payment') as FormArray;
    items.removeAt(index);
  }

}
