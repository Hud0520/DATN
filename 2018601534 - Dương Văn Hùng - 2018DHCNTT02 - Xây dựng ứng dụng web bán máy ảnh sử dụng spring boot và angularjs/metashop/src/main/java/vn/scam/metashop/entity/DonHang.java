package vn.scam.metashop.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name ="DONHANG")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    
    @Column(name = "KHACH_HANG")
    private String khachHang;
    
    @Column(name = "MA_DON_HANG")
    private String maDonHang;
    
    @Column(name = "HO_TEN")
    private String hoTen;
    
    @Column(name = "DIA_CHI_NHAN")
    private String diaChiNhan;
    
    @Column(name = "SDT_NGUOI_NHAN")
    private String sdtNguoiNhan;
    
    @Column(name = "EMAIL_NGUOI_NHAN")
    private String emailNguoiNhan;
    
    @Column(name = "NGUOI_THUC_HIEN")
    private String nguoiThucHien;
    
    @Column(name = "TRANG_THAI")
    private String trangThai;
    
    @Column(name = "MO_TA")
    private String moTa;
    
    @Column(name = "GHI_CHU")
    private String ghiChu;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Column(name = "NGAY_TAO")
    private Date ngayTao;
    
    @Column(name = "TONG_TIEN")
    private BigDecimal tongTien;
    
    @OneToMany(mappedBy="maDonHang",cascade = CascadeType.ALL)
    List<ChiTietDonHang> chiTiet;
    
}
