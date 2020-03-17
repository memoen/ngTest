import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileViewPageComponent } from './my-profile-view-page.component';

describe('MyProfileViewPageComponent', () => {
  let component: MyProfileViewPageComponent;
  let fixture: ComponentFixture<MyProfileViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileViewPageComponent ]
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
