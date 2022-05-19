import { Component, OnInit } from '@angular/core';
import { GioHang } from 'src/app/entity/GioHang.model';
import { GioHangService } from 'src/app/services/gio-hang.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SanPham } from 'src/app/entity/SanPham.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { DanhMucService } from 'src/app/services/danh-muc.service';
import { DanhMuc } from 'src/app/entity/DanhMuc.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  total :number = 0;
  count : number = 0;
  constructor(
    private notification : NzNotificationService,
    private goiHang : GioHangService,
    private router : Router,
  ) {}
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  ngOnInit(): void {
  }
  

}