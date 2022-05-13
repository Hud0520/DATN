import { SanPham } from "./SanPham.model"

export interface GioHang {
    tongSanPham : number ,
    sanPhams : Map<number, SanPham>,
    tongTien : number ,
}