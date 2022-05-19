package vn.scam.metashop.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import vn.scam.metashop.entity.SanPham;

@Repository
public interface SanPhamRepo extends JpaRepository<SanPham, Integer>{

    Page<SanPham> findAll(Specification<SanPham> specification, Pageable pageable);
    
    @Query(value = "Select * from sanpham where id in (select id from(select sp.id , sum(ct.SO_LUONG) s from sanpham sp left join chitietdonhang ct on sp.id = ct.MA_SAN_PHAM where sp.DANH_MUC = 1 group by sp.id  order by s desc) sp) limit 8" , nativeQuery = true)
	List<SanPham> getByOrder();

}
