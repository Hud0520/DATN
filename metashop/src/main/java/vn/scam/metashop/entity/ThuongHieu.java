package vn.scam.metashop.entity;

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
@Table(name = "THUONGHIEU")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ThuongHieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "TEN_NHAN_HIEU")
    private String tenNhanHieu;

    @Column(name = "ANH")
    private String anh;
    
    @Column(name = "TEN_VAN_TAT")
    private String tenVanTat;
}
