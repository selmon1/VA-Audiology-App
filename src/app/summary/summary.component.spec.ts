import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SummaryComponent } from './summary.component';
import {
  TfiQuestionStrings,
  ThsAnswerStrings,
  ThsQuestionStrings, TsScreenerAnswerStrings,
  TsScreenerQuestionStrings
} from '../common/custom-resource-strings';
import { ThsDataService } from '../services/ths-data.service';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { TfiDataService } from '../services/tfi-data.service';
describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ThsDataService, TsScreenerDataService, TfiDataService],
      declarations: [SummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    // service = TestBed.get(SummaryComponent);
  });
  describe('constructTHSReport', () => {
    it('should not set summary to anything if theres no histroy', () => {
      sessionStorage.clear();
      component.thsDataService.history = [];
      component.summaryItems = [];
      component.constructTHSReport();
      expect(component.summaryItems.length).toEqual(0);
    });
    it('should check data.length bounds', () => {
      sessionStorage.clear();
      component.thsDataService.dataRecord = [{state: 1, choice: 1}];
      component.thsDataService.history = [7, 5, 6, 7, 8, 2];
      component.constructTHSReport();
      expect(component.summaryItems.length).toEqual(3);
    });
    it('should check if Sub Score can be printed', () => {
      sessionStorage.clear();
      let ths = new ThsAnswerStrings();
      component.thsDataService.dataRecord = [{state: 1, choice: ths.NO}, {state: 2, choice: ths.NO},
        {state: 3, choice: ths.NO}, {state: 4, choice: ths.NO}, {state: 4, choice: ths.NO}, {state: 4, choice: ths.NO}];
      component.thsDataService.history = [5, 5, 5, 9];
      component.constructTHSReport();
    });
    it('should check for wrong answers', () => {
      sessionStorage.clear();
      let ths = new ThsAnswerStrings();
      component.thsDataService.dataRecord = [{state: 1, choice: ths.NO}, {state: 2, choice: ths.NO},
                                             {state: 3, choice: ths.NO}, {state: 4, choice: ths.NO}];
      component.thsDataService.history = [1, 2, 3, 4, 5, 7, 5, 5, 5, 9];
      component.constructTHSReport();
      expect(component.summaryItems.length).toEqual(8);
    });
  });
  describe('constructTSReport', () => {
    it('should not set summary to anything if theres no histroy', () => {
      sessionStorage.clear();
      component.tsDataService.history = [];
      component.summaryItems = [];
      component.constructTSReport();
      expect(component.summaryItems.length).toEqual(0);
    });
    it('should not set summary to anything if theres no data', () => {
      sessionStorage.clear();
      component.tsDataService.dataRecord = [];
      component.summaryItems = [];
      component.constructTSReport();
      expect(component.summaryItems.length).toEqual(0);
    });
  });
  describe('constructTFIReport', () => {
    it('should properly construct report', () => {
      sessionStorage.clear();
      component.summaryItems = [];
      component.tfiDataService.dataRecord = [{state: 0, choice: 3}, {state: 3, choice: 2}, {state: 6, choice: 2}, {state: 9, choice: 1},
                                            {state: 12, choice: 1}, {state: 15, choice: 5}, {state: 18, choice: 1}, {state: 22, choice: 2}];
      component.constructTFIReport();
      expect(component.summaryItems.length).toEqual(17);
    });
  });
  describe('getTHSSectionTitle', () => {
    it('should return A', () => {
      expect(component.getTHSSectionTitle(1)).toEqual('A. Tinnitus');
    });
    it('should return B', () => {
      expect(component.getTHSSectionTitle(5)).toEqual('B. Hearing');
    });
    it('should return C', () => {
      expect(component.getTHSSectionTitle(9)).toEqual('C. Sound Tolerance');
    });
  });
  describe('getTHSQuestion', () => {
    it('should return question1', () => {
      let questions = new ThsQuestionStrings();
      expect(component.getTHSQuestion(1)).toEqual(questions.question1);
    });
    it('should return question2', () => {
      let questions = new ThsQuestionStrings();
      expect(component.getTHSQuestion(2)).toEqual(questions.question2);
    });
    it('should return question3', () => {
      let questions = new ThsQuestionStrings();
      expect(component.getTHSQuestion(3)).toEqual(questions.question3);
    });
    it('should return question4', () => {
      let questions = new ThsQuestionStrings();
      expect(component.getTHSQuestion(4)).toEqual(questions.question4);
    });
    it('should return question5', () => {
      let questions = new ThsQuestionStrings();
      expect(component.getTHSQuestion(5)).toEqual(questions.question5);
    });
    it('should return question6', () => {
      let questions = new ThsQuestionStrings();
      expect(component.getTHSQuestion(6)).toEqual(questions.question6);
    });
    it('should return question7', () => {
      let questions = new ThsQuestionStrings();
      expect(component.getTHSQuestion(7)).toEqual(questions.question7);
    });
    it('should return question8', () => {
      let questions = new ThsQuestionStrings();
      expect(component.getTHSQuestion(8)).toEqual(questions.question8);
    });
    it('should return question9', () => {
      let questions = new ThsQuestionStrings();
      expect(component.getTHSQuestion(9)).toEqual(questions.question9);
    });
    it('should return question10', () => {
      let questions = new ThsQuestionStrings();
      expect(component.getTHSQuestion(10)).toEqual(questions.question10);
    });
    it('should return missing', () => {
      let questions = new ThsQuestionStrings();
      expect(component.getTHSQuestion(100)).toEqual('missing');
    });
  });
  describe('getTSQuestion', () => {
    it('should return question1', () => {
      let questions = new TsScreenerQuestionStrings();
      expect(component.getTSQuestion(1)).toEqual(questions.question1);
    });
    it('should return question2', () => {
      let questions = new TsScreenerQuestionStrings();
      expect(component.getTSQuestion(2)).toEqual(questions.question2);
    });
    it('should return question3', () => {
      let questions = new TsScreenerQuestionStrings();
      expect(component.getTSQuestion(3)).toEqual(questions.question3);
    });
    it('should return question4', () => {
      let questions = new TsScreenerQuestionStrings();
      expect(component.getTSQuestion(4)).toEqual(questions.question4);
    });
    it('should return question5', () => {
      let questions = new TsScreenerQuestionStrings();
      expect(component.getTSQuestion(5)).toEqual(questions.question5);
    });
    it('should return question6', () => {
      let questions = new TsScreenerQuestionStrings();
      expect(component.getTSQuestion(6)).toEqual(questions.question6);
    });
    it('should return missing', () => {
      let questions = new TsScreenerQuestionStrings();
      expect(component.getTSQuestion(100)).toEqual('missing');
    });
  });
  describe('getTSChoiceNumber', () => {
    it('should return 1 on YES', () => {
      let questions = new TsScreenerAnswerStrings();
      expect(component.getTSChoiceNumber(questions.YES)).toEqual(1);
    });
    it('should return 0 on NO', () => {
      let questions = new TsScreenerAnswerStrings();
      expect(component.getTSChoiceNumber(questions.NO)).toEqual(0);
    });
    it('should return 2 on ALWAYS', () => {
      let questions = new TsScreenerAnswerStrings();
      expect(component.getTSChoiceNumber(questions.ALWAYS)).toEqual(2);
    });
    it('should return 1 on USUALLY', () => {
      let questions = new TsScreenerAnswerStrings();
      expect(component.getTSChoiceNumber(questions.USUALLY)).toEqual(1);
    });
    it('should return 0 on SOMETIMES_OCCASIONALLY', () => {
      let questions = new TsScreenerAnswerStrings();
      expect(component.getTSChoiceNumber(questions.SOMETIMES_OCCASIONALLY)).toEqual(0);
    });
    it('should return 3 on YES_ALWAYS', () => {
      let questions = new TsScreenerAnswerStrings();
      expect(component.getTSChoiceNumber(questions.YES_ALWAYS)).toEqual(3);
    });
    it('should return 0 on YES_SOMETIMES', () => {
      let questions = new TsScreenerAnswerStrings();
      expect(component.getTSChoiceNumber(questions.YES_SOMETIMES)).toEqual(0);
    });
    it('should return 2 on DAILY_OR_WEEKLY_BASIS', () => {
      let questions = new TsScreenerAnswerStrings();
      expect(component.getTSChoiceNumber(questions.DAILY_OR_WEEKLY_BASIS)).toEqual(2);
    });
    it('should return 1 on MONTHLY_OR_YEARLY_BASIS', () => {
      let questions = new TsScreenerAnswerStrings();
      expect(component.getTSChoiceNumber(questions.MONTHLY_OR_YEARLY_BASIS)).toEqual(1);
    });
    it('should return -1 on TEST', () => {
      let questions = new TsScreenerAnswerStrings();
      expect(component.getTSChoiceNumber('TEST')).toEqual(-1);
    });
  });
  describe('getTHSChoiceNumber', () => {
    it('should return 0 on NO', () => {
      let questions = new ThsAnswerStrings();
      expect(component.getTHSChoiceNumber(questions.NO)).toEqual(0);
    });
    it('should return 1 on SMALL_YES', () => {
      let questions = new ThsAnswerStrings();
      expect(component.getTHSChoiceNumber(questions.SMALL_YES)).toEqual(1);
    });
    it('should return 2 on MODERATE_YES', () => {
      let questions = new ThsAnswerStrings();
      expect(component.getTHSChoiceNumber(questions.MODERATE_YES)).toEqual(2);
    });
    it('should return 3 on BIG_YES', () => {
      let questions = new ThsAnswerStrings();
      expect(component.getTHSChoiceNumber(questions.BIG_YES)).toEqual(3);
    });
    it('should return 4 on YES', () => {
      let questions = new ThsAnswerStrings();
      expect(component.getTHSChoiceNumber(questions.VERY_BIG_YES)).toEqual(4);
    });
    it('should return -1 on wrong string', () => {
      let questions = new ThsAnswerStrings();
      expect(component.getTHSChoiceNumber('TEST')).toEqual(-1);
    });
  });
  describe('getTFIQuestion', () => {
    it('should pass with each case statement', () => {
      let questions = new TfiQuestionStrings();
      expect(component.getTFIQuestion(0)).toEqual(questions.question1);
      expect(component.getTFIQuestion(1)).toEqual(questions.question2);
      expect(component.getTFIQuestion(2)).toEqual(questions.question3);
      expect(component.getTFIQuestion(3)).toEqual(questions.question4);
      expect(component.getTFIQuestion(4)).toEqual(questions.question5);
      expect(component.getTFIQuestion(5)).toEqual(questions.question6);
      expect(component.getTFIQuestion(6)).toEqual(questions.question7);
      expect(component.getTFIQuestion(7)).toEqual(questions.question8);
      expect(component.getTFIQuestion(8)).toEqual(questions.question9);
      expect(component.getTFIQuestion(9)).toEqual(questions.question10);
      expect(component.getTFIQuestion(10)).toEqual(questions.question11);
      expect(component.getTFIQuestion(11)).toEqual(questions.question12);
      expect(component.getTFIQuestion(12)).toEqual(questions.question13);
      expect(component.getTFIQuestion(13)).toEqual(questions.question14);
      expect(component.getTFIQuestion(14)).toEqual(questions.question15);
      expect(component.getTFIQuestion(15)).toEqual(questions.question16);
      expect(component.getTFIQuestion(16)).toEqual(questions.question17);
      expect(component.getTFIQuestion(17)).toEqual(questions.question18);
      expect(component.getTFIQuestion(18)).toEqual(questions.question19);
      expect(component.getTFIQuestion(19)).toEqual(questions.question20);
      expect(component.getTFIQuestion(20)).toEqual(questions.question21);
      expect(component.getTFIQuestion(21)).toEqual(questions.question22);
      expect(component.getTFIQuestion(22)).toEqual(questions.question23);
      expect(component.getTFIQuestion(23)).toEqual(questions.question24);
      expect(component.getTFIQuestion(24)).toEqual(questions.question25);
      expect(component.getTFIQuestion(100)).toEqual('missing');
    });
  });
});
