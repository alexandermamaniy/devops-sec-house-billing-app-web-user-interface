import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ExpenseService} from '../../../services/expense/expense.service';
import {GroupService} from '../../../services/group/group.service';

interface ParticipantExpense{
  amount_to_pay: number,
  participant_id: string,
  payment_balance: number,
  percentage_to_pay: number
}

interface PaymentExpense {
  amount_payment: number,
  who_do_simple_payment: string

}

interface Expense {
  buddy_group: string,
  currency: string,
  description: string,
  evicende_picture_url: string,
  id: string,
  participants_of_expense_payment: [ParticipantExpense],
  payments_made_it_by_payers: [PaymentExpense],
  settlement_by_participants: [PaymentExpense],
  title: string,
  total_amount: number,
  type_payment_distribution: string,
  created_date: string
}

interface GroupP {
  name: string,
  id: string
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  @Input() isAdmin: boolean;
  @Input() groipId!: string ;

  public expenses:[Expense] ;
  public groups: [GroupP] ;
  constructor(private expenseService:ExpenseService, private groupService:GroupService) {


  }

  getDate(created_date){
    return new Date(created_date).toDateString()
  }

  getGroupName(group_id){
    for (let group of this.groups) {
      if (group.id == group_id){
        return group.name;
      }
    }
  }

  ngOnDestroy() {
    this.isAdmin = false;
    this.groipId = "";
  }

  ngOnInit() {
    console.log("group id",this.groipId);
    if(this.isAdmin && this.groipId !=""){

      this.expenseService.getExpenseByGroupId(this.groipId).subscribe(data => {
        this.expenses  = data;
        console.log("from admin",this.expenses);
      })
    } else {
      this.expenseService.getExpenseByUserAuthenticated().subscribe(data => {
        this.expenses  = data;
        console.log("from member",this.expenses);
      })
    }

    this.groupService.getGroups().subscribe(data => {
      if(this.isAdmin){
        this.groups = data.groups_that_manage;
      } else {
        this.groups = data.groups_that_belong;
      }
      console.log("groups : ",this.groups);
    })
  }


}
