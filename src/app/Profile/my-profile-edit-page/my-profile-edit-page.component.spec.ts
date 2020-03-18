import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileEditPageComponent } from './my-profile-edit-page.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

describe('MyProfileEditPageComponent', () => {
  let component: MyProfileEditPageComponent;
  let fixture: ComponentFixture<MyProfileEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyProfileEditPageComponent],
      imports: [RouterTestingModule, HttpClientModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
