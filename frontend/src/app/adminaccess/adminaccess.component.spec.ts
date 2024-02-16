import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaccessComponent } from './adminaccess.component';

describe('AdminaccessComponent', () => {
  let component: AdminaccessComponent;
  let fixture: ComponentFixture<AdminaccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminaccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
