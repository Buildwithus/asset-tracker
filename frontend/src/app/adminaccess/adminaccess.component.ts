import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { AssetsComponent } from '../assets/assets.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AdminserviceService } from '../services/adminservice.service';
@Component({
  selector: 'app-adminaccess',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet, MatFormFieldModule, MatInputModule, MatSelectModule,NgFor],
  templateUrl: './adminaccess.component.html',
  styleUrl: './adminaccess.component.css'
})
export class AdminaccessComponent {
  constructor(private router: Router, private service: EmployeeService,private ser:AdminserviceService) { }
  message: any;
  employeedata(employeedetails: any) {
    this.service.postemployee(employeedetails).subscribe((data) => {
      this.message = data;
      alert(this.message.message)
      this.router.navigate(['./assets'])
    })
  }
  data: any;
  userdetails() {
    this.ser.allempdetails().subscribe((data)=>{
      
      this.data=data
      console.log(this.data)
    })
  }
  deletemessage:any;
  DeleteEmp(id:any){
    this.ser.deleteemp(id).subscribe((data)=>{
      this.deletemessage=data;
      alert(this.deletemessage.message)
    })
    this.userdetails();
  }

  ngOnInit(){
    this.userdetails();
  }
}
