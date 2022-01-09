import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatHeaderCell } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';


export interface PeriodicElement {
  name: string;
  position: number;
  email: String;
  dateOfJoining: string;
  yearsOfExp: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Arun Dalvi', email: "arun.123@gmail.com", dateOfJoining: "29 Aug 2018", yearsOfExp: '2'},
  {position: 2, name: 'Ramesh Sakpal', email: "rameshsakpal@gmail.com", dateOfJoining: "5 Feb 2015", yearsOfExp: '5'},
  {position: 3, name: 'Harsh Desai', email: "harshdesai@gmail.com", dateOfJoining: "16 Oct 2009", yearsOfExp: '10'},
  {position: 4, name: 'Komal Kumar', email: "komalkumar@yahoo.com", dateOfJoining: "26 Dec 2012", yearsOfExp: '8'},
  {position: 5, name: 'Sagar Jadhav', email: "sagarjadav@yahoo.com", dateOfJoining: "1 Jan 2020", yearsOfExp: '0'},
  
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  dataValue:any;

  displayedColumns: string[] = ['position', 'name', 'email', 'dateOfJoining', 'yearsOfExp'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private router: Router, private userService : UserService, private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login'])
  }

  applyFilter(filterValue: String){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logData(row: any){
    console.log(row);

    this._employeeService.dataRowName = row.name;
    this._employeeService.dataRowEmail = row.email;
    this._employeeService.dataRowDateOJoin = row.dateOfJoining;
    this._employeeService.dataRowExp = row.yearsOfExp;
    this.router.navigate(['/Edetails'])
  }

}
