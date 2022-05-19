import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GioHang } from 'src/app/entity/GioHang.model';
import { SanPham } from 'src/app/entity/SanPham.model';
import { GioHangService } from 'src/app/services/gio-hang.service';
import { SanPhamService } from 'src/app/services/san-pham.service';

@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.css']
})
export class GioHangComponent implements OnInit {

  totalPrice = 0;
  isVisible = false;
  gioHang :GioHang = new GioHang();
  sanPham : SanPham = new SanPham();
  confirmModal?: NzModalRef;
  constructor(
    private gioHangSer : GioHangService,
    private notification: NzNotificationService,
    private sanPhamSer : SanPhamService,
    private modal: NzModalService,
    private router: Router,
    private nzMessageService: NzMessageService
  ) {}
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  ngOnInit(): void {
    this.gioHang = this.gioHangSer.getGioHang();
    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });
  }

  capNhatGioHangTang(item : SanPham){
    item.soLuong++;
    this.gioHangSer.capNhat(item);
    this.gioHang = this.gioHangSer.getGioHang();
  }
  capNhatGioHangGiam(item : SanPham){
    if(item.soLuong>1){
      item.soLuong--;
      this.gioHangSer.capNhat(item);
      this.gioHang = this.gioHangSer.getGioHang();
    }
    
  }


  xoaGioHang(){
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Chờ một chút !!',
      nzContent: 'Bạn có chắc muốn xóa tất cả các sản phẩm trong giỏ hàng không ?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>{
        new Promise((resolve, reject) => {
          this.gioHangSer.xoaGioHang();
          this.gioHang = this.gioHangSer.getGioHang();
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
        this.createNotification("success","Thông báo","Xóa giỏ hàng thành công");
      }
    });
  }

  xoaSanPham(id : string){
    this.confirmModal = this.modal.confirm({
      nzContent: 'Bạn có chắc muốn xóa sản phẩm này trong giỏ hàng không ?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>{
        new Promise((resolve, reject) => {
          this.gioHangSer.delProduct(id);
          this.gioHang = this.gioHangSer.getGioHang();
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
        this.createNotification("success","Thông báo","Xóa giỏ hàng thành công");
      }
    });
  }
}