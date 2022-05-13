package vn.scam.metashop.entity;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "CHITIETDONHANG")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChiTietDonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "MA_DON_HANG")
    private Integer maDonHang;

    @Column(name = "MA_SAN_PHAM")
    private Integer maSanPham;

    @Column(name = "SO_LUONG")
    private int soLuong;

    @Column(name = "DON_GIA")
    private BigDecimal donGia;


    public ChiTietDonHang(Integer maDonHang,Integer maSanPham,int soLuong,BigDecimal donGia) {
        this.maDonHang = maDonHang;
        this.maSanPham = maSanPham;
        this.soLuong = soLuong;
        this.donGia = donGia;
    } 

}
