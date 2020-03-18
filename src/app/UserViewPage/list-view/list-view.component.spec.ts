import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewComponent } from './list-view.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {User} from '../../services/models';

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;

  const testUserList: User[] = [
    {
      country: 'DE',
      city: 'Berlin',
      firstName: 'test1',
      lastName: 'lastTest1',
      email : 'abc@abc.abc',
      image: 'http://localhost:8080',
      lat: 0,
      lon: 0,
      gender: 'male',
      createdAt: '0',
      updatedAt: '0',
      id: 0,
    },
    {
      country: 'DE',
      city: 'Berlin',
      firstName: 'test2',
      lastName: 'lastTest1',
      email : 'abc@abc.abc',
      image: 'http://localhost:8080',
      lat: 0,
      lon: 0,
      gender: 'male',
      createdAt: '0',
      updatedAt: '0',
      id: 0,
    },
    {
      country: 'DE',
      city: 'Berlin',
      firstName: 'test3',
      lastName: 'lastTest1',
      email : 'abc@abc.abc',
      image: 'http://localhost:8080',
      lat: 0,
      lon: 0,
      gender: 'male',
      createdAt: '0',
      updatedAt: '0',
      id: 0,
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListViewComponent],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return all users for first name filter', () => {
    const result = component.filterUsersByFirstName(testUserList, 'test');
    expect(result.length).toBe(testUserList.length);
  });
  it('should return only user with firstName test1', () => {
    const result = component.filterUsersByFirstName(testUserList, 'test1');
    expect(result.length).toBe(1);
    expect(result[0].firstName).toBe('test1');
  });

  it('should add secure img path to each user', () => {
    const result = component.insertImgPathInEachUser(testUserList);
    result.forEach(user => {
      expect(user.imageSrc).not.toBe(undefined);
    });
  });



});
