import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindfulnessComponent } from './mindfulness.component';

describe('MindfulnessComponent', () => {
  let component: MindfulnessComponent;
  let fixture: ComponentFixture<MindfulnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindfulnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindfulnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
