import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileViewPageComponent } from './my-profile-view-page.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

describe('MyProfileViewPageComponent', () => {
  let component: MyProfileViewPageComponent;
  let fixture: ComponentFixture<MyProfileViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileViewPageComponent ],
      imports: [RouterTestingModule, HttpClientModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
