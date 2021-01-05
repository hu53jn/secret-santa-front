import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEmployee } from '../Interface/employee';
import { EmployeeService } from '../services/employee.service';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild('closeModal') public closeModal: ElementRef;
  employees: Array<string> = [];
  employeeForm: FormGroup;

  secretSantaMain: Array<IEmployee> = [];
  singleEmployee: IEmployee;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]]
    });
    this.singleEmployee = {firstName: '',lastName: '', email: ''};
  }

  removeEmployee(index: number){
    var helper;

    for(let i = 0; i < this.secretSantaMain.length; i++){
      if(this.secretSantaMain[i].email == this.employees[index]){
        helper = i;
      }
    }

    this.employees.splice(index,1);
    this.secretSantaMain.splice(helper,1);
    this.employeeForm.reset();
  }


  addEmployee(){
    this.setEmployeeValue();
    this.secretSantaMain.push(this.singleEmployee);
    this.employees.push(this.employeeForm.get('email').value);
    this.employeeForm.reset();
  }

  alertEmployees(){
    this.employeeForm.reset();
    this.employees = [];
    document.getElementById("closeModalButton").click();
    this.secretSantaMain.forEach(element => {
      this.employeeService.addEmploye(element).subscribe((data : any) => {
      },
      err => alertify.error("Email already exist!" + element.email));
      this.router.navigateByUrl('/home');
    })
  }

  setEmployeeValue(){
    this.singleEmployee = {firstName: '',lastName: '', email: '', secretSanta: ''}
    this.singleEmployee.email = this.employeeForm.get('email').value;
    this.singleEmployee.firstName = this.employeeForm.get('firstName').value;
    this.singleEmployee.lastName = this.employeeForm.get('lastName').value;
    this.singleEmployee.secretSanta  = 'Secret Santa not selected!';
  }


}
