package vn.scam.metashop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.scam.metashop.entity.DanhMuc;
import vn.scam.metashop.entity.ThuongHieu;

@Repository
public interface ThuongHieuRepo extends JpaRepository<ThuongHieu, Integer>{

	Page<ThuongHieu> findAll(Specification<ThuongHieu> specification, Pageable pageable);

}
