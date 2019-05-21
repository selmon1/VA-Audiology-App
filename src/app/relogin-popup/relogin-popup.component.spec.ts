import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloginPopupComponent } from './relogin-popup.component';

describe('ReloginPopupComponent', () => {
  let component: ReloginPopupComponent;
  let fixture: ComponentFixture<ReloginPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReloginPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloginPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
