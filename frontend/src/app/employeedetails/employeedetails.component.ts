import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employeedetails',
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor,DatePipe],
  templateUrl: './employeedetails.component.html',
  styleUrl: './employeedetails.component.css'
})
export class EmployeedetailsComponent {
  constructor(private service: EmployeeService) { }
  empdata: any;
  first:any;
  second:any;
  getdata() {
    this.service.empdetails().subscribe((data) => {
      this.empdata = data;
      // console.log( this.empdata.getempdetails)
    })
  }
  ngOnInit() {
    this.getdata();
    
  }
}

