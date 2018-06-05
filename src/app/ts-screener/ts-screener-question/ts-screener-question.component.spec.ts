import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ThsAnswerStrings } from '../../common/custom-resource-strings';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ThsStateflowService } from '../../services/ths-stateflow.service';
import { ThsDataService } from '../../services/ths-data.service';
import { ThsQuestionComponent } from './ths-question.component';
import { TsScreenerQuestionComponent } from './ts-screener-question.component';
import { TsScreenerStateflowService } from '../../services/ts-screener-stateflow.service';
import { TsScreenerDataService } from '../../services/ts-screener-data.service';

describe('ThsQuestionComponent', () => {
  let component: TsScreenerQuestionComponent;
  let service: TsScreenerStateflowService;
  let fixture: ComponentFixture<TsScreenerQuestionComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        TsScreenerStateflowService,
        TsScreenerDataService
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        TsScreenerQuestionComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TsScreenerQuestionComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    service = TestBed.get(TsScreenerStateflowService);
  });

  describe('On creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should get resource TsScreenerAnswerStrings answer 0', () => {
      expect(component.radio1).toBe('YES');
    });
  });
});
