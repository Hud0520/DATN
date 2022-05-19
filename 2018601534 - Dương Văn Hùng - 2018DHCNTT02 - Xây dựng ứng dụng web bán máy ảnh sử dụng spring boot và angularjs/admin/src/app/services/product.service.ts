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
    return this.http.get<any>(`/api/admin/v1/sanpham/` + id, null);
  }
  deleteProduct(id): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/sanpham/delete/`+id,null);
  }
  saveProduct(product): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/sanpham/add`, product);
  }
  postImage(id: number, file: File[]): Observable<any> {
    const data: FormData = new FormData();
      data.append('file0', file[0]);
      data.append('file1', file[1]);
      data.append('file2', file[2]);
      data.append('file3', file[3]);
    return this.http.postImage<any>(`/api/admin/v1/sanpham/cms_anh/${id}`, data);
  }
}
