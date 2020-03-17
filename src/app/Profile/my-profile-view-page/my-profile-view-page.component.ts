import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../services/http.service';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../services/models';

@Component({
  selector: 'app-my-profile-view-page',
  templateUrl: './my-profile-view-page.component.html',
  styleUrls: ['./my-profile-view-page.component.sass']
})
export class MyProfileViewPageComponent implements OnInit {

  public userData: User;

  constructor(private router: ActivatedRoute, private http: HttpService,) {
  }

  ngOnInit(): void {
    const userId = this.getUserId();
    this.getUserDataById(userId);
  }

  /**
   * @description return user from url path /:id
   */
  private getUserId(): number {
    return this.router.snapshot.params.id;

  }


  /**
   * @description set selected user profile data to userData
   * @param id
   */
  public getUserDataById(id: number): void {
    this.http.UserById(id).subscribe(data => {
      this.userData = data.result;
    });
  }

}
