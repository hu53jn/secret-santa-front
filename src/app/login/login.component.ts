import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { UserService } from '../services/user.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, Validators.required]
    })
  }

  onSubmit(){
    this.userService.validateUser(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe( (result : any) => {
      localStorage.setItem('token', result.token);
      localStorage.setItem('userEmail', result.email);
      if(result.role == 'admin'){
        localStorage.setItem('admin','true');
      }
      alertify.success('Successfull login!');
      this.router.navigateByUrl('/home');
    },
    err => {
      alertify.error('Email or password are wrong!');
    })
  }

  onCancel(){
    this.loginForm.reset();
  }

}
