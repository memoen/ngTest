import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {combineLatest, Subject, timer} from 'rxjs';
import {debounceTime, startWith} from 'rxjs/operators';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {responseOkPagin, User} from '../../services/models';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.sass']
})
export class ListViewComponent implements OnInit {
  private pageLengthDef: number = 10;
  /**
   * @description emit current MatPaginator active page
   */
  private paginatorStatus: Subject<number> = new Subject();
  public resultLength: number = 0;
  public pageLength: number = 10;
  public resultAsync: Subject<UserWithPhoto[]> = new Subject();
  @Input() filterAsync;

  constructor(private http: HttpService, private sanitizer: DomSanitizer) {
  }

  /**
   * @description handle changes of paginator and input[firstName]
   */
  private handleFiltersChanges() {
    combineLatest(
      this.filterAsync.pipe(debounceTime(1000), startWith('')),
      this.paginatorStatus.pipe(startWith(0)),
      (word: string, page: number) => {
        return {word, page};
      }
    ).subscribe(async data => {
      let result: User[] = [];
      const page: number = data.page;
      if (data.word.trim().length === 0) {
        result = await this.getUserListForPageWithoutFilters(this.pageLength, page);
      } else {
        let userList: User[] = await this.getUserListWithFilter();
        userList = this.filterUsersByFirstName(userList, data.word);
        userList = this.insertImgPathInEachUser(userList);
        result = userList;
        this.resultLength = result.length;
      }
      this.resultAsync.next(result);
    });
  }


  /**
   * @description return all!! users in DB. This is not good: performance loss, multiple requests to server.
   * @description But there is no way to filter User array by first name on BackEnd
   * @param word
   */
  private async getUserListWithFilter() {
    let currentPage = 0;
    let pageTotal = 0;
    const result: User[] = [];
    do {
      const response: responseOkPagin = await this.getUserForPage(50, currentPage);
      pageTotal = response._meta.pagination.pageCount;
      result.push(...response.result as User[]);
      currentPage++;
    }
    while (currentPage <= pageTotal);
    return result;
  }

  /**
   * @description return users that contains filterValue in firstName. Also return user without: firstname,lastname and photo
   * @param users
   * @param firstName
   */
  private filterUsersByFirstName(users: User[], firstName: string): User[] {
    return users.filter(user => {
      return user.firstName && user.firstName.includes(firstName);
    });
  }

  /**
   * @description return Users with Secure Img Path
   * @param users
   */
  private insertImgPathInEachUser(users: User[]): UserWithPhoto[] {
    return users.map(user => {
      const userWithPhoto = user as UserWithPhoto;
      if (user.image && user.image.length > 0) {
        userWithPhoto.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(user.image);
      }
      return userWithPhoto;
    });
  }

  /**
   * @description return User list , modify resultLength and pageLength
   * @param pageLength
   * @param page
   */
  private async getUserListForPageWithoutFilters(pageLength, page): Promise<User[]> {
    const response: responseOkPagin = await this.getUserForPage(pageLength, page);
    this.resultLength = response._meta.pagination.totalCount;
    this.pageLength = this.pageLengthDef;
    return response.result as User[];
  }

  /**
   * @description return User list for selected page, Max item per request 50
   * @param size
   * @param page
   */
  private getUserForPage(size: number, page: number): Promise<responseOkPagin> {
    return new Promise((resolve) => {
      this.http.Users(size, page).subscribe(data => {
        resolve(data);
      });
    });
  }

  /**
   * @description emit MatPaginator change
   * @param ev
   */
  public onPaginatorChange(ev) {
    this.paginatorStatus.next(ev.pageIndex);
  }

  ngOnInit(): void {
    this.handleFiltersChanges();
  }
}

interface UserWithPhoto extends User {
  imageSrc?: SafeResourceUrl,
}
