import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileEditPageComponent } from './my-profile-edit-page.component';

describe('MyProfileEditPageComponent', () => {
  let component: MyProfileEditPageComponent;
  let fixture: ComponentFixture<MyProfileEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileEditPageComponent ]
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
