import { ActivatedRouteSnapshot } from '@angular/router';
import { ViewChild, Component, ViewEncapsulation } from '@angular/core';
import { aggregateBy } from '@progress/kendo-data-query';
import { NgForm } from '@angular/forms';
import { SurveySubmitHandler } from '../services/api-survey.submit.service';
import { AudiologistSummaryComponent } from '../audiologist-summary/audiologist-summary.component';
import { Utilities } from '../common/utlilities';

@Component({
  selector: 'audio-navigation',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./audiologist-navigation.component.css'],
  templateUrl: './audiologist-navigation.component.html',
})
/**
 * This function controls the navigation sidebar.
 * Either to show the sidebar or to hide the sidebar.
 * active: boolean is a local variable will be switch between true and false to trigger the function.
 */
export class AudiologistNavigationComponent {
    @ViewChild(AudiologistSummaryComponent) summaryComponent : AudiologistSummaryComponent;

    public active: boolean = true;
    public scale: number = 0.55;
    public recommendedTests: boolean = false;
    public suggestedTests: boolean = false;
    public summary: boolean = true;

    public onToggle() {
      if (!this.active) {
          this.active = true;
          console.log('is active');
      } else {
        this.active = false;
        console.log('is active');
      }
    }

    public showRecommendedTests() {
      this.recommendedTests = true;
      this.suggestedTests = false;
      this.summary = false;
    }

    public showSuggestedTests() {
      this.recommendedTests = false;
      this.suggestedTests = true;
      this.summary = false;
    }

    public showSummary() {
      this.recommendedTests = false;
      this.suggestedTests = false;
      this.summary = true;
    }

    public submitSurvey() {
      if(this.summaryComponent != null) {
        this.summaryComponent.submitSurvey();
      }

      //let surveySubmitHandler = new SurveySubmitHandler();
      //surveySubmitHandler.submitSurvey();
    }
}
