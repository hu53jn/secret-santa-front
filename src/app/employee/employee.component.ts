import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { IEmployee } from '../Interface/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employeeId;
  @Output() public removeEmployee: EventEmitter<any> = new EventEmitter();

  @Input() _employee: IEmployee;

  constructor() { }

  ngOnInit(): void {
  }

  remove(){
    this.removeEmployee.emit();
  }

}
