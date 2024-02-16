// auth.guard.ts
import { Injectable } from "@angular/core";
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AdminserviceService } from "./services/adminservice.service";


@Injectable({
   providedIn: "root",
})
export class AuthGuard{
   constructor(private authService: AdminserviceService, private router: Router) {}

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.authService.isLogedIn()) {
         return true;
      } else {
         this.router.navigate(["/login"]); 
         return false;
      }
   }
}

