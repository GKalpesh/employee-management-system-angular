import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service'

@Component({
  selector: 'app-edetails',
  templateUrl: './edetails.component.html',
  styleUrls: ['./edetails.component.css']
})
export class EDetailsComponent implements OnInit {

  rowValueName: string;
  rowValueEmail: string;
  rowValueDateOJoin: string;
  rowValueExp: string;


  constructor(private _employeeService: EmployeeService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.rowValueName = this._employeeService.dataRowName;
    this.rowValueEmail = this._employeeService.dataRowEmail;
    this.rowValueDateOJoin = this._employeeService.dataRowDateOJoin;
    this.rowValueExp = this._employeeService.dataRowExp;

  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login'])
  }

}
