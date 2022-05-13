package vn.scam.metashop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.scam.metashop.entity.DonHang;



@Repository
public interface DonHangRepo extends JpaRepository<DonHang, Integer> {

    Page<DonHang> findAll(Specification<DonHang> specification, Pageable pageable);

}
