package vn.scam.metashop.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.scam.metashop.entity.NguoiDung;
@Repository
public interface NguoiDungRepo extends JpaRepository<NguoiDung, Integer>{

	Page<NguoiDung> findAll(Specification<NguoiDung> specification, Pageable pageable);

	Optional<NguoiDung> findByUserName(String userName);

}
