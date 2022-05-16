import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { DanhMuc } from '../entity/DanhMuc.model';
import { Grid } from '../entity/Grid';
import { MetaResponse } from 'src/entity/MetaResponse';
@Injectable({
  providedIn: 'root'
})
export class DanhMucService {

  private apiUrl :string =environment.apiUrl;
  constructor(private http : HttpClient) { };

  public getAll () : Observable<Grid<DanhMuc[]>> { 
    return this.http.get<Grid<DanhMuc[]>>(`${this.apiUrl}/danhmuc`);
  }

  deleteCategory(id : any): Observable<MetaResponse<DanhMuc>> {
    return this.http.post<MetaResponse<DanhMuc>>(`${this.apiUrl}/danhmuc/`,id);
  }
  getCategories(params: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/danhmuc`, params);
  }
  saveCategory(category : any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/danhmuc/`, category);
  }


}
