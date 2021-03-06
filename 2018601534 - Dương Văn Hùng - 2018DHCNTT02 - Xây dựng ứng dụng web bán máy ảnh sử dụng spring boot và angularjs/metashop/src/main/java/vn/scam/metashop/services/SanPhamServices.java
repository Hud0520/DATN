package vn.scam.metashop.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import vn.scam.metashop.dto.SanPhamDto;
import vn.scam.metashop.entity.SanPham;
import vn.scam.metashop.repository.SanPhamRepo;

@Service
public class SanPhamServices {
    @Autowired private SanPhamRepo sanPhamRepo;

    public Page<SanPham> findAll(SanPhamDto filter, Pageable pageable){
        Page<SanPham> list = sanPhamRepo.findAll(new Specification<SanPham>() {

			@Override
			public Predicate toPredicate(Root<SanPham> root, CriteriaQuery<?> query,
					CriteriaBuilder criteriaBuilder) {
				List<Predicate> pre = new ArrayList<>();
				if(filter.getId() != null && !"".equals(filter.getId())) {
					pre.add(criteriaBuilder.equal(root.get("id"), filter.getId()));
				}
				if(filter.getTenSanPham() != null && !"".equals(filter.getTenSanPham().trim())) {
					pre.add(criteriaBuilder.like(root.get("tenSanPham"), "%"+filter.getTenSanPham()+"%"));
				}
				if(filter.getNhanHieu() != null && !"".equals(filter.getNhanHieu().trim())) {
					pre.add(criteriaBuilder.equal(root.get("nhanHieu"), filter.getNhanHieu()));
				}
				if(filter.getGiatu() != null) {
					pre.add(criteriaBuilder.greaterThanOrEqualTo(root.get("gia"), filter.getGiatu()));
				}
				if(filter.getGiaden() != null) {
					pre.add(criteriaBuilder.lessThanOrEqualTo(root.get("gia"), filter.getGiaden()));
				}
				if(filter.getDanhMuc() != null && !"".equals(filter.getDanhMuc().trim())) {
					pre.add(criteriaBuilder.equal(root.get("danhMuc"), filter.getDanhMuc()));
				}
				return criteriaBuilder.and(pre.toArray(new Predicate[pre.size()]));
			}

		}, pageable);
        
        return list;
    }
    
    
}
