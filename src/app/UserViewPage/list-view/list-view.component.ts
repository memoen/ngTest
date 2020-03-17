import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {combineLatest, Subject, timer} from 'rxjs';
import {debounceTime, startWith} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.sass']
})
export class ListViewComponent implements OnInit {
  resultLength = 0;
  pageLengthDef = 10;
  pageLength = 10;
  resultAsync = new Subject();
  paginatorStatus = new Subject();
  @Input() filterAsync;


  constructor(private http: HttpService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    combineLatest(
      this.filterAsync.pipe(startWith(''), debounceTime(() => {
        return timer(1000);
      })),
      this.paginatorStatus.pipe(startWith(0)),
      (word: string, page: number) => {
        return {word, page};
      }
    ).subscribe(async data => {
      let result = [];
      let page = data.page;

      if (data.word.trim().length === 0) {
        const response = await this.getUserForPage(this.pageLength, page);
        this.resultLength = response._meta.pagination.totalCount;
        this.pageLength = this.pageLengthDef;
        result = response['result'];
      } else {
        let currentPage = 0;
        let pageTotal = 0;
        this.resultLength = this.pageLength;
        do {
          const response = await this.getUserForPage(50, currentPage);
          pageTotal = response._meta.pagination.pageCount;
          result.push(...response.result);
          currentPage++;
        }
        while (currentPage <= pageTotal);
        console.log(result);
        console.log(data);
        result = result.filter(user => {
          return user.firstName && user.firstName.includes(data.word);
        }).map(user => {
          if (user.image && user.image.length > 0) {
            user.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(user.image);
          }
          return user;
        });


        this.pageLength = result.length;
        console.log(result);
      }

      this.resultAsync.next(result);
    });
  }

  onPaginatorChange(ev) {
    this.paginatorStatus.next(ev.pageIndex);
  }

  getUserForPage(size, page) {
    return new Promise((resolve) => {
      this.http.Users(size, page).subscribe(data => {
        resolve(data);
      });
    });
  }


}
