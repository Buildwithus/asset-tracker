import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminserviceService } from '../services/adminservice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  constructor(private loginservice: AdminserviceService, private router: Router) { }

  loginresult: any
  gettoken: any;
 
  clearToken(): void {
    localStorage.removeItem('admintoken');
    localStorage.removeItem('expiration');
  }
  getToken(): string | null {
    const expiryTimestamp = localStorage.getItem('expiration');
    if (!expiryTimestamp) {
      return null; // Token doesn't exist or expired
    }
    const now = Date.now();
    console.log(now,typeof now,typeof expiryTimestamp)
    if (now >+expiryTimestamp) {
      this.clearToken(); // Token expired, clear it
      return null;
    }
    return localStorage.getItem('admintoken');
  }
  adminLogin(logindata: any) {
    //console.log(logindata)
    this.loginservice.loginadmindata(logindata).subscribe((d) => {
      // console.log('ttttt', d, typeof d, Object.keys(d))
      this.loginresult = d;
      alert(this.loginresult.message)
      // localStorage.setItem('admintoken',this.loginresult.token)

      // console.log(localStorage.getItem("admintoken"))
      // if(this.loginresult.message==="Successfully Login"){
      //   this.router.navigate(['./home'])
      // }
      // this.gettoken = localStorage.getItem('admintoken')
      this.gettoken=this.getToken();
      if (this.gettoken && this.loginresult.message === "Successfully Login") {
        this.router.navigate(['./home'])
      }else{
        this.router.navigate(['./login'])
      }

    })
  }

}
