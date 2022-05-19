import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grid } from '../entity/Grid';
import { MetaResponse } from '../entity/MetaResponse';
import { SanPham } from '../entity/SanPham.model';
import { SanPhamDto } from '../entity/SanPhamDto';

@Injectable({
  providedIn: 'root'
})
export class SanPhamService {

  private urlApi : string = environment.apiUrl;
  constructor(private http : HttpClient) {};

  public getAll (object : any, para ?: string) : Observable<Grid<SanPham[]>> { 
    return this.http.get<Grid<SanPham[]>>(`${this.urlApi}/sanpham?`+para,{params : new HttpParams({fromObject : object as any})})
  }

  public getById (id : string) : Observable<MetaResponse<SanPham>> { 
    return this.http.get<MetaResponse<SanPham>>(`${this.urlApi}/sanpham/get?id=${id}`);
  }

  public getByOrder () : Observable<Grid<SanPham[]>> { 
    return this.http.get<Grid<SanPham[]>>(`${this.urlApi}/sanpham/get-by-order`);
  }
}
