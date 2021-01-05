import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../Interface/employee';
import { EmployeeService } from '../services/employee.service';
import { UserService } from '../services/user.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  secretSantaInfo: any;
  userInfo: any;
  employess: IEmployee[] = [];

  constructor(private employeeService: EmployeeService, private userService: UserService) {}

  ngOnInit(): void {
    this.getSecretSanta();
    this.getEmployees();
    this.getUserInfo();
  }

  ifAdmin(){
    return localStorage.getItem('admin');
  }

  getSecretSanta(){
    this.employeeService.getEmployee().subscribe((data : any) => {
      this.secretSantaInfo = data;
    },
    err=> alertify.error("You are removed from secret santa list!"))
  }

  getUserInfo(){
    this.userService.getUserInfo().subscribe((data : any) => {
      this.userInfo = data;
    })
  }

  getEmployees(){
    if(this.ifAdmin()){
      this.employeeService.getEmployees().subscribe((data : any ) => {
        this.employess = data;
      })
    }
  }

  removeEmployee(index: number){
    this.employess.forEach(element => {
      if(element.secretSanta == this.employess[index].email){
        element.secretSanta = "Secret Santa not selected!";
        this.employeeService.updateEmployee(element.id, element).subscribe((data : any) => {
          this.employeeService.deleteEmployee(this.employess[index].id).subscribe((data : any) => {
            this.getEmployees();
          });
        });
      }
    })
  }

  shuffleArray(){
    for(let i in this.employess){
      var random = Math.floor(Math.random() * this.employess.length);
      this.swapIndexes(Number(i), random);
    }
    this.newMethod();
  }

  swapIndexes(firstIndex: number, secondIndex: number){
    var helper= this.employess[firstIndex];
    this.employess[firstIndex] = this.employess[secondIndex];
    this.employess[secondIndex] = helper;
  }

  newMethod(){
    var helper = this.employess.length;
    for(let i = 0; i < this.employess.length; i++){
      if(i == helper - 1){
        this.employess[i].secretSanta = this.employess[0].email;
      }else{
        this.employess[i].secretSanta = this.employess[i+1].email;
      }
    }
    //this.updateList();
  }

  updateList(){
    for(let i = 0; i < this.employess.length; i++){
      this.employeeService.updateEmployee(this.employess[i].id, this.employess[i]).subscribe((data : any) => {
        if(i == this.employess.length -1){
          alertify.success("Update succesfull!")
        }
      });
    }
  }


}
