import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NguoiDungService {

  url = environment.apiUrl;
  constructor(private http: HttpClient) {}
  loginAdmin(userName: any, passWord: any): Observable<any> {
    const user = { userName: userName, passWord: passWord };
    return this.http.post<any>(`${this.url}/nguoidung/login`, user);
  }
}
