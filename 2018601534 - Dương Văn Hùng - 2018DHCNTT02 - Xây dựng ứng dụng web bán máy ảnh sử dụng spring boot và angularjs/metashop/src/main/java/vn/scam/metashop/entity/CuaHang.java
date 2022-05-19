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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CUAHANG")
public class CuaHang {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "TEN_CUA_HANG")
	private String tenCuaHang;
	
	@Column(name = "SDT")
	private String sdt;
	
	@Column(name = "THOI_MO_CUA")
	private String moCua;
	
	@Column(name = "EMAIL")
	private String email;
	
	@Column( name = "DIA_CHI")
	private String diaChi;
	
	@Column( name = "DIA_CHI_MAP")
	private String diaChiMap;
	

}
