import { Component, OnInit } from '@angular/core';
import { GioHang } from 'src/app/entity/GioHang.model';
import { GioHangService } from 'src/app/services/gio-hang.service';

@Component({
  selector: 'app-lien-he',
  templateUrl: './lien-he.component.html',
  styleUrls: ['./lien-he.component.css']
})
export class LienHeComponent implements OnInit {
  gioHang : GioHang = new GioHang();
  constructor(
    private gioHangSer : GioHangService
  ) { }

  ngOnInit(): void {
    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });
    // declare cart 
    this.gioHang = this.gioHangSer.getGioHang();
  }

}
