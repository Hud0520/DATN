import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpBaseService) {}
  getBrands(params: any): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/thuonghieu`, params);
  }
  getAllBrand(): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/thuonghieu`, null);
  }
  deleteBrand(id): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/thuonghieu/delete/`+id,null);
  }
  saveBrand(brand): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/thuonghieu/add`, brand);
  }
}
