package vn.scam.metashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.scam.metashop.entity.ThuongHieu;

@Repository
public interface ThuongHieuRepo extends JpaRepository<ThuongHieu, Integer>{

}
