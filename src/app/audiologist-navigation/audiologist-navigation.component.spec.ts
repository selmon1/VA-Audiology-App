import { AudiologistNavigationComponent } from './audiologist-navigation.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';
import { TabsEnum } from './navigation-aids';
import { Utilities } from '../common/utlilities';

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
    expect(component.state.tabIsSelected(TabsEnum.SUMMARY)).toBe(true);
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

  it('should test for audiologist summary to be selected', () => {
    Utilities.setSessionStorage('dataFromDB', 'true');
    component.state.selectTab(TabsEnum.SUMMARY);
    expect(component.state.tabIsSelected(TabsEnum.SUMMARY)).toBe(true);
  });

  it('should test for audiologist tests to be selected', () => {
    Utilities.setSessionStorage('dataFromDB', 'false');
    component.state.selectTab(TabsEnum.TESTS);
    expect(component.state.tabIsSelected(TabsEnum.TESTS)).toBe(true);
  });

  it('should test for audiologist notes to be selected', () => {
    Utilities.setSessionStorage('dataFromDB', 'false');
    component.state.selectTab(TabsEnum.NOTES);
    expect(component.state.tabIsSelected(TabsEnum.NOTES)).toBe(true);
  });

  it('should test for audiologist search to be selected', () => {
    Utilities.removeItemFromSessionStorage('dataFromDB');
    Utilities.setSessionStorage('permissions', 'audiologist');
    component.state.selectTab(TabsEnum.SEARCH);
    expect(component.state.tabIsSelected(TabsEnum.SEARCH)).toBe(true);
  });

  it('should test for audiologist account to be selected', () => {
    Utilities.removeItemFromSessionStorage('dataFromDB');
    Utilities.setSessionStorage('permissions', 'audiologist');
    component.state.selectTab(TabsEnum.ACCOUNT);
    expect(component.state.tabIsSelected(TabsEnum.ACCOUNT)).toBe(true);
  });

  /*
    The following tests checks to make sure that clicking on the button will trigger the method
  */
  it('should test for audiologist close button click event', () => {
    let clear = spyOn(component, 'clearData');
    let closeBtn = de.nativeElement.querySelectorAll('#close');
    closeBtn.item(0).click();
    fixture.detectChanges();
    expect(clear).toHaveBeenCalled();
  });

  it('should test for audiologist close button discard event', () => {
    let clear = spyOn(component, 'clearData');
    let discardBtn = de.nativeElement.querySelectorAll('#discard');
    discardBtn.item(0).click();
    fixture.detectChanges();
    expect(clear).toHaveBeenCalled();
  });

  it('should test for audiologist submit button click event', () => {
    let submit = spyOn(component, 'submitSurvey');
    let submitBtn = de.nativeElement.querySelectorAll('#submit');
    submitBtn.item(0).click();
    fixture.detectChanges();
    expect(submit).toHaveBeenCalled();
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
