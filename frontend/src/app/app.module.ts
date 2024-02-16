
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminserviceService } from './services/adminservice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        NgbModal,
    ],
    providers: [AdminserviceService],
    bootstrap: [AppComponent]
})
export class AppModule { }