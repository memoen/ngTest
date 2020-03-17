import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {debounce, debounceTime, first, startWith} from 'rxjs/operators';
import {interval, Observable, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.sass']
})
export class PageContainerComponent implements OnInit {
  private viewType: TypeOfView = TypeOfView.list;
  public filterName: FormControl = new FormControl('');
  public filterAsync: Observable<string>;
  public TypeOfView = TypeOfView;

  get ViewType() {
    return this.viewType;
  }

  set ViewType(value: TypeOfView) {
    this.viewType = value;
  }

  constructor(private http: HttpService, private router: ActivatedRoute, private location: Location) {
    this.filterAsync = this.filterName.valueChanges;
  }

  /**
   * @description set view type for page depends on url parameter
   */
  private setViewTypeFromUrl() {
    this.router.snapshot.routeConfig.path === 'map' ? this.viewType = TypeOfView.map : this.viewType = TypeOfView.list;
  }

  /**
   * @description change TypeOfView url parameter without refresh
   * @param ev
   */
  public setNewViewType(ev) {
    ev.value === 'map' ? this.ViewType = TypeOfView.map : this.ViewType = TypeOfView.list;
    this.location.go(ev.value, '', null);
  }

  ngOnInit(): void {
    this.setViewTypeFromUrl();
  }
}

export enum TypeOfView {
  list,
  map
}

