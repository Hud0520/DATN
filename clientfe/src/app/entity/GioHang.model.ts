import { SanPham } from "./SanPham.model"

export class GioHang {
    tongSanPham : number ;
    sanPhams : SanPham[];
    tongTien : number ;

    constructor(){
        this.tongSanPham = 0;
        this.sanPhams = []
        this.tongTien = 0;
    }
}