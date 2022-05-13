package vn.scam.metashop.services;

import java.util.*;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import vn.scam.metashop.dto.DonHangDto;
import vn.scam.metashop.entity.DonHang;
import vn.scam.metashop.repository.DonHangRepo;

@Service
public class DonHangServices {
    @Autowired
	private DonHangRepo donHangRepo;
	public Page<DonHang> findAll(DonHangDto filterObject, Pageable pageable) {
		Page<DonHang> listPage = donHangRepo.findAll(new Specification<DonHang>() {

			@Override
			public Predicate toPredicate(Root<DonHang> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				// TODO Auto-generated method stub
				List<Predicate> predicateList = new ArrayList<>();
				if(filterObject.getSdtNguoiNhan() != null) {
					predicateList.add(criteriaBuilder.like(root.get("sdtNguoiNhan"), "%"+filterObject.getSdtNguoiNhan()+"%"));
				}
                if(filterObject.getHoTen() != null){
                    predicateList.add(criteriaBuilder.like(root.get("hoTen"), "%"+filterObject.getHoTen()+"%"));
                }
                if(filterObject.getTrangThai() != null){
                    predicateList.add(criteriaBuilder.equal(root.get("trangThai"), filterObject.getTrangThai()));
                }
                if(filterObject.getTuNgay() != null){
                    predicateList.add(criteriaBuilder.greaterThan(root.get("ngayTao"), filterObject.getTuNgay()));
                }
                if(filterObject.getDenNgay() != null){
                    predicateList.add(criteriaBuilder.lessThan(root.get("ngayTao"), filterObject.getDenNgay()));
                }
				return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
			}
		},pageable);
		return listPage;
	}
}
