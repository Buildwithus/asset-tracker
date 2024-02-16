import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, FormsModule,MatSelectModule,MatInputModule,MatFormFieldModule],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.css'
})
export class AssetsComponent {
  constructor(private empservice: EmployeeService) { }
  message: any;
  assign(data: any) {
    this.empservice.assignassets(data).subscribe((data) => {
      this.message = data;
      alert(this.message.message)
      console.log(data)
    })

  }
}
