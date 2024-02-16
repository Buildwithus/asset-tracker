import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  constructor(private service:EmployeeService,private router:Router){}
  message:any;
  emptoken:any;
  // ddd:any=[
  //   {name:'anuj'},
  //   {name:'aman'}];
  clearToken(): void {
    localStorage.removeItem('Emptoken');
    localStorage.removeItem('empexpiration');
  }
  getToken(): string | null {
    const expiryTimestamp = localStorage.getItem('empexpiration');
    if (!expiryTimestamp) {
      return null; // Token doesn't exist or expired
    }
    const now = Date.now();
    console.log(now,typeof now,typeof expiryTimestamp)
    if (now >+expiryTimestamp) {
      this.clearToken(); // Token expired, clear it
      return null;
    }
    return localStorage.getItem('Emptoken');
  }

  Login(data: any) {
    this.service.emplogin(data).subscribe((data)=>{
      this.message=data;
      alert(this.message.message)
      console.log(data)
      this.emptoken=localStorage.getItem('Emptoken')
      if(this.emptoken && this.message.message==="Successfully Login"){
        this.router.navigate(["/empdetails"]);
      }else{
        this.router.navigate(['./employee'])
      }
    })
    
  
  }
}
