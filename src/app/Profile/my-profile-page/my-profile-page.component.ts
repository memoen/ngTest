import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HttpService} from '../../services/http.service';
import {MapsService} from '../../services/maps.service';
import {User} from '../../services/models';

declare let alertify;

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.sass']
})
export class MyProfilePageComponent implements OnInit {
  userBioForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
  });
  imgToShow: SafeResourceUrl;
  @Input() editable;
  @Input() userData;
  @Output('onSave') onSaveEv = new EventEmitter();
  @ViewChild('fileImg', {static: false}) fileImg;

  constructor(private sanitize: DomSanitizer, private fb: FormBuilder) {
  }

  /**
   * @description convert User object to User form and set safe url for profile photo
   * @param userData
   */
  private setUserData(userData: User) {
    this.userBioForm = this.fb.group({
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      city: userData.city,
      country: userData.country,
    });

    if (userData.image) {
      this.imgToShow = this.sanitize.bypassSecurityTrustResourceUrl(userData.image + '?time=' + Date.now());
    }
  }

  /**
   * @description emulate click on Input[#file]
   */
  public editImg() {
    this.fileImg.nativeElement.click();
  }

  /**
   * @description handle profile file upload
   */
  public onFileChange(ev): void {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (ev) => {
      const baseImg: string = '' + ev.target.result;
      this.imgToShow = this.sanitize.bypassSecurityTrustResourceUrl(baseImg);
    };
    reader.readAsDataURL(file);
  }

  /**
   * @description emit profile edit end and new User model
   */
  public saveChanges() {
    let file = null;
    if (this.fileImg.nativeElement.files && this.fileImg.nativeElement.files[0]) {
      file = this.fileImg.nativeElement.files[0];
    }
    this.onSaveEv.emit({
      file,
      data: this.userBioForm.getRawValue(),
    });
  }

  ngOnInit(): void {
    this.setUserData(this.userData);
  }

}
