import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
    <main class="mainPage">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {

  constructor(
    public appState: AppState
  ) {}

}
