import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DanhMuc } from 'src/app/entity/DanhMuc.model';
import { GioHang } from 'src/app/entity/GioHang.model';
import { SanPham } from 'src/app/entity/SanPham.model';
import { SanPhamDto } from 'src/app/entity/SanPhamDto';
import { ThuongHieu } from 'src/app/entity/ThuongHieu';
import { DanhMucService } from 'src/app/services/danh-muc.service';
import { GioHangService } from 'src/app/services/gio-hang.service';
import { SanPhamService } from 'src/app/services/san-pham.service';
import { ThuongHieuService } from 'src/app/services/thuong-hieu.service';

@Component({
  selector: 'app-cua-hang',
  templateUrl: './cua-hang.component.html',
  styleUrls: ['./cua-hang.component.css']
})
export class CuaHangComponent implements OnInit {

  gioHang : GioHang = new GioHang();
  danhMucId: string = "";
  listOfDanhMuc: DanhMuc[] = [];
  listOfThuongHieu: ThuongHieu [] = [];
  price = [0,300000000];
  priceTo = 300000000;
  priceFrom = 0;
  listOfData: SanPham[] = [];
  pageSize = 9;
  pageIndex = 1;
  status:string = 'default';
  controlArray: Map<string, any> = new Map<string, any>();
  totalProduct: number = 0;
  sanPhamPara : SanPhamDto = {id :"",
    tenSanPham :"",
    nhanHieu :"",
    giatu :0,
    giaden :300000000,
    danhMuc :""};
  constructor(
    route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private danhMucSer: DanhMucService,
    private thuongHieuSer: ThuongHieuService,
    private sanPhamSer: SanPhamService,
    private notification: NzNotificationService,
    private gioHangSer : GioHangService
  ) {
    route.params.subscribe((val) => {
      debugger;
      this.danhMucId = this.activatedRoute.snapshot.params.danhMucId || '';
      this.sanPhamPara.tenSanPham = this.activatedRoute.snapshot.params.keyword || '';
    });
  }

  ngOnInit(): void {
    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });
    // declare cart 
    this.gioHang = this.gioHangSer.getGioHang();
    this.getDanhMuc();
    this.getThuongHieu();
    if (this.danhMucId || !(this.danhMucId === '')) {
      this.sanPhamPara.danhMuc=this.danhMucId;
    }
    this.getProducts(this.pageIndex, this.pageSize, 'id', 'desc');
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
  getProducts(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null
  ) {
    this.controlArray.set('page', pageIndex);
    this.controlArray.set('pageSize', pageSize);
    this.controlArray.set('sortby', sortField);
    this.controlArray.set('order', sortOrder);
    let para = "page="+pageIndex+"&pageSize="+pageSize+"&sortby="+sortField+"&order="+sortOrder;
    // get product
    this.sanPhamSer.getAll(this.sanPhamPara,para).subscribe(
      (data) => {
        if (data && data.result) {
          this.listOfData = data.result;
          this.totalProduct = data.total;
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
  
  getDanhMuc() {
    this.danhMucSer.getAll().subscribe(
      (data) => {
        if (data && data.result) {
          this.listOfDanhMuc = data.result;
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
  getThuongHieu() {
    this.thuongHieuSer.getAll().subscribe(
      (data) => {
        if (data && data.result) {
          this.listOfThuongHieu = data.result;
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
  getProductSort(sanPham : SanPhamDto,param: any) {
    // get product
    this.sanPhamSer.getAll(sanPham,param).subscribe(
      (data) => {
        if (data && data.result) {
          this.listOfData = data.result;
          this.totalProduct = data.total;
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
  // load by price
  priceChange(): void {
    let para = "page="+1+"&pageSize="+this.pageSize;
    this.sanPhamPara.giatu=this.priceFrom;
    this.sanPhamPara.giaden =this.priceTo;
    
    this.getProductSort(this.sanPhamPara,para);
  }
  //load product
  onPageIndexChange(value: number): void {
    let para = "page="+value+"&pageSize="+this.pageSize;
    this.getProductSort(this.sanPhamPara,para);
  }
  onPageSizeChange(value: number): void {
    let para =  "page="+this.pageIndex+"&pageSize="+value;
    this.getProductSort(this.sanPhamPara,para);
  }
  filterByBrand(id : any) {
    if (id) {
      let para = "page="+1+"&pageSize="+6;
      this.sanPhamPara.nhanHieu=id;
      
      this.getProductSort(this.sanPhamPara,para);
    }
  }
  changeStatus(e : any) {
    if(e){
      if(e=="p-des"){
        this.getProducts(this.pageIndex, this.pageSize, 'gia', 'desc');
      }
      if(e=="p-asc"){
        this.getProducts(this.pageIndex, this.pageSize, 'gia', 'asc');
      }
      if(e=="default"){
        this.getProducts(this.pageIndex, this.pageSize, 'id', 'desc');
      }
    }
  }
  onAfterChange(value: number[] | number): void {
    console.log(`onAfterChange: ${value}`);
  }
  onChange(value: number): void {
    console.log(`onChange: ${value}`);
  }

  themVaoGio(sanpham : SanPham) : void {
    sanpham.soLuong=1;
    this.gioHangSer.plusProduct(sanpham);
    debugger;
    this.createNotification("success","Thành công", "Sản phẩm đã được thêm vào giỏ hàng");
    this.gioHang = this.gioHangSer.getGioHang(); 
  }
}
