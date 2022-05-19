package vn.scam.metashop.repository;


import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import vn.scam.metashop.entity.DanhMuc;

@Repository
public interface DanhMucRepo extends JpaRepository<DanhMuc, Integer>, PagingAndSortingRepository<DanhMuc, Integer>{

	Page<DanhMuc> findAll(Specification<DanhMuc> specification, Pageable pageable);
	Optional<DanhMuc> findByTenDanhMuc(String tenDanhMuc);
}
