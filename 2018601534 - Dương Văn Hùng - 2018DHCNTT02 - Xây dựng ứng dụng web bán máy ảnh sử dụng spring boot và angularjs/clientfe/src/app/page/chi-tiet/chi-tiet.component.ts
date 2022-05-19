import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GioHang } from 'src/app/entity/GioHang.model';
import { SanPham } from 'src/app/entity/SanPham.model';
import { GioHangService } from 'src/app/services/gio-hang.service';
import { SanPhamService } from 'src/app/services/san-pham.service';


@Component({
  selector: 'app-chi-tiet',
  templateUrl: './chi-tiet.component.html',
  styleUrls: ['./chi-tiet.component.css']
})
export class ChiTietComponent implements OnInit {
  maSanPham : string = '';
  sanPham : SanPham = new SanPham();
  gioHang : GioHang = new GioHang();
  soluong :number = 1;
  listTomTat : string[] =[]
  constructor(

    route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private sanPhamService: SanPhamService,
    private notification: NzNotificationService,
    private gioHangService : GioHangService
  ) { 
    route.params.subscribe((val) => {
      this.maSanPham = this.activatedRoute.snapshot.params.id;
    });
  }

  ngOnInit(): void {
    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });
    this.gioHang = this.gioHangService.getGioHang();
    this.getDetailProduct(this.maSanPham);
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
  getDetailProduct(maSanPham :any) {
    this.sanPhamService.getById(maSanPham).subscribe(
      (data) => {
        if (data && data.data) {
          this.sanPham = data.data;
          this.listTomTat = this.sanPham.tomTat.split("- ").filter(e=> e!="");
        }
      },
      (error) => {
        this.createNotification(
          'error',
          'Có lỗi xảy ra!',
          'Vui lòng liên hệ quản trị viên.'
        );
      }
    );
  }
  tangSoluong(){
    if(this.soluong <this.sanPham.soLuong){
      this.soluong++;
    }
  }

  giamSoLuong(){
    if(this.soluong>1){
      this.soluong--;
    }
  }

  changeImg(event : any){
    $('.product__details__pic__item--large').attr({
        src: event
    });
  }

  themVaoGioHang(){
    this.sanPham.soLuong = this.soluong;
    this.gioHangService.plusProduct(this.sanPham);
    this.createNotification("success","Thông báo","Thêm sản phẩm thành công !");
    this.gioHang = this.gioHangService.getGioHang();
  }
}
