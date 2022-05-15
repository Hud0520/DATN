import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DanhMuc } from 'src/app/entity/DanhMuc.model';
import { GioHang } from 'src/app/entity/GioHang.model';
import { SanPham } from 'src/app/entity/SanPham.model';
import { SanPhamDto } from 'src/app/entity/SanPhamDto';
import { DanhMucService } from 'src/app/services/danh-muc.service';
import { GioHangService } from 'src/app/services/gio-hang.service';
import { SanPhamService } from 'src/app/services/san-pham.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listLoaiSp : string[] = [];
  listSanPham : SanPham[] = [];
  totalCount :number =0;
  totalPrice : number = 0;
  gioHang :GioHang = new GioHang();

  constructor(
    private notification : NzNotificationService,
    private sanphamService : SanPhamService,
    private gioHangService : GioHangService,
    private router : Router
  ) {}
  
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
  successNotification(title : string, message : string) :void{
    this.notification.success(title,message);
  }

  ngOnInit(): void {
    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });
    let sanPhamDto = {
      danhMuc : "1"
    }
    this.sanphamService.getByOrder().subscribe(data =>{
      this.listSanPham = data.result;
      this.listSanPham.map( i => { if(this.listLoaiSp.indexOf(i.danhMuc) ==-1) this.listLoaiSp.push(i.danhMuc)});
    });
    this.gioHang = this.gioHangService.getGioHang();
    
  }

  themVaoGio(sanpham : SanPham) : void {
    sanpham.soLuong=1;
    this.gioHangService.plusProduct(sanpham);
    debugger;
    this.successNotification("Thành công", "Sản phẩm đã được thêm vào giỏ hàng");
    this.gioHang = this.gioHangService.getGioHang(); 
  }

}
