import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPatientListModalComponent } from './admin-patient-list-modal.component';

describe('AdminPatientListModalComponent', () => {
  let component: AdminPatientListModalComponent;
  let fixture: ComponentFixture<AdminPatientListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPatientListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPatientListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
