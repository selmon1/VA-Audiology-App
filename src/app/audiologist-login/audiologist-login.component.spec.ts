import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiologistLoginComponent } from './audiologist-login.component';

describe('AudiologistLoginComponent', () => {
  let component: AudiologistLoginComponent;
  let fixture: ComponentFixture<AudiologistLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiologistLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiologistLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
