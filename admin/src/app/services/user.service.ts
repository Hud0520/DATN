import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpBaseService) {}
  getUsers(params): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/nguoidung`, params);
  }
  deleteUser(id): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/nguoidung/delete/`+ id, null);
  }
  saveUser(user): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/nguoidung/add/`, user);
  }

  update(user): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/nguoidung/update/`, user);
  }
}
