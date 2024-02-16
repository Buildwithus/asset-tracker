import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private http: HttpClient) { }
  postadmindata(data: any) {
    return this.http.post('http://localhost:3000/user/adminsingup', data, { withCredentials: true })
  }
  // setToken(token: string, expiresIn: number): void {
  //   const expiryTimestamp = Date.now() + expiresIn * 1000; // expiresIn is in seconds
  //   localStorage.setItem('admintoken', token);
  //   localStorage.setItem('expiration', expiryTimestamp.toString());
  // }
  loginadmindata(login: any) {

    return this.http.post('http://localhost:3000/user/adminlogin', login, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          const expiresin = Date.now() + 15000 * 1000;
          localStorage.setItem('admintoken', response.token)
          localStorage.setItem('expiration', expiresin.toString());
        })
      )
  }

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
    console.log(now, typeof now, typeof expiryTimestamp)
    if (now > +expiryTimestamp) {
      this.clearToken(); // Token expired, clear it
      return null;
    }
    return localStorage.getItem('admintoken');
  }

  allempdetails() {
    return this.http.get("http://localhost:3000/user/getalluser", { withCredentials: true })
  }

  deleteemp(id: any) {
    return this.http.delete(`http://localhost:3000/user/${id}`, { withCredentials: true });
  }
  updateuser(id: any, data: any) {
    return this.http.put(`http://localhost:3000/user/${id}`, data, { withCredentials: true })
  }

  finduser(id:any){
    return this.http.get(`http://localhost:3000/user/${id}`,{withCredentials:true})
  }
  isLogedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!this.getToken();
      // return !!localStorage.getItem('admintoken')
    } else {
      return false;
    }
  }
 
}
