import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../services/http.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-my-profile-view-page',
  templateUrl: './my-profile-view-page.component.html',
  styleUrls: ['./my-profile-view-page.component.sass']
})
export class MyProfileViewPageComponent implements OnInit {

  userData;

  constructor(private router: ActivatedRoute, private http: HttpService,) {
  }

  ngOnInit(): void {
    let userId = this.router.snapshot.params.id;
    this.getUserDataById(userId);
  }

  getUserDataById(id) {
    this.http.UserById(id).subscribe(data => {
      this.userData = data.result;
    });
  }

}
