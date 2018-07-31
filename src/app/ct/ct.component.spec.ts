import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtComponent } from './ct.component';

describe('CtComponent', () => {
  let component: CtComponent;
  let fixture: ComponentFixture<CtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
