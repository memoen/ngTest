import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {debounce, debounceTime, first, startWith} from 'rxjs/operators';
import {interval, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.sass']
})
export class PageContainerComponent implements OnInit {

  private viewType = 'list';
  public filterName = new FormControl('');
  filterAsync;

  get ViewType() {
    return this.viewType;
  }

  set ViewType(value: string) {
    this.viewType = value;
  }


  constructor(private http: HttpService, private router: ActivatedRoute, private location: Location) {
    this.filterAsync = this.filterName.valueChanges;
    console.log(this.filterAsync);
  }

  ngOnInit(): void {

    this.viewType = this.router.snapshot.routeConfig.path;

    this.filterAsync.subscribe(data => {
      console.log(data);
    });
  }

  ngAfterViewInit(): void {

  }


  setNewViewType(ev) {
    this.ViewType = ev.value;
    this.location.go(ev.value, '', null);
  }
}
