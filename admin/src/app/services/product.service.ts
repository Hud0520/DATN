import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpBaseService) {}
  getProducts(params): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/sanpham`, params);
  }
  getProduct(id): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/product/` + id, null);
  }
  deleteProduct(id): Observable<any> {
    return this.http.delete<any>(`/api/admin/v1/product/` + id);
  }
  saveProduct(product): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/product/`, product);
  }
  postImage(id: number, file: File): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', file);
    return this.http.postImage<any>(`/api/admin/v1/cms_anh/${id}`, data);
  }
}
