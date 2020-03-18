import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CredentialService} from './credential.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /**
   * @description api prefix
   */
  private apiBasePath = 'https://test-api.live.gbksoft.net/rest';


  private getAuthHeader() {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.credential.Token);
  }

  private requestGet(urlPath: string, json: any): Observable<any> {
    return this.httpClient.get(this.apiBasePath + urlPath, {params: json});
  }

  private requestGetAuth(urlPath: string, json: any): Observable<any> {
    const header = this.getAuthHeader();
    return this.httpClient.get(this.apiBasePath + urlPath, {params: json, headers: header});
  }

  private requestPost(urlPath: string, json: any) {
    return this.httpClient.post(this.apiBasePath + urlPath, json);
  }

  private requestPostAuth(urlPath: string, json: any): Observable<any> {
    const header = this.getAuthHeader();
    return this.httpClient.post(this.apiBasePath + urlPath, json, {headers: header});
  }

  private requestDeleteAuth(urlPath: string): Observable<any> {
    const header = this.getAuthHeader();
    return this.httpClient.delete(this.apiBasePath + urlPath, {headers: header});
  }

  private requestPutAuth(urlPath: string, json): Observable<any> {
    const header = this.getAuthHeader();
    return this.httpClient.put(this.apiBasePath + urlPath, json, {headers: header});
  }

  constructor(private httpClient: HttpClient, private credential: CredentialService) {
  }

  /**
   * @description login using email and password
   * @param email - User unique eamil
   * @param password - User password
   * @version 1
   */

  public login(email: string, password: string) {
    return this.requestPost('/v1/user/login', {
      email: email,
      password: password,
    });
  }

  /**
   * @description register using email and password
   * @param email - User unique eamil
   * @param password - User password
   * @version  1
   */
  public register(email: string, password: string) {
    return this.requestPost('/v1/user/register', {
      email: email,
      password: password,
    });
  }

  /**
   * @description signin using facebook Api
   * @param token
   * @version 1
   */
  public loginType(token: string) {
    let type: string = 'facebook';
    return this.requestGet('/v1/user/login/' + type, {token});
  }

  /**
   * @description get current user model
   *
   */
  public CurrentUser() {
    return this.requestGetAuth('/v1/user/current', {});
  }

  /**
   * @description get spicific user by id
   * @param id
   */
  public UserById(id) {
    return this.requestGetAuth('/v1/user/' + id, {});
  }

  /**
   * @description get all user in system, one request maxLimit=50
   * @param perPage
   * @param pageIndex
   */
  public Users(perPage: number, pageIndex: number): Observable<any> {
    return this.requestGetAuth('/v1/user', {perPage, page: pageIndex});
  }

  /**
   * @description filter nearest user, filter: lng,lat, radius,firstName
   * @param filterObj
   * @constructor
   */
  public UsersSearch(filterObj) {
    return this.requestGetAuth('/v1/user/search', filterObj);
  }

  public updateUserProfile(userData) {
    return this.requestPutAuth('/v1/user/profile', userData);
  }

  /**
   * @description update current user location
   * @param lat
   * @param lon
   */
  public updateUserLocation(lat: number, lon: number) {
    return this.requestPutAuth('/v1/user/location', {lat, lon});
  }

  /**
   * @description add img current user profile
   * @param formData
   */
  public setUserImage(formData: FormData) {
    return this.requestPostAuth('/v1/user/profile/image', formData);
  }

  /**
   * @description delete profile img for current user
   */
  public deleteUserProfileImg() {
    return this.requestDeleteAuth('/v1/user/profile/image');
  }


  /**
   * @description terminate current session
   */
  public logOut() {
    this.credential.Token = '';
    return this.requestPostAuth('/v1/user/logout', {});
  }


}



