import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Grid } from '../entity/Grid';
import { ThuongHieu } from '../entity/ThuongHieu';

@Injectable({
  providedIn: 'root'
})
export class ThuongHieuService {

  private apiUrl :string =environment.apiUrl;
  constructor(private http : HttpClient) { };

  public getAll () : Observable<Grid<ThuongHieu[]>> { 
    return this.http.get<Grid<ThuongHieu[]>>(`${this.apiUrl}/thuonghieu`);
  }
}
