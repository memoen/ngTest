import { Component } from '@angular/core';
import {LocationUpdaterService} from './services/location-updater.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'gbk';

  constructor(private locationUpdater: LocationUpdaterService) {
  }

}
