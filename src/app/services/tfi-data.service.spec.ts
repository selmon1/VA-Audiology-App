import { TestBed, async } from '@angular/core/testing';
import { ThsAnswerStrings } from '../../common/custom-resource-strings';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TfiDataService } from './tfi-data.service';

describe('TfiQuestionservice', () => {
  let service: TfiDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        TfiDataService
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    service = TestBed.get(TfiDataService);
  });
  describe('On creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
  describe ('moveStateBackward', () => {
    it('should have dataRecord start empty', () => {
      expect(service.dataRecord.length).toEqual(0);
    });
    it('should print on the console', () => {
      let spy = spyOn(console, 'log');
      service.dataRecord = [{state: 2, choice: 3}, {state: 3, choice: 2}];
      service.moveStateBackward(4);
      expect(spy).toHaveBeenCalled();
    });
    it('should decrease dataRecord length', () => {
      service.dataRecord = [{state: 2, choice: 3}, {state: 3, choice: 2}];
      service.moveStateBackward(3);
      expect(service.dataRecord.length).toEqual(1);
    });
    it('should pop dataRecord off top', () => {
      service.dataRecord = [{state: 2, choice: 3}, {state: 3, choice: 2}];
      service.moveStateBackward(3);
      expect(service.dataRecord[service.dataRecord.length - 1]).toEqual({state: 2, choice: 3});
    });
    it('should return null', () => {
      service.dataRecord = [];
      expect(service.moveStateBackward(3)).toEqual(null);
    });
  });
  describe('saveData', () => {
    it('should print on the console', () => {
      let spy = spyOn(console, 'log');
      service.saveData(1, 2);
      expect(spy).toHaveBeenCalled();
    });
    it('should increase dataRecord length', () => {
      service.dataRecord = [{state: 2, choice: 2}];
      service.saveData(1, 2);
      expect(service.dataRecord.length).toEqual(2);
    });
    it('should push a dataRecord on top', () => {
      service.dataRecord = [{state: 2, choice: 2}];
      service.saveData(1, 2);
      expect(service.dataRecord[service.dataRecord.length - 1]).toEqual({state: 1, choice: 2});
    });
    it('should return 2 for dataRecord size', () => {
      service.dataRecord = [{state: 2, choice: 3}, {state: 3, choice: 2}];
      service.saveData(2, 3);
      expect(service.dataRecord.length).toEqual(2);
    });
  });
  describe('populateAnswers', () => {
    it('should return a string', () => {
      service.dataRecord = [{state: 2, choice: 3}, {state: 3, choice: 2}];
      expect(service.populateAnswers(2, false)).toEqual('3');
    });
    it('should return an empty string', () => {
      service.dataRecord = [{state: 2, choice: 3}, {state: 3, choice: 2}];
      expect(service.populateAnswers(5, false)).toEqual('0');
    });
  });
});
