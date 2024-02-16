
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { EmployeeService } from "./services/employee.service";


@Injectable({
  providedIn: "root",
})

export class AuthempGuard {
  constructor(private authService: EmployeeService, private router: Router) { }


  

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isempLogedIn()) {
      return true;
    } else {
      this.router.navigate(["/employee"]);
      return false;
    }
  }
}