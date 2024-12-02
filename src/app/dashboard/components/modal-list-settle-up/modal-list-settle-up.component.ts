import {Component, Input, OnInit} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ExpenseService} from '../../../services/expense/expense.service';


@Component({
  selector: 'app-modal-list-settle-up',
  templateUrl: './modal-list-settle-up.component.html',
  styleUrls: ['./modal-list-settle-up.component.scss']
})
export class ModalListSettleUpComponent implements OnInit {

  closeResult: string;

  @Input() isAdmin: boolean;
  @Input() groupId;
  @Input() settle_up_id;
  public list_settle_up: any;
  constructor(private modalService: NgbModal, private expenseSerivice: ExpenseService) {}

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
    console.log("from modal settle up", this.settle_up_id)
    this.expenseSerivice.getSettleUps(this.settle_up_id).subscribe(data => {
      this.list_settle_up = data;
      console.log(this.list_settle_up, "from settle**************");
    })
  }

}
