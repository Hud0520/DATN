package vn.scam.metashop.entity;

import java.math.BigDecimal;
import java.util.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.val;

@Getter
@Setter
@AllArgsConstructor
public class GioHang {
    private int tongSanPham;
    private final Map<Integer,SanPham> sanPhams = new HashMap<Integer,SanPham>();
    private long tongTien;
    public boolean isEmptyCart(){
		return sanPhams.isEmpty();
	}
	public void capNhat(SanPham sanPham){
		if(sanPhams.containsKey(sanPham.getId())){
			sanPhams.get(sanPham.getId()).setSoLuong( sanPham.getSoLuong());
            SanPham item=sanPhams.get(sanPham.getId());
            if(item.getSoLuong()==0){
				sanPhams.remove(sanPham.getId());
			}
		} else {
			sanPhams.put(sanPham.getId(),sanPham);
		}
        tongSanPham = tinhTongSanPham();
		tongTien = tinhTongTien();
	}
	public void xoaSanPham(Integer id) throws NoSuchElementException{
		if(sanPhams.containsKey(id)){
			sanPhams.remove(id);
		} else {
			throw new NoSuchElementException();
		}
        tongSanPham = tinhTongSanPham();
		tongTien = tinhTongTien();
	}

	public void xoaTatCa(){
        tongSanPham = 0;
		tongTien = 0;
		sanPhams.clear();
	}
	public int tinhTongSanPham(){
		return (int) sanPhams.values().stream().count();
	}

	public GioHang(){
		tongSanPham = 0;
		tongTien = 0;
	}

	public long tinhTongTien(){
		return sanPhams.values().stream().mapToLong((value) -> { return value.getSoLuong()*value.getGia().longValue();}).sum();
	}
}
