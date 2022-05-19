import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpBaseService) {}
  getBills(params): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/donhang`, params);
  }
  exportBills(params): Observable<any> {
    return this.http.exportExcel<any>(`/api/admin/v1/donhang/export`, params);
  }
  getBillDetail(id): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/donhang/chitiet/` + id, null);
  }
  deleteBill(id): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/donhang/delete` , id);
  }
  cancelBill(bill): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/donhang/cancel-bill`, bill);
  }
  saveBill(bill): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/donhang/update`, bill);
  }
}
