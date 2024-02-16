import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  postemployee(data: any) {
    return this.http.post("http://localhost:3000/user/admin", data,{
      withCredentials:true
    })
  }
  assignassets(data:any){
    return this.http.post("http://localhost:3000/user/assets",data,{
      withCredentials:true
    })
  }
  emplogin(data:any){
    return this.http.post("http://localhost:3000/user/emplogin",data,{withCredentials:true})
    .pipe(
      tap((response: any) => {
        const expiresin=Date.now() +15000*1000;
        localStorage.setItem('empexpiration',expiresin.toString());
        localStorage.setItem('Emptoken', response.emptoken)
      })
    )
  }
  empdetails(){
    return this.http.get("http://localhost:3000/user/empaccess",{withCredentials:true})
  }
   


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


 

  isempLogedIn(): boolean {
    if(typeof localStorage!=='undefined'){
      return !!this.getToken();
      // return !!localStorage.getItem('Emptoken')
    }else{
      return false;
    }
  }
}
