import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './HttpBaseService';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private http: HttpBaseService) {}
  getStatisticBrand(params : any): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/product/statistic-brand`, params);
  }
  getStatisticCategory(params :any): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/product/statistic-category`, params);
  }
  getStatisticBill(params :any): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/statistic-bill`, params);
  }
  exportProducts(params :any): Observable<any> {
    return this.http.exportExcel<any>(`/api/admin/v1/export-products`, params);
  }
}
