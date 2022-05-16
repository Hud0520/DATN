import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ChiTiet } from 'src/app/entity/ChiTiet';

import { DonHang } from 'src/app/entity/DonHang';
import { GioHang } from 'src/app/entity/GioHang.model';
import { SanPham } from 'src/app/entity/SanPham.model';
import { DonHangService } from 'src/app/services/don-hang.service';
import { GioHangService } from 'src/app/services/gio-hang.service';
import { SanPhamService } from 'src/app/services/san-pham.service';

@Component({
  selector: 'app-dat-hang',
  templateUrl: './dat-hang.component.html',
  styleUrls: ['./dat-hang.component.css']
})
export class DatHangComponent implements OnInit {

  gioHang :GioHang = new GioHang();
  sanPham : SanPham = new SanPham();
  donHang : DonHang = new DonHang();
  validateForm!: FormGroup;
  constructor(
    private gioHangSer : GioHangService,
    private notification: NzNotificationService,
    private donHangSer : DonHangService,
    private sanPhamSer : SanPhamService,
    private router: Router,
    private fb: FormBuilder,
  ) {}
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  ngOnInit(): void {
    this.gioHang = this.gioHangSer.getGioHang();
    if(this.gioHang.tongSanPham ==0){
      this.router.navigate([``]);
      this.createNotification(
        'info',
        "Thông báo",
        'Giỏ hàng đang trống.'
      );
    }
    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });
    this.validateForm = this.fb.group({
      hoTen: [null, [Validators.required]],
      sdtNguoiNhan: [null, [Validators.required]],
      diaChiNhan: [null, [Validators.required]],
      emailNguoiNhan: [null, [Validators.required]],
      payment: ['Live', [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    this.donHang.hoTen = this.validateForm.controls.hoTen.value;
    this.donHang.diaChiNhan = this.validateForm.controls.diaChiNhan.value;
    this.donHang.emailNguoiNhan = this.validateForm.controls.emailNguoiNhan.value;
    this.donHang.sdtNguoiNhan = this.validateForm.controls.sdtNguoiNhan.value;
    this.donHang.chiTiet = this.gioHang.sanPhams.map(e=>{
      let ct = new ChiTiet();
      ct.maSanPham = e.id;
      ct.donGia = e.gia;
      ct.soLuong= e.soLuong;
      return ct;
    });
    this.donHang.tongTien = this.gioHang.tongTien;
    this.saveBill(this.donHang);
  }

  saveBill(donHang : DonHang) {

    debugger;
    this.donHangSer.saveBill(donHang).subscribe(
      (data) => {
        if (data.errCode =="00") {
          this.router.navigate(['/pay-success']);
          localStorage.removeItem('GioHang');
        }else{
          this.createNotification(
            'error',
            data.errDesc,
            'Vui lòng liên hệ quản trị viên.'
          );
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
}
