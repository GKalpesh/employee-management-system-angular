import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms'
import { from } from 'rxjs';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  showSuccessMsg: boolean;
  serverErrorMsg: string;

  constructor(private router: Router, public userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  onSubmit(form : NgForm){
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSuccessMsg = true;
        this.router.navigate(['/UserProfile'])
        setTimeout(() => this.showSuccessMsg = false, 2000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422){
          this.serverErrorMsg = err.error.join('<br/>'); 
        }
        else{
          this.serverErrorMsg = 'Something went Wrong!!!';
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      phoneNo: '',
      role: ''
    };
    form.resetForm();
    this.serverErrorMsg = '';
  }

}
