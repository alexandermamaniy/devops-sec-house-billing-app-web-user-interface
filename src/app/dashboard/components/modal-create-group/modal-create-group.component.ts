import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../services/group/group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal-create-group',
  templateUrl: './modal-create-group.component.html',
  styleUrls: ['./modal-create-group.component.scss']
})
export class ModalCreateGroupComponent implements OnInit {

  @Output() createGroupEvent = new EventEmitter();
  closeResult: string;
  users: any;
  form: FormGroup;

  constructor(private  fb: FormBuilder,private modalService: NgbModal, public userService: UserService, private groupService: GroupService, private router:Router) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      group_members: ["", Validators.required]
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
    this.userService.getAllMembers().subscribe(data => {
      this.users = data;
      console.log("from modal create group", this.users)
    })

  }
  create_group(){
    this.groupService.createGroup(this.form.value).subscribe(data=> {
      console.log("response from server", data);
      this.form.reset();
      this.modalService.dismissAll();
      // this.createGroupEvent.emit(); // in case you want to emit event

      this.reloadCurrentRoute()
    })
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
