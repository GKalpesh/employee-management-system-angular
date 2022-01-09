import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatSort } from '@angular/material/sort'
import { EmployeeService } from '../service/employee.service';


export interface UsersData {
  name: string;
  id: number;
  email: string;
  dateOfJoining: string;
  yearsOfExp: string;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Arun Dalvi', email: "arun.123@gmail.com", dateOfJoining: "29 Aug 2018", yearsOfExp: '2'},
  {id: 1560608796014, name: 'Ramesh Sakpal', email: "rameshsakpal@gmail.com", dateOfJoining: "5 Feb 2015", yearsOfExp: '5'},
  {id: 1560608787815, name: 'Harsh Desai', email: "harshdesai@gmail.com", dateOfJoining: "16 Oct 2009", yearsOfExp: '10'},
  {id: 1560608805101, name: 'Komal Kumar', email: "komalkumar@yahoo.com", dateOfJoining: "26 Dec 2012", yearsOfExp: '8'},
  {id: 1560608825101, name: 'Sagar Jadhav', email: "sagarjadav@yahoo.com", dateOfJoining: "1 Jan 2020", yearsOfExp: '0'},
  
];

@Component({
  selector: 'app-hr-list',
  templateUrl: './hr-list.component.html',
  styleUrls: ['./hr-list.component.css']
})
export class HrListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email','dateOfJoining' , 'yearsOfExp', 'action'];
  dataSource = ELEMENT_DATA;

  checkAction: boolean = true;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog, private _employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login'])
  }

  
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name,
      email: row_obj.email,
      dateOfJoining: row_obj.dateOfJoining,
      yearsOfExp: row_obj.yearsOfExp
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.email = row_obj.email;
        value.dateOfJoining = row_obj.dateOfJoining;
        value.yearsOfExp = row_obj.yearsOfExp;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  logData(row: any){
    if(this.checkAction){
      this.checkAction = false;
      
      console.log(row);
    }else{
      this.checkAction = true;
      console.log(row);

      this._employeeService.dataRowName = row.name;
      this._employeeService.dataRowEmail = row.email;
      this._employeeService.dataRowDateOJoin = row.dateOfJoining;
      this._employeeService.dataRowExp = row.yearsOfExp;
      this.router.navigate(['/Edetails'])
    }
  }

}
