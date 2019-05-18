import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from '../environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import '../styles/styles.scss';
import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { CheckInComponent } from './check-in/check-in.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AudiologistNavigationComponent } from './audiologist-navigation/audiologist-navigation.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { SummaryComponent } from './summary/summary.component';

import { TfiComponent } from './tfi/tfi.component';
import { TfiQuestionComponent } from './tfi/tfi-question/tfi-question.component';
import { TsScreenerComponent } from './ts-screener/ts-screener.component';
import { TsScreenerStateflowService } from './services/ts-screener-stateflow.service';
import { TsScreenerDataService } from './services/ts-screener-data.service';
import { TsScreenerQuestionComponent } from './ts-screener/ts-screener-question/ts-screener-question.component';
import { TfiDataService } from './services/tfi-data.service';
import { ThsComponent } from './ths/ths.component';
import { ThsStateflowService } from './services/ths-stateflow.service';
import { ThsDataService } from './services/ths-data.service';
import { ThsQuestionComponent } from './ths/ths-question/ths-question.component';

import { RouterGuards }     from './services/router-guards.service';
import { OtoscopyComponent } from './otoscopy/otoscopy.component';
import { TympanometryComponent } from './tympanometry/tympanometry.component';
import { AudiogramComponent } from './audiogram/audiogram.component';
import { AudiologistLoginComponent } from './audiologist-login/audiologist-login.component';
import { LandingComponent } from './landing/landing.component';
import { PaComponent } from './pa/pa.component';
import { CtComponent } from './ct/ct.component';
import { MindfulnessComponent } from './mindfulness/mindfulness.component';
import { GmComponent } from './gm/gm.component';
import { RelaxationComponent } from './relaxation/relaxation.component';
import { SleepComponent } from './sleep/sleep.component';
import { SoundComponent } from './sound/sound.component';
import { FaqComponent } from './faq/faq.component';
import { AudiologistSummaryComponent } from './audiologist-summary/audiologist-summary.component';
import { TestsDataService } from './services/tests-data.service';
import { NotesComponent } from './notes/notes.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { CustomerSearchService } from './customer-search/customer-search.service';


import { ServerApiService } from './services/server-api.service';
import { HttpClientModule } from '@angular/common/http';

import { SurveySubmitHandler } from './services/api-survey.submit.service';

import { UsersComponent } from './users/users.component';

import { ApiUsersCrudService } from './services/api-users-crud.service';
import { ServerAuthenticationService } from './services/server-authentication.service';


import { CurrentUsersComponent } from './current-users/current-users.component';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular4's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent,
    LogoComponent,
    CheckInComponent,
    AppointmentsComponent,
    AudiologistNavigationComponent,
    ThankYouComponent,
    TsScreenerComponent,
    ThsComponent,
    ThsQuestionComponent,
    TfiComponent,
    TfiQuestionComponent,
    SummaryComponent,
    TsScreenerQuestionComponent,
    OtoscopyComponent,
    TympanometryComponent,
    AudiogramComponent,
    AudiologistLoginComponent,
    LandingComponent,
    PaComponent,
    CtComponent,
    MindfulnessComponent,
    GmComponent,
    RelaxationComponent,
    SleepComponent,
    SoundComponent,
    FaqComponent,
    AudiologistSummaryComponent,
    NotesComponent,
    MyAccountComponent,
    CustomerSearchComponent,
    UsersComponent,
    CurrentUsersComponent

  ],
  exports: [
    MatSliderModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    HttpModule,
    MatSliderModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    PDFExportModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    TsScreenerStateflowService,
    TsScreenerDataService,
    TfiDataService,
    ThsStateflowService,
    ThsDataService,
    RouterGuards,
    TestsDataService,
    SurveySubmitHandler,
    CustomerSearchService,
    ServerApiService,
    ApiUsersCrudService,
    ServerAuthenticationService
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues  = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
