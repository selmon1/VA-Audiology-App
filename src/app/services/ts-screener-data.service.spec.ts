import { TestBed } from '@angular/core/testing';
import { ThsAnswerStrings } from '../../common/custom-resource-strings';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TsScreenerDataService } from './ts-screener-data.service';

describe('TsScreenerDataService', () => {
  let service: TsScreenerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        TsScreenerDataService
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    service = TestBed.get(TsScreenerDataService);
  });

  describe('On creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('moveStateBackward', () => {
    it('should return null', () => {
      service.history = [];
      expect(service.moveStateBackward(1)).toEqual(null);
    });

    it('should pop history', () => {
      service.history = [1, 2];
      service.moveStateBackward(4);
      expect(service.history[0]).toEqual(1);
    });

    it('should print on the console', () => {
      service.history = [1, 2];
      let spy = spyOn(console, 'log');
      service.moveStateBackward(4);
      expect(spy).toHaveBeenCalled();
    });

    it('should return 1 for dataRecord size', () => {
      service.history = [1, 2];
      service.dataRecord = [{state: 2, choice: 3}, {state: 3, choice: 2}];
      service.moveStateBackward(2);
      expect(service.dataRecord.length).toEqual(1);
    });

    it('should return 2 for dataRecord size', () => {
      service.history = [1, 2];
      service.dataRecord = [{state: 2, choice: 3}, {state: 3, choice: 2}];
      service.moveStateBackward(4);
      expect(service.dataRecord.length).toEqual(2);
    });
    it('should return 1', () => {
      service.history = [1, 2];
      expect(service.moveStateBackward(1)).toEqual(1);
    });
  });

  describe('saveData', () => {
    it('should print on the console', () => {
      let spy = spyOn(console, 'log');
      service.saveData(1, 'test');
      expect(spy).toHaveBeenCalled();
    });

    it('should push a data record', () => {
      service.history = [1];
      service.saveData(2, 'test');
      expect(service.dataRecord.length).toEqual(1);
      expect(service.dataRecord[0].state).toEqual(1);
    });

    it('should push a history record', () => {
      service.history = [1];
      service.saveData(2, 'test');
      expect(service.history[1]).toEqual(2);
    });

    it('should return 2 for dataRecord size', () => {
      service.dataRecord = [{state: 2, choice: 3}, {state: 3, choice: 2}];
      service.saveData(4, 'Hello');
      expect(service.dataRecord.length).toEqual(3);
    });

    it('should saving an existing data record', () => {
      service.dataRecord = [{state: 1, choice: 2}];
      service.saveData(2, 'test');
      service.saveData(2, 'overwriten');
      expect(service.dataRecord.length).toEqual(2);
    });
  });

  describe('populateAnswers', () => {
    it('should return a string', () => {
      service.dataRecord = [{state: 2, choice: 3}, {state: 3, choice: 2}];
      expect(service.populateAnswers(2)).toEqual(3);
    });

    it('should return an empty string', () => {
      service.dataRecord = [{state: 2, choice: 3}, {state: 3, choice: 2}];
      expect(service.populateAnswers(5)).toEqual('');
    });

    it('should return empty dataRecord', () => {
      service.dataRecord = null;
      expect(service.populateAnswers(1)).toEqual('');
    });
  });
});
