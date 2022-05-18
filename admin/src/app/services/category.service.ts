import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpBaseService) {}
  getCategories(params: any): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/danhmuc`, params);
  }
  getAllCategory(): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/danhmuc`, null);
  }
  deleteCategory(id): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/danhmuc/delete` , id);
  }
  addCategory(category): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/danhmuc/add`, category);
  }

  saveCategory(category): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/danhmuc/update`, category);
  }

}
