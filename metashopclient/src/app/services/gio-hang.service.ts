import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GioHang } from '../entity/GioHang.model';
import { MetaResponse } from '../entity/MetaResponse';
import { SanPham } from '../entity/SanPham.model';

@Injectable({
  providedIn: 'root'
})
export class GioHangService {
  private urlApi : string = environment.apiUrl;
  constructor(private http : HttpClient,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private router: Router) {};
  
  public getGioHang() : Observable<MetaResponse<GioHang>>{
    return this.http.get<MetaResponse<GioHang>>(`${this.urlApi}/giohang`)
  }

  public updateGioHang(obj : SanPham[]) : Observable<MetaResponse<Object>>{
    return this.http.post<MetaResponse<Object>>(`${this.urlApi}/giohang/capnhat`,obj)
  }

  public deleteSanPham(obj : SanPham) : Observable<MetaResponse<Object>>{
    return this.http.post<MetaResponse<Object>>(`${this.urlApi}/giohang/xoa`,obj)
  }

  totalPrice = 0;
  listOfProduct: SanPham[] = [];
  totalCount = 0;
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  ngOnInit(): void {
    const cart = localStorage.getItem('cart') || '';
    if (cart) {
      this.listOfProduct = JSON.parse(cart);
      this.listOfProduct.forEach((ele) => {
        this.totalPrice += ele.soLuong * ele.gia;
        this.totalCount++;
      });
    }
  }

  plusProduct(item : SanPham) {
    let exit : boolean = false;
    this.listOfProduct.forEach((ele) => {
      if (ele.id == item.id ) {
        ele.soLuong += 1;
        exit  = false;
      }
    });
    if(!exit){
      item.soLuong = 1;
      this.listOfProduct.push(item);
    }
    this.updateCart();
  }

  minusProduct(item :SanPham) {
    this.listOfProduct.forEach((ele) => {
      if (ele.id == item.id && ele.soLuong > 1) {
        ele.soLuong -= 1;
      }
    });
    this.updateCart();
  }

  delProduct(id :string) {
    this.listOfProduct = this.listOfProduct.filter(
      (ele) => ele.id != id
    );
    this.updateCart();
  }

  updateCart() {
    this.totalPrice = 0;
    this.listOfProduct.forEach((ele) => {
      this.totalPrice += ele.soLuong * ele.gia;
    });
    localStorage.setItem('total', this.totalPrice.toString());
    localStorage.setItem('count', this.totalCount.toString());
    localStorage.setItem('cart', JSON.stringify(this.listOfProduct));
  }

  payment() {
    const userAuth = localStorage.getItem('auth') || '';
      this.router.navigate(['/payment']);
      this.updateCart();
  }
}
