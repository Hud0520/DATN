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
  

  gioHang : GioHang = new GioHang();
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  ngOnInit(): void {
    
  }
  getGioHang(){
    const cart = localStorage.getItem('GioHang') || '';
    if (cart) {
       this.gioHang = JSON.parse(cart);
    }
    return this.gioHang;
  }

  plusProduct(item : SanPham) {
    let exit : boolean = false;
    this.gioHang.sanPhams.forEach((ele) => {
      if (ele.id == item.id) {
        ele.soLuong += item.soLuong;
        exit  = false;
      }
    });
    if(!exit){
      item.soLuong = item.soLuong;
      this.gioHang.sanPhams.push(item);
    }
    this.updateCart();
  }
  capNhat(item : SanPham){
    this.gioHang.sanPhams.forEach((ele) => {
      if (ele.id == item.id && ele.soLuong > 1) {
        ele.soLuong = item.soLuong;
      }
    });
    this.updateCart();
  }
  minusProduct(item :SanPham) {
    this.gioHang.sanPhams.forEach((ele) => {
      if (ele.id == item.id && ele.soLuong > 1) {
        ele.soLuong -= 1;
      }
    });
    this.updateCart();
  }

  delProduct(id :string) {
    this.gioHang.sanPhams = this.gioHang.sanPhams.filter(
      (ele) => ele.id != id
    );
    this.updateCart();
  }

  updateCart() {
    this.gioHang.tongSanPham = 0;
    this.gioHang.tongTien = 0;
    this.gioHang.sanPhams.forEach((ele) => {
      this.gioHang.tongTien += ele.soLuong * ele.gia;
      this.gioHang.tongSanPham += ele.soLuong;
    });
    localStorage.setItem('GioHang', JSON.stringify(this.gioHang));
  }

  xoaGioHang(){
    this.gioHang = new GioHang();
    localStorage.setItem('GioHang',JSON.stringify(this.gioHang))
  }
  payment() {
    const userAuth = localStorage.getItem('auth') || '';
      this.router.navigate(['/payment']);
      this.updateCart();
  }
}
