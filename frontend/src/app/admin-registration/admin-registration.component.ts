import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminserviceService } from '../services/adminservice.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-registration',
  standalone: true,
  imports: [CommonModule, FormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './admin-registration.component.html',
  styleUrl: './admin-registration.component.css'
})

export class AdminRegistrationComponent {
  constructor(private adminreg: AdminserviceService,private router:Router) {

  }
  message: any;
  adminReqistration(admindata: any) {
    console.log(admindata)
    this.adminreg.postadmindata(admindata).subscribe((data) => {
      // console.log(data,"posted")
      this.message = data;
      alert(this.message.message)
      if(this.message.message==="Successfully Created"){
        this.router.navigate(['./login'])
      }
    })

  }
}
