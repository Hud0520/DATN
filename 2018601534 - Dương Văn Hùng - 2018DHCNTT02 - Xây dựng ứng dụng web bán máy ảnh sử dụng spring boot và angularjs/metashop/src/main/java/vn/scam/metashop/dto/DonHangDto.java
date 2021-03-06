package vn.scam.metashop.dto;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DonHangDto {
    private Integer id;
    private String khachHang;
    private String maDonHang;
    private String hoTen;
    private String diaChiNhan;
    private String sdtNguoiNhan;
    private String emailNguoiNhan;
    private String nguoiThucHien;
    private String trangThai;
    private String moTa;
    private String ghiChu;

    private Date tuNgay;
    private Date denNgay;
}
