import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  dataRowName: string;
  dataRowEmail: string;
  dataRowDateOJoin: string;
  dataRowExp: string;

  constructor() { }
}
