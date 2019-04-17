import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiologistSummaryComponent } from './audiologist-summary.component';

describe('AudiologistSummaryComponent', () => {
  let component: AudiologistSummaryComponent;
  let fixture: ComponentFixture<AudiologistSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiologistSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiologistSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
