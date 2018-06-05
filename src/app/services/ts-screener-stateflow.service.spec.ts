import { TestBed, async } from '@angular/core/testing';
import { ThsAnswerStrings } from '../../common/custom-resource-strings';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ThsStateflowService } from './ths-stateflow.service';
import { ThsDataService } from './ths-data.service';
import { TsScreenerStateflowService } from './ts-screener-stateflow.service';
import { TsScreenerDataService } from './ts-screener-data.service';

describe('TsScreenerStateflowService', () => {
  let service: TsScreenerStateflowService;
  let dataService: TsScreenerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        TsScreenerStateflowService,
        TsScreenerDataService
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    service = TestBed.get(TsScreenerStateflowService);
    dataService = TestBed.get(TsScreenerDataService);
  });

  describe('On creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('moveStateBackward', () => {
    it('should return integer', () => {
      let spy = spyOn(dataService, 'moveStateBackward').and.returnValue(5);
      expect(service.moveStateBackward(7)).toEqual(5);
    });
  });

  describe('moveStateForward', () => {
    it('should return 7 from (1, NO)', () => {
      let spy = spyOn(dataService, 'saveData').and.returnValue(5);
      expect(service.moveStateForward(1, 'NO')).toEqual(7);
    });
    it('should return 2 from (1, YES)', () => {
      let spy = spyOn(dataService, 'saveData').and.returnValue(5);
      expect(service.moveStateForward(1, 'YES')).toEqual(2);
    });
    it('should return 3 from (2, TEST)', () => {
      let spy = spyOn(dataService, 'saveData').and.returnValue(5);
      expect(service.moveStateForward(2, 'TEST')).toEqual(3);
    });
    it('should return 4 from (3, SOMETIMES_OCCASIONALLY)', () => {
      let spy = spyOn(dataService, 'saveData').and.returnValue(5);
      expect(service.moveStateForward(3, 'Sometimes/Occasionally')).toEqual(4);
    });
    it('should return 7 from (3, 1-hello)', () => {
      let spy = spyOn(dataService, 'saveData').and.returnValue(5);
      expect(service.moveStateForward(3, '1 - hello')).toEqual(7);
    });
    it('should return 5 from (4, YES, Sometimes)', () => {
      let spy = spyOn(dataService, 'saveData').and.returnValue(5);
      expect(service.moveStateForward(4, 'YES, Sometimes')).toEqual(5);
    });

    it('should return 6 from (4, NO)', () => {
      let spy = spyOn(dataService, 'saveData').and.returnValue(5);
      expect(service.moveStateForward(4, 'NO')).toEqual(6);
    });
    it('should return 7 from (4, TEST)', () => {
      let spy = spyOn(dataService, 'saveData').and.returnValue(5);
      expect(service.moveStateForward(4, 'TEST')).toEqual(7);
    });
    it('should return 6 from (5, YES)', () => {
      let spy = spyOn(dataService, 'saveData').and.returnValue(5);
      expect(service.moveStateForward(5, 'YES')).toEqual(6);
    });
    it('should return 7 from (5, TEST)', () => {
      let spy = spyOn(dataService, 'saveData').and.returnValue(5);
      expect(service.moveStateForward(5, 'TEST')).toEqual(7);
    });
    it('should return incremented', () => {
      let spy = spyOn(dataService, 'saveData').and.returnValue(5);
      expect(service.moveStateForward(6, 'hello')).toEqual(7);
    });
    it('should return 7 with default', () => {
      let spy = spyOn(dataService, 'saveData').and.returnValue(5);
      expect(service.moveStateForward(7, 'default')).toEqual(7);
    });
  });
});
