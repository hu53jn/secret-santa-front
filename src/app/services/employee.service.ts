import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from '../Interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly APIUrl = "http://localhost:53048/api/employee";

  constructor(private  httpClient: HttpClient) { }

  addEmploye(employee: any){
    return this.httpClient.post(this.APIUrl + '/post', employee);
  }

  getEmployee(){
    return this.httpClient.get(this.APIUrl + '/getSecretSanta/'+localStorage.getItem('username'));
  }

  getEmployees(){
    return this.httpClient.get(this.APIUrl);
  }

  deleteEmployee(id: number){
    return this.httpClient.delete(this.APIUrl +'/'+ id);
  }

  updateEmployee(id: number, employee: IEmployee){
    return this.httpClient.put(this.APIUrl + '/'+id, employee);
  }

}
