import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HttpService} from '../../services/http.service';
import {MapsService} from '../../services/maps.service';

declare let alertify;

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.sass']
})
export class MyProfilePageComponent implements OnInit {
  @Input() editable;
  @Input() userData;

  @Output('onSave') onSaveEv = new EventEmitter();

  userBioForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
  });

  imgToShow: SafeResourceUrl;

  @ViewChild('fileImg', {static: false}) fileImg;

  constructor(private sanitize: DomSanitizer, private fb: FormBuilder) {

  }

  onFileChange(ev) {
    let file = ev.target.files[0];
    let reader = new FileReader();
    reader.onloadend = (ev) => {
      let baseImg = ev.target.result;
      this.imgToShow = this.sanitize.bypassSecurityTrustResourceUrl(baseImg);
    };

    reader.readAsDataURL(file);
  }

  setUserData(userData) {
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


  ngOnInit(): void {
    this.setUserData(this.userData);

  }

  editImg() {
    this.fileImg.nativeElement.click();
  }

  saveChanges() {
    let file = null;
    if (this.fileImg.nativeElement.files && this.fileImg.nativeElement.files[0]) {
      file = this.fileImg.nativeElement.files[0];
    }
    this.onSaveEv.emit({
      file: file,
      data: this.userBioForm.getRawValue(),
    });
  }

}
