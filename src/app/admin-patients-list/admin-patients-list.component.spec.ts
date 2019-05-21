import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPatientsListComponent } from './admin-patients-list.component';

describe('AdminPatientsListComponent', () => {
  let component: AdminPatientsListComponent;
  let fixture: ComponentFixture<AdminPatientsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPatientsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPatientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
