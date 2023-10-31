import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData = new Subject<any>();
  private userId = new BehaviorSubject<any>({});
  userData$ = this.userData.asObservable();
  loader = new BehaviorSubject(false);
  localDataValuesChange: Subject<any> = new Subject<any>();
  private second = new Subject<any>();
  second$ = this.second.asObservable();

  baseUrl = 'http://ownmentorcv.nolimitstalent.com/api/';
  token;

  constructor(private http: HttpClient, private router: Router) { }

  setHeaders(type?: String) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    if (type) {
      const token = 'Bearer' + type;
      headers = headers.set('Authorization', token);
    }
    return headers;
  }
  setHeadersJSON(type?: String) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    if (type) {
      const token = 'Bearer' + type;
      headers = headers.set('Authorization', token);
    }
    return headers;
  }

  // setUserId(data) {
  //   this.userId.next(data);
  // }

  // getUserId() {
  //   return this.userId.asObservable();
  // }

  // sendId(data) {
  //   this.second.next(data);
  // }

  // sendUserData(data) {
  //   this.userData.next(data);
  // }

  public getData(url, data?: any): Observable<any> {
    const headers = this.setHeaders();
    if (data) {
      const queryParams =  Object.keys(data).map(key => key + '=' + data[key]).join('&');
      url += '?' + queryParams;
    }
    const options = { headers: headers };
    return this.http.get(this.baseUrl + url, options).map(this.extractData).catch(this.handleError);
  }
  public postDataReport(url, data?: any, type?: string): Observable<any> {
    const headers = this.setHeadersJSON();
    /* if (type === 'reset') {
      headers = headers.set('Authorization', 'Bearer 12344' );
    } */
    const options = { headers: headers };
    return this.http.post(this.baseUrl + url, data, options).map(this.extractData).catch(this.handleError);
  }

  public postData(url, data?: any, type?: string): Observable<any> {
    const headers = this.setHeaders();
    /* if (type === 'reset') {
      headers = headers.set('Authorization', 'Bearer 12344' );
    } */
    const options = { headers: headers };
    return this.http.post(this.baseUrl + url, data, options).map(this.extractData).catch(this.handleError);
  }

  // public deleteData(url): Observable<any> {
  //   const headers = this.setHeaders();
  //   const options = { headers: headers };
  //   return this.http.delete(this.baseUrl + url, options).map(this.extractData).catch(this.handleError);
  // }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  private handleError(error: any) {
    const errMsg = error.error;
    if (typeof errMsg.message === 'object') {
      const arr = Array.from(Object.keys(errMsg.message), k => errMsg.message[k]);
      return throwError(arr);
    }
    return throwError(errMsg.message);
  }
  public getDataWithoutString(url, type?: String): Observable<any> {
    const headers = this.setHeaders();
    const options = { headers: headers };
    return this.http.get(this.baseUrl + url, options).map(this.extractData).catch(this.handleError);
  }
  public postDataString(url, data, type?: String): Observable<any> {
    const headers = this.setHeaders(type);
    const options = { headers: headers };
    return this.http.post(this.baseUrl + url, JSON.stringify(data), options).map(this.extractData).catch(this.handleError);
  }
  setLoader(value) {
    this.loader.next(value);
  }

  getLoader() {
    return this.loader.asObservable();
  }
}
