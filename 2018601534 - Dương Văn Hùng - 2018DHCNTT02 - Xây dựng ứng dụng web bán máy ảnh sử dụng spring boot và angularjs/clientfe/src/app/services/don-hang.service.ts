import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { DonHang } from '../entity/DonHang';

@Injectable({
  providedIn: 'root'
})
export class DonHangService {
  private urlApi : string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  saveBill(donHang : any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/donhang/them`,donHang);
  }
}
