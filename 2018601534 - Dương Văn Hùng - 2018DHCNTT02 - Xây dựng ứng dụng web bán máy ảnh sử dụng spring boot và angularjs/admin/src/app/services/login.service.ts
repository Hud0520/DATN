import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpBaseService) {}
  loginAdmin(userName, passWord): Observable<any> {
    const user = { userName: userName, passWord: passWord };
    return this.http.post<any>(`/api/admin/v1/nguoidung/login`, user);
  }
}
