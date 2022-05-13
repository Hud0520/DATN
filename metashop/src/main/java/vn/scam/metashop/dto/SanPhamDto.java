package vn.scam.metashop.dto;

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

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamDto {
    private Integer id;
    private String tenSanPham;
    private String nhanHieu;
    private BigDecimal giatu;
    private BigDecimal giaden;
    private String danhMuc;
}
