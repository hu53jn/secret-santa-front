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
      firstName: ['', Validators.required],
      lastName: [''],
      username: ['', Validators.required]
    });
    this.singleEmployee = {firstName: '',lastName: '', username: ''};
  }

  removeEmployee(index: number){
    var helper;

    for(let i = 0; i < this.secretSantaMain.length; i++){
      if(this.secretSantaMain[i].username == this.employees[index]){
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
    this.employees.push(this.employeeForm.get('username').value);
    this.employeeForm.reset();
  }

  alertEmployees(){
    this.employeeForm.reset();
    this.employees = [];
    document.getElementById("closeModalButton").click();
    this.secretSantaMain.forEach(element => {
      this.employeeService.addEmploye(element).subscribe((data : any) => {
      },
      err => alertify.error("Username already exist!" + element.username));
    })
    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.router.navigateByUrl('/home')
    }, 3000);
  }

  setEmployeeValue(){
    this.singleEmployee = {firstName: '',lastName: '', username: '', secretSanta: ''}
    this.singleEmployee.username = this.employeeForm.get('username').value;
    this.singleEmployee.firstName = this.employeeForm.get('firstName').value;
    this.singleEmployee.lastName = this.employeeForm.get('lastName').value;
    this.singleEmployee.secretSanta  = 'Secret Santa not selected!';
  }


}
