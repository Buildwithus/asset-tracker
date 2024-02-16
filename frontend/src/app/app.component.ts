import { Component ,ViewChild} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminaccessComponent } from './adminaccess/adminaccess.component';
import { AdminserviceService } from './services/adminservice.service';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AdminRegistrationComponent,AdminLoginComponent,
    AdminaccessComponent,RouterLink,EmployeeComponent,EmployeedetailsComponent
  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  constructor(private router:Router,private adminservice:AdminserviceService){}
  canActivate(): boolean{
    if(this.adminservice.isLogedIn()){
      return true;
    }else{
      this.router.navigate(['./login'])
      return false
    }
  }

  
}
