// tslint:disable-next-line:max-line-length
import { AudiologistNavigationComponent } from './audiologist-navigation/audiologist-navigation.component';
import { CheckInComponent } from './check-in/check-in.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { SummaryComponent } from './summary/summary.component';

import { DataResolver } from './app.resolver';
import { TsScreenerComponent } from './ts-screener/ts-screener.component';
import { TfiComponent } from './tfi/tfi.component';
import { ThsComponent } from './ths/ths.component';

import { RouterGuards } from './services/router-guards.service';
import { AudiologistLoginComponent } from './audiologist-login/audiologist-login.component';
import { LandingComponent } from './landing/landing.component';
import { SleepComponent } from './sleep/sleep.component';

// URL paths to redirect to and load components when appropriate
export const ROUTES: Routes = [
  { path: '',      redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'login', component: CheckInComponent},
  { path: 'appointments', component: AppointmentsComponent, canActivate: [RouterGuards]},
  { path: 'audiologist', component: AudiologistNavigationComponent, canActivate: [RouterGuards]},
  { path: 'thank-you', component: ThankYouComponent, canActivate: [RouterGuards]},
  { path: 'summary', component: SummaryComponent, canActivate: [RouterGuards] },
  { path: 'ts', component: TsScreenerComponent, canActivate: [RouterGuards]},
  { path: 'tfi', component: TfiComponent, canActivate: [RouterGuards] },
  { path: 'ths', component: ThsComponent, canActivate: [RouterGuards]},
	{ path: 'aud-login', component: AudiologistLoginComponent, canActivate: [RouterGuards]},
	{ path: 'landing', component: LandingComponent, canActivate: [RouterGuards]},
  { path: 'sleep', component: SleepComponent, canActivate: [RouterGuards]},
  { path: '**',    component: NoContentComponent },
];
