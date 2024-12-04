import {Component, Input, OnInit} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ExpenseService} from '../../../services/expense/expense.service';
import {ModalOpenParent} from '../modal-open-parent';


@Component({
  selector: 'app-modal-list-settle-up',
  templateUrl: './modal-list-settle-up.component.html',
  styleUrls: ['./modal-list-settle-up.component.scss']
})
export class ModalListSettleUpComponent extends ModalOpenParent implements OnInit {


  @Input() isAdmin: boolean;
  @Input() groupId;
  @Input() settle_up_id;
  public list_settle_up: any;
  constructor( public modalService: NgbModal, private expenseSerivice: ExpenseService) {
    super(modalService);
  }

  ngOnInit() {
    console.log("from modal settle up", this.settle_up_id)
    this.expenseSerivice.getSettleUps(this.settle_up_id).subscribe(data => {
      this.list_settle_up = data;
      console.log(this.list_settle_up, "from settle**************");
    })
  }

}
