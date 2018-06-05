import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ThsAnswerStrings } from '../../common/custom-resource-strings';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ThsStateflowService } from '../../services/ths-stateflow.service';
import { ThsDataService } from '../../services/ths-data.service';
import { ThsQuestionComponent } from './ths-question.component';

describe('ThsQuestionComponent', () => {
  let component: ThsQuestionComponent;
  let service: ThsStateflowService;
  let fixture: ComponentFixture<ThsQuestionComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
        ],
        providers: [
          ThsStateflowService,
          ThsDataService
        ],
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [
          ThsQuestionComponent
        ],
    }).compileComponents();

    fixture = TestBed.createComponent(ThsQuestionComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    service = TestBed.get(ThsStateflowService);
  });

  describe('On creation', () => {
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get resource ThsAnswerStrings answer 0', () => {
        expect(component.radio1).toBe('0 - No, not a problem');
    });
  });
});
