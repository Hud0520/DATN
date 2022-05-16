import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grid } from '../entity/Grid';
import { MetaResponse } from '../entity/MetaResponse';
import { SanPham } from '../entity/SanPham.model';
import { SanPhamDto } from '../entity/SanPhamDto';
import { HttpBaseService } from './HttpBaseService';


@Injectable({
  providedIn: 'root'
})
export class SanPhamService {

  constructor(private http : HttpBaseService) {};

  pgetProducts(params : any): Observable<any> {
    return this.http.get<any>(`/sanpham`, params);
  }
  getProduct(id :any): Observable<any> {
    return this.http.get<any>(`/product?id=` + id, null);
  }
  deleteProduct(id :any): Observable<any> {
    return this.http.post<any>(`/product/` , id);
  }
  saveProduct(product :any): Observable<any> {
    return this.http.post<any>(`/product/`, product);
  }
  postImage(id: number, file: File): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', file);
    return this.http.postImage<any>(`/cms_anh/${id}`, data);
  }
}
