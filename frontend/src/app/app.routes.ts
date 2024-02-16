import { Routes } from '@angular/router';
import { AdminaccessComponent } from './adminaccess/adminaccess.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { AuthGuard } from './auth.guard';
import { AssetsComponent } from './assets/assets.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { AuthempGuard } from './empguard.guard';
import { UpdateuserComponent } from './updateuser/updateuser.component';

export const routes: Routes = [
    { path: 'home', component: AdminaccessComponent, canActivate: [AuthGuard] },
    { path: 'login', component: AdminLoginComponent },
    { path: 'signup', component: AdminRegistrationComponent },
    { path: 'assets', component: AssetsComponent, canActivate: [AuthGuard] },
    { path: 'employee', component: EmployeeComponent},
    {path:'empdetails',component:EmployeedetailsComponent, canActivate:[AuthempGuard]},
    {path:'updateuser/:id',component:UpdateuserComponent,canActivate:[AuthGuard]}
];
