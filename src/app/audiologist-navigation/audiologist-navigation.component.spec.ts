import { AudiologistNavigationComponent } from './audiologist-navigation.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';

/*
  Unit tests for the Audiologist Navigation component
*/
describe('Audiologist Navigation', () => {
  let component: AudiologistNavigationComponent;
  let fixture: ComponentFixture<AudiologistNavigationComponent>;
  let de: DebugElement;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ AudiologistNavigationComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(AudiologistNavigationComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test for audiologist nav bar toggle console output', () => {
    let spy = spyOn(console, 'log');
    component.onToggle();
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalled();
  });

  it('should test for audiologist landing page to be summary', () => {
    expect(component.summary).toBe(true);
  });

  /*
  Basic unit tests for each of the methods
  */
  it('should test for audiologist nav bar toggle button to be true', () => {
    component.active = false;
    fixture.detectChanges();
    component.onToggle();
    expect(component.active).toBe(true);
  });

  it('should test for audiologist nav bar toggle button to be false', () => {
    component.onToggle();
    fixture.detectChanges();
    expect(component.active).toBe(false);
  });

  it('should test for audiologist recommended tests to be true', () => {
    component.showRecommendedTests();
    expect(component.recommendedTests).toBe(true);
  });

  it('should test for audiologist suggested test to be true', () => {
    component.showSuggestedTests();
    expect(component.suggestedTests).toBe(true);
  });

  it('should test for audiologist summary to be true', () => {
    component.showSummary();
    expect(component.summary).toBe(true);
  });

  /*
    The following tests checks to make sure that clicking on the button will triggers the method
  */
  it('should test for audiologist recommendedTests button click event', () => {
    let recommended = spyOn(component, 'showRecommendedTests');
    let recommendedBtn = de.nativeElement.querySelectorAll('.left-container .main-btn');
    recommendedBtn.item(0).click();
    fixture.detectChanges();
    expect(recommended).toHaveBeenCalled();
  });

  // it('should test for audiologist suggestedTests button click event', () => {
  //   let suggested = spyOn(component, 'showSuggestedTests');
  //   let suggestedBtn = de.nativeElement.querySelectorAll('.left-container .main-btn');
  //   suggestedBtn.item(1).click();
  //   fixture.detectChanges();
  //   expect(suggested).toHaveBeenCalled();
  // });

  // it('should test for audiologist summary button click event', () => {
  //   let summary = spyOn(component, 'showSummary');
  //   let summaryBtn = de.nativeElement.querySelectorAll('.left-container .main-btn');
  //   summaryBtn.item(2).click();
  //   fixture.detectChanges();
  //   expect(summary).toHaveBeenCalled();
  // });

});
