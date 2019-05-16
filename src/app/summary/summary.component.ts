import { TsScreenerAnswerStrings } from './../common/custom-resource-strings';
import { Component, OnInit } from '@angular/core';
import { SurveyTitle, SectionTitle, SectionFooter, Question, SumString } from './summaryItem';
import { ThsDataService } from '../services/ths-data.service';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { ThsQuestionStrings, TsScreenerQuestionStrings, ThsAnswerStrings, TfiQuestionStrings, TfiSectionStrings } from '../common/custom-resource-strings';
import { ThsQuestionComponent } from 'src/app/ths/ths-question/ths-question.component';
import { SummaryResolver } from '@angular/compiler';
import { HighlightDelayBarrier } from 'blocking-proxy/built/lib/highlight_delay_barrier';
import { TfiDataService } from '../services/tfi-data.service';
import { Utilities } from '../common/utlilities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  /**
   * the patiend id that will be displayed in the summary report.
   * Connected through the session storage
   */
  public readonly patientID;
  public readonly appointmentType;

  public patientOnClick() {
    this.router.navigateByUrl('/landing');
    console.log('landing page');
  }

  /**
   * all the summary items that will be displayed in the summary report
   */
  public summaryItems = [];
  /**
   *
   * @param thsDataService the data service for ths questionare
   * @param tsDataService the data service for ts questionare
   * @param tfiDataService the date service for tfi questionare
   */
  constructor(public thsDataService: ThsDataService, public tsDataService: TsScreenerDataService, public tfiDataService: TfiDataService, private router: Router) {
    this.tsDataService.onInit();
    this.constructTSReport();
    this.thsDataService.onInit();
    this.constructTHSReport();
    this.tfiDataService.onInit();
    this.constructTFIReport();
    this.patientID = Utilities.getSessionStorage('patient-id');
    this.appointmentType = Utilities.getSessionStorage('appt');
  };

  public ngOnInit() {
  }

  /**
   * the function used to construct a ths report from the ths data services.
   */
  public constructTHSReport() {
    // Variables to record the sub score of each section
    let sectionAScore: number = 0;
    let sectionBScore: number = 0;
    let sectionCScore: number = 0;

    let totalScore: number = 0;
    let subScore: number = 0;
    let sectionActive: boolean = false;
    let history = this.thsDataService.history;
    let data = this.thsDataService.dataRecord;
    if ( history.length <= 1 ) {
      return;
    }
    this.summaryItems.push(new SurveyTitle('Tinnitus & Hearing Survey'));
    for ( let questionNum of history ){
      let question = this.getTHSQuestion(questionNum);
      if ( data.length < questionNum) {
        break;
      }

      // Save the sub score for each question
      let sumAns = data[questionNum - 1].choice as String;
      if (this.getTHSSectionTitle(questionNum) === 'A. Tinnitus') {
          sectionAScore = sectionAScore + this.getTHSChoiceNumber(sumAns);
      }
      else if (this.getTHSSectionTitle(questionNum) === 'B. Hearing') {
          sectionBScore = sectionBScore + this.getTHSChoiceNumber(sumAns);
      }
      else {
          sectionCScore = sectionCScore + this.getTHSChoiceNumber(sumAns);
      }


      if ( (questionNum - 1) % 4 === 0 && sectionActive === true) {
      //  this.summaryItems.push(new SectionFooter('Sub Score', subScore));
        subScore = 0;
      }
      if ( (questionNum - 1) % 4 === 0) {
        console.log(questionNum);
     //   this.summaryItems.push(new SectionTitle(this.getTHSSectionTitle(questionNum)));
        sectionActive = true;
      }
      let answer = data[questionNum - 1].choice as String;
      if (this.getTHSChoiceNumber(answer) !== -1) {
        subScore = subScore + this.getTHSChoiceNumber(answer);
        totalScore = totalScore + this.getTHSChoiceNumber(answer);
     //   this.summaryItems.push(new Question(question, Number(answer.charAt(0)), '-1'));
      } else {
     //   this.summaryItems.push(new Question(question, -1, answer));
      }
    }
//    this.summaryItems.push(new SectionFooter('Sub Score', subScore));
//    this.summaryItems.push(new SectionFooter('Total Score', totalScore));


    // Display the summary information
    if (sectionAScore > sectionBScore || sectionBScore === 0) {
        let ans: String = 
            "&emsp; &emsp;- Hearing aid/combination instrument consultation <br/> " + 
            "&emsp; &emsp;- Counseling for both hearing and tinnitus management options <br/> " +
            "&emsp; &emsp;- Specific tinnitus management options, such as: <br/>" + 
            "&emsp; &emsp; &emsp; &emsp;- Progressive Tinnitus Management <br/>" + 
            "&emsp; &emsp; &emsp; &emsp;- Cognitive Behavioral Therapy <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Stress Relief";
        this.summaryItems.push(new SumString(ans));
    }
    if (sectionAScore < sectionBScore) {
        let ans1: String = 
            "&emsp; &emsp;- Hearing aid/combination instrument consultation <br/> " +
            "&emsp; &emsp;- counseling for both hearing and tinnitus management options <br/> " +
            "&emsp; &emsp;- Specific hearing management options, such as: <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Hearing aids <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Hearing strategies in different environments <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Hearing aid accessories";
        this.summaryItems.push(new SumString(ans1));
    }
    if (sectionAScore === 0) {
        let ans2: String = 
            "&emsp; &emsp;- Hearing aids <br/>" +
            "&emsp; &emsp;- Hearing aid fitting <br/>" +
            "&emsp; &emsp;- Specific hearing management options, such as: <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Hearing aid counseling <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Hearing strategies in different environments <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Hearing aid accessories";
        this.summaryItems.push(new SumString(ans2));
    }
    if (sectionAScore === sectionBScore) {
        let ans3: String = 
            "&emsp; &emsp;- Hearing aid/combination instrument consultation <br/>" +
            "&emsp; &emsp;- Information about hearing and tinnitus management options <br/>" +
            "&emsp; &emsp;- Specific tinnitus management options, such as: <br/>" +
            "&emsp; &emsp;- Progressive Tinnitus Management <br/>" +
            "&emsp; &emsp;- Cognitive Behavioral Therapy <br/>" +
            "&emsp; &emsp;- Stress Relief <br/>" +
            "&emsp; &emsp;- Specific hearing management options, such as: <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Hearing aids <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Hearing strategies in different environments <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Hearing aid accessories ";
        this.summaryItems.push(new SumString(ans3));
    }
  }

  /**
   * the function that used to construct a TS Screener report for summary
   */
  public constructTSReport() {
    let history = this.tsDataService.history;
    let answers = this.tsDataService.dataRecord;
    if (history.length <= 1) {
      return;
    }
    this.summaryItems.push(new SurveyTitle('Tinnitus Screener'));
    for (let questionNum of history) {
      let question = this.getTSQuestion(questionNum);
      if ( answers.length < questionNum) {
        break;
      }
      let answer = answers[questionNum - 1].choice as String;
      let sumUp = this.getTSSummaryString(questionNum, answer);
      //this.summaryItems.push(new Question(question, -1, answer));
      this.summaryItems.push(new SumString(sumUp));
    }
  }

  /*
   * This function is used to construct a TFI report in the summary component
   */
  public constructTFIReport() {
    // Variables created by group 2 to record the score of each indivudual section
    let sec1: number = 0;
    let sec2: number = 0;
    let sec3: number = 0;
    let sec4: number = 0;
    let sec5: number = 0;
    let sec6: number = 0;
    let sec7: number = 0;
    let sec8: number = 0;

    let data = this.tfiDataService.dataRecord;
    let tfiSections = new TfiSectionStrings();
    if  (data.length < 1) {
      return;
    }

    this.summaryItems.push(new SurveyTitle('Tinnitus Functional Index'));
    for (let questionNum of data) {

      // Check the state for a new section
      if (questionNum.state < 3) {
          //this.summaryItems.push(new SectionTitle(tfiSections.section1));
          sec1 = sec1 + questionNum.choice;
      } else if (questionNum.state >= 3 && questionNum.state < 6) {
          //this.summaryItems.push(new SectionTitle(tfiSections.section2));
          sec2 = sec2 + questionNum.choice;
      } else if (questionNum.state >= 6 && questionNum.state < 9) {
          //this.summaryItems.push(new SectionTitle(tfiSections.section3));
          sec3 = sec3 + questionNum.choice;
      } else if (questionNum.state >= 9 && questionNum.state < 12) {
          //this.summaryItems.push(new SectionTitle(tfiSections.section4));
          sec4 = sec4 + questionNum.choice;
      } else if (questionNum.state >= 12 && questionNum.state < 15) {
          //this.summaryItems.push(new SectionTitle(tfiSections.section5));
          sec5 = sec5 + questionNum.choice;
      } else if (questionNum.state >= 15 && questionNum.state < 18) {
          //this.summaryItems.push(new SectionTitle(tfiSections.section6));
          sec6 = sec6 + questionNum.choice;
      } else if (questionNum.state >= 18 && questionNum.state < 22) {
          //this.summaryItems.push(new SectionTitle(tfiSections.section7));
          sec7 = sec7 + questionNum.choice;
      } else if (questionNum.state >= 22) {
          //this.summaryItems.push(new SectionTitle(tfiSections.section8));
          sec8 = sec8 + questionNum.choice;
      }
      //let question = this.getTFIQuestion(questionNum.state);
      //let answer = questionNum.choice;
      //this.summaryItems.push(new Question(question, answer, '-1'));
    }

    // Now that I have each of the scores I have to find out which are the top 3 highest
    var scores = [sec1, sec2, sec3, sec4, sec5, sec6, sec7, sec8];
    var max = Math.max.apply(null, scores);
    var maxi1 = scores.indexOf(max);
    scores[maxi1] = -Infinity;
    var max2 = Math.max.apply(null, scores);
    var maxi2 = scores.indexOf(max2);
    scores[maxi2] = -Infinity;
    var max3 = Math.max.apply(null, scores);
    var maxi3 = scores.indexOf(max3);
    scores[maxi3] = -Infinity;

    // The summary has two different responses for the TFI screen.
    // We display them depending on which sections are in the highest scoring ones
    // Both sections can be displayed, which is why both if statements can be reached
    if (maxi1 <= 3 && maxi2 <= 3 && maxi3 <= 3) {
        let TFIans1: String =
            "&emsp; &emsp;-	You consider your tinnitus intrusive to your daily life and your audiologist may suggest these options for you: <br/>" +
            "&emsp; &emsp;- A hearing aid consultation for hearing difficulties<br/>" +
            "&emsp; &emsp;- Educational counseling about tinnitus including: <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Why do we think tinnitus occurs? <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Association with hearing loss <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Using sound as management<br/>" +
            "&emsp; &emsp;- Specific sound options that may help to manage your tinnitus: <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Apps: Calm, ReSound Relief, Mindfulness, Pandora Radio, Spotify, YouTube, Audible  <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Soothing sounds: babbling brook, ocean waves, forest sounds, etc. <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Interesting sounds: audio books, TV, radio <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Background sounds: environmental sounds, TV, music<br/>" +
            "&emsp; &emsp;- Progressive Tinnitus Management  ";
           
        this.summaryItems.push(new SumString(TFIans1));
    }
    else {
        let TFIans2: String =
            "&emsp; &emsp;-	You consider your tinnitus intrusive to your daily life and your audiologist may suggest these options for you: <br/>" +
            "&emsp; &emsp;- A hearing aid consultation for hearing difficulties<br/>" +
            "&emsp; &emsp;- Educational counseling about tinnitus including: <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Hearing aids/combination units <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Why do we think tinnitus occurs? <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Association with hearing loss <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Using sound as management<br/>" +
            "&emsp; &emsp; &emsp; &emsp;- What combination units offer<br/>" +
            "&emsp; &emsp;- Specific sound options that may help to manage your tinnitus: <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Apps: Calm, ReSound Relief, Mindfulness, Pandora Radio, Spotify, YouTube, Audible  <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Soothing sounds: babbling brook, ocean waves, forest sounds, etc. <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Interesting sounds: audio books, TV, radio <br/>" +
            "&emsp; &emsp; &emsp; &emsp;- Background sounds: environmental sounds, TV, music<br/>" +
            "&emsp; &emsp;- Progressive Tinnitus Management  "; 
        this.summaryItems.push(new SumString(TFIans2));
    }
  }

  /**
   * grab the section titles for ths survey.
   * @param questionNumber the question id that will be displayed.
   */
  public getTHSSectionTitle(questionNumber: number) {
    let part = parseInt( '' + ( ( questionNumber - 1) / 4.0 ), null );
    switch ( part ) {
      case 0: return 'A. Tinnitus';
      case 1: return 'B. Hearing';
      default: return 'C. Sound Tolerance';
      // default: return 'not assigned';
    }
  }

  /**
   * grab the question string for ths survey.
   * @param qNumber the question id that will be displayed
   */
  public getTHSQuestion(qNumber: number) {
    let thsQuestions = new ThsQuestionStrings();
    switch (qNumber) {
      case 1: return thsQuestions.question1;
      case 2: return thsQuestions.question2;
      case 3: return thsQuestions.question3;
      case 4: return thsQuestions.question4;
      case 5: return thsQuestions.question5;
      case 6: return thsQuestions.question6;
      case 7: return thsQuestions.question7;
      case 8: return thsQuestions.question8;
      case 9: return thsQuestions.question9;
      case 10: return thsQuestions.question10;
      default: return 'missing';
    }
  }

  /**
   * grab the question string for ts screener.
   * @param qNumber the question id that will be displayed
   */
  public getTSQuestion(qNumber: number) {
    let tsScreenerQuestions = new TsScreenerQuestionStrings();
    switch ( qNumber ) {
      case 1: return tsScreenerQuestions.question1;
      case 2: return tsScreenerQuestions.question2;
      case 3: return tsScreenerQuestions.question3;
      case 4: return tsScreenerQuestions.question4;
      case 5: return tsScreenerQuestions.question5;
      case 6: return tsScreenerQuestions.question6;
      default: return 'missing';
    }
  }

  /**
   * grab the choice number by the answer string.
   * @param answer the answer strings that used to grab scores.
   */
  public getTSChoiceNumber(answer: String) {
    let tsAnswers = new TsScreenerAnswerStrings();
    switch ( answer ) {
      case tsAnswers.YES: return 1;
      case tsAnswers.NO: return 0;
      case tsAnswers.ALWAYS: return 2;
      case tsAnswers.USUALLY: return 1;
      case tsAnswers.SOMETIMES_OCCASIONALLY: return 0;
      case tsAnswers.YES_ALWAYS: return 3;
      case tsAnswers.YES_SOMETIMES: return 0;
      case tsAnswers.DAILY_OR_WEEKLY_BASIS: return 2;
      case tsAnswers.MONTHLY_OR_YEARLY_BASIS: return 1;
      default: return -1;
    }
  }

    /**
     *Grab the correct summary sentence based on the questions answer
     * @param qNumber the question number
     * @param answer the questions answer
     */
  public getTSSummaryString(qNumber: number, answer: String) {
      let tsAnswers = new TsScreenerAnswerStrings();
      switch (qNumber) {
          case 1: {
              if (tsAnswers.YES) {
                  let ans: String = "It is normal to experience a burst of sound (typically a high-pitched tone) for a couple of seconds that eventually fades away." +
                      "  Sometimes hearing loss can cause difficulty hearing in certain situations, such as those with background noise. Tinnitus is a separate condition that is an internal head noise.It can sometimes cause annoyance and anxiety, but can be managed so that you daily life is not negatively impacted by it. " +
                      "3.	Talk to your audiologist about specific types of management options. ";
                  return ans;
              }
              else {
                  return "";
              }
          }   
          case 2: {
              return "";
          }
          case 3: {
              if (tsAnswers.ALWAYS) {
                  let ans: String = "You have constant tinnitus, which means you experience tinnitus all the time. You will complete an audiology test today and your audiologist will explain it to you and why that relates to your tinnitus.";
                  return ans;
              }
              else if (tsAnswers.USUALLY) {
                  let ans: String = "You have constant tinnitus, which means you experience tinnitus all the time. You will complete an audiology test today and your audiologist will explain it to you and why that relates to your tinnitus.";
                  return ans;
              }
              else {
                  let ans: String = "";
                  return ans;
              }
          }
          case 4: {
              if (tsAnswers.YES_ALWAYS) {
                  let ans: String = "You have Temporary Tinnitus, which means that it is associated with a specific event. You are going to learn about hearing conservation and should monitor your tinnitus symptoms as appropriate. You’re going to have an audiologic exam and your audiologist will talk you through some tinnitus management options.";
                  return ans;
              }
              else {
                  return "";
              }
          } 
          case 5: {
              if (tsAnswers.NO) {
                  let ans: String = "You have Temporary Tinnitus, which means that it is associated with a specific event. You are going to learn about hearing conservation and should monitor your tinnitus symptoms as appropriate. You’re going to have an audiologic exam and your audiologist will talk you through some tinnitus management options.";
                  return ans;
              }
              else {
                  return "";
              }
          } 
          case 6: {
              if (tsAnswers.DAILY_OR_WEEKLY_BASIS) {
                  let ans: String = "You have Intermittent Tinnitus, which means that you experience tinnitus every day or week. You are going to have an audiology test and a brief tinnitus assessment. Your audiologist will give you more information about hearing and tinnitus and can talk to you about specific management options. ";
                  return ans;
              }
              else {
                  let ans: String = "You have Occasional Tinnitus, which means that you experience tinnitus every few weeks or months. Your audiologist will talk to you about hearing conservation and ask you to monitor your symptoms as appropriate. You will also have an audiology test and tinnitus management options will be discussed if you consider it bothersome. ";
                  return ans;
              }
          } 
          default: return 'missing';
      }

  }

  public getTHSChoiceNumber(answer: String) {
    let thsAnswers = new ThsAnswerStrings();
    switch (answer) {
      case thsAnswers.NO: return 0;
      case thsAnswers.SMALL_YES: return 1;
      case thsAnswers.MODERATE_YES: return 2;
      case thsAnswers.BIG_YES: return 3;
      case thsAnswers.VERY_BIG_YES: return 4;
      default: return -1;
    }
  }
   /*
    * get the TFI question strings
    * @param qNumber
    */
   public getTFIQuestion(qNumber: number) {
     let tfiQuestions = new TfiQuestionStrings();
     switch ( qNumber ) {
       case 0: return tfiQuestions.question1;
       case 1: return tfiQuestions.question2;
       case 2: return tfiQuestions.question3;
       case 3: return tfiQuestions.question4;
       case 4: return tfiQuestions.question5;
       case 5: return tfiQuestions.question6;
       case 6: return tfiQuestions.question7;
       case 7: return tfiQuestions.question8;
       case 8: return tfiQuestions.question9;
       case 9: return tfiQuestions.question10;
       case 10: return tfiQuestions.question11;
       case 11: return tfiQuestions.question12;
       case 12: return tfiQuestions.question13;
       case 13: return tfiQuestions.question14;
       case 14: return tfiQuestions.question15;
       case 15: return tfiQuestions.question16;
       case 16: return tfiQuestions.question17;
       case 17: return tfiQuestions.question18;
       case 18: return tfiQuestions.question19;
       case 19: return tfiQuestions.question20;
       case 20: return tfiQuestions.question21;
       case 21: return tfiQuestions.question22;
       case 22: return tfiQuestions.question23;
       case 23: return tfiQuestions.question24;
       case 24: return tfiQuestions.question25;
       default: return 'missing';
     }
   }
}


