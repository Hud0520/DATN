import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class HttpBaseService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}
  serverPort = 'http://localhost:8080';
  handleError(error) {
    this.errorService.nextError(error);
    return throwError(error);
  }
  getHeader(): HttpHeaders {
    
    var headers = { 'Content-Type': 'application/json; charset=utf-8' };
    if (sessionStorage) {
      var authorization = sessionStorage.getItem('auth');
      if (authorization) {
        headers['Authorization'] = authorization;
      }
    }
    return new HttpHeaders(headers);
  }
  get<T>(url: string, params: any): Observable<T> {
    if (params) {
      let param = new HttpParams();
      params.forEach((values, keys) => {
        if (values) {
          param = param.append(keys, values);
        }
      });
      return this.callApiBaseGetWay('GET', url, param, {});
    }
    return this.callApiBaseGetWay('GET', url, params, {});
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.callApiBaseGetWay('POST', url, null, body);
  }
  postImage<T>(url: string, body: any): Observable<T> {
    var headers = { };
    if (sessionStorage) {
      var authorization = sessionStorage.getItem('auth');
      if (authorization) {
        headers['Authorization'] = authorization;
      }
    }

    var httpOptions: Object = {
      headers: new HttpHeaders(headers),
      withCredentials: true,
    };
    url = this.serverPort + url;
    return this.http.post<T>(url, body, httpOptions);
  }
  exportExcel<T>(url: string, params: any): Observable<T> {
    if (params) {
      let param = new HttpParams();
      params.forEach((values, keys) => {
        if (values) {
          param = param.append(keys, values);
        }
      });
      var httpOptions: Object = {
        withCredentials: true,
        reportProgress: true,
        responseType: 'blob' as 'json',
        params: param,
      };
      url = this.serverPort + url;
      return this.http.get<T>(url, httpOptions);
    }
    return null;
  }
  put<T>(url: string, body: any): Observable<T> {
    return this.callApiBaseGetWay('PUT', url, null, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.callApiBaseGetWay('DELETE', url, null, {});
  }
  callApiBaseGetWay<T>(method: string, url, params, body): Observable<T> {
    var httpOptions: Object = {
      headers: this.getHeader(),
      withCredentials: true,
      params: params,
      
    };
    url = this.serverPort + url;
    if (method == 'GET') {
      return this.http.get<T>(url, httpOptions);
    }
    if (method == 'POST') {
      return this.http.post<T>(url, body, httpOptions);
    }
    if (method == 'PUT') {
      return this.http.put<T>(url, body, httpOptions);
    }
    if (method == 'DELETE') {
      return this.http.delete<T>(url, httpOptions);
    }
  }
}
