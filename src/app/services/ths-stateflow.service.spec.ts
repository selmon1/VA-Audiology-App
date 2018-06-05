import { TestBed, async } from '@angular/core/testing';
import { ThsAnswerStrings } from '../../common/custom-resource-strings';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ThsStateflowService } from './ths-stateflow.service';
import { ThsDataService } from './ths-data.service';

describe('ThsQuestionservice', () => {
  let service: ThsStateflowService;
  let dataService: ThsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
        ],
        providers: [
          ThsStateflowService,
          ThsDataService
        ],
        schemas: [NO_ERRORS_SCHEMA],
    });

    service = TestBed.get(ThsStateflowService);
    dataService = TestBed.get(ThsDataService);
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
    it('should return 10', () => {
        let spy = spyOn(dataService, 'saveData').and.returnValue(5);
        expect(service.moveStateForward(9, '1 - hello')).toEqual(10);
    });

    it('should return 11', () => {
        let spy = spyOn(dataService, 'saveData').and.returnValue(5);
        expect(service.moveStateForward(9, '0 - hello')).toEqual(11);
    });

    it('should return incremented', () => {
        let spy = spyOn(dataService, 'saveData').and.returnValue(5);
        expect(service.moveStateForward(7, 'hello')).toEqual(8);
    });
  });
});
