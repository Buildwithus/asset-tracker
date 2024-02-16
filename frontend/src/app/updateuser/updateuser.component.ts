import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AdminserviceService } from '../services/adminservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, CommonModule],
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css'
})
export class UpdateuserComponent {
  constructor(private service: AdminserviceService, private router: Router, private route: ActivatedRoute) { }
  message: any;
  userdata: any;
  employeeupdate(id: any, data: any) {
    this.service.updateuser(id, data).subscribe((data) => {
      this.message = data;
      alert(this.message.message)
      this.router.navigate(['./home'])
    })
  }

  FindUser(id:any){
    this.service.finduser(id).subscribe((data)=>{
      this.userdata=data;
      console.log(this.userdata)
    })
  }
  id: any;

  ngOnInit() {
    this.route.params.subscribe((d) => {
      this.id = d;
    })
    this.FindUser(this.id.id);
    console.log(this.id.id)
  }

}
