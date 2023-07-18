import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent implements OnInit{
    personForm!: FormGroup;
    spinnerActive = false ;
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CreateUserModalComponent>,
        private userService: UserService,
        private commonService: CommonService
    ){}
    ngOnInit(): void {
        this.initForm();
    }
    initForm() {
        this.personForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            studentId: ['', [Validators.required]],
            department: ['', [Validators.required]],
            semester: ['', [Validators.required]],
            session: ['', [Validators.required]],
            isAdmin: [false, [Validators.required]],
        });
    }

    Cancel() {
        this.dialogRef.close() ;
    }
    CreateUser() {
        this.spinnerActive = true ;
        const payload = this.personForm.value ;
        this.userService.Register(payload).subscribe((response: any) => {
            if(response?.success) {
                this.dialogRef.close('success');
                this.commonService.openSnackbar('User Created Successfully...');
            }
            this.spinnerActive = false ;
        })
    }
}
