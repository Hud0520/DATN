package vn.scam.metashop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.scam.metashop.entity.SanPham;

@Repository
public interface SanPhamRepo extends JpaRepository<SanPham, Integer>{

    Page<SanPham> findAll(Specification<SanPham> specification, Pageable pageable);

}
