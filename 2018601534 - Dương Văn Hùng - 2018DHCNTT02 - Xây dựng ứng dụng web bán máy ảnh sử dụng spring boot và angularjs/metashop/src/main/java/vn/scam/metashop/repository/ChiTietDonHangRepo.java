package vn.scam.metashop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import vn.scam.metashop.entity.ChiTietDonHang;

@Repository
public interface ChiTietDonHangRepo extends JpaRepository<ChiTietDonHang, Integer> {

	List<ChiTietDonHang> findAllByMaDonHang(Integer id);
	
}
