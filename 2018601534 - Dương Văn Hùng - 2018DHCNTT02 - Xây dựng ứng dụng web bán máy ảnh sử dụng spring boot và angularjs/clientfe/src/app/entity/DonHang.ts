import { ChiTiet } from "./ChiTiet";
import { SanPham } from "./SanPham.model";

export class DonHang{
    id : string;
    khachHang : string;
    maDonHang : string;
    hoTen : string;
    diaChiNhan : string;
    sdtNguoiNhan : string;
    emailNguoiNhan : string;
    nguoiThucHien : string;
    trangThai : string;
    moTa : string;
    ghiChu : string;
    ngayTao : string;
    chiTiet : any;
    tongTien : number
    constructor(){
        this.id = "";
        this.khachHang = "";
        this.maDonHang = "";
        this.hoTen = "";
        this.diaChiNhan = "";
        this.sdtNguoiNhan = "";
        this.emailNguoiNhan = "";
        this.nguoiThucHien = "";
        this.trangThai = "";
        this.moTa = "";
        this.ghiChu = "";
        this.ngayTao = "";
        this.chiTiet = [];
        this.tongTien = 0 ;
    }
    
}