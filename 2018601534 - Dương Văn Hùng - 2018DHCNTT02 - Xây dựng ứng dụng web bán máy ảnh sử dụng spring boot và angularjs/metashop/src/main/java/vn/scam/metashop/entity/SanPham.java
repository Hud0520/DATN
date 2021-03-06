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

@Table(name = "SANPHAM")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name ="TEN_SAN_PHAM")
    private String tenSanPham;
    
    @Column(name ="NHAN_HIEU")
    private String nhanHieu;
    
    @Column(name ="BAO_HANH")
    private String baoHanh;
    
    @Column(name ="TOM_TAT")
    private String tomTat;
    
    @Column(name ="PHU_KIEN")
    private String phuKien;
    
    @Column(name ="CAU_HINH")
    private String cauHinh;
    
    @Column(name ="GIA")
    private BigDecimal gia;
    
    @Column(name ="THONG_TIN")
    private String thongTin;
    
    @Column(name ="CHI_TIET")
    private String chiTiet;
    
    @Column(name ="THONG_SO")
    private String thongSo;
    
    @Column(name ="ANH1")
    private String anh1;
    
    @Column(name ="ANH2")
    private String anh2;
    
    @Column(name ="ANH3")
    private String anh3;
    
    @Column(name ="ANH4")
    private String anh4;
    
    @Column(name ="SO_LUONG")
    private int soLuong;
    
    @Column(name = "DANH_MUC")
    private String danhMuc;
}
