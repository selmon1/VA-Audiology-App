import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelaxationComponent } from './relaxation.component';

describe('RelaxationComponent', () => {
  let component: RelaxationComponent;
  let fixture: ComponentFixture<RelaxationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelaxationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelaxationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
