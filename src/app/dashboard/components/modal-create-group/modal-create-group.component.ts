import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../services/group/group.service';
import {Router} from '@angular/router';
import {ModalOpenParent} from '../modal-open-parent';

@Component({
  selector: 'app-modal-create-group',
  templateUrl: './modal-create-group.component.html',
  styleUrls: ['./modal-create-group.component.scss']
})
export class ModalCreateGroupComponent extends ModalOpenParent implements OnInit {

  @Output() createGroupEvent = new EventEmitter();
  users: any;
  form: FormGroup;

  constructor(private  fb: FormBuilder,public modalService: NgbModal, public userService: UserService,
              private groupService: GroupService, private router:Router) {
    super(modalService);
    this.form = this.fb.group({
      name: ["", Validators.required],
      group_members: ["", Validators.required]
    })

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
