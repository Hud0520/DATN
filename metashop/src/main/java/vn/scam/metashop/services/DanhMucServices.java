package vn.scam.metashop.services;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import vn.scam.metashop.BaseController;
import vn.scam.metashop.dto.MetaResponse;
import vn.scam.metashop.entity.DanhMuc;
import vn.scam.metashop.repository.DanhMucRepo;

@Service
public class DanhMucServices {
	
	@Autowired
	private DanhMucRepo danhMucRepo;
	public Page<DanhMuc> findAll(DanhMuc filterObject, Pageable pageable) {
		Page<DanhMuc> listPage = danhMucRepo.findAll(new Specification<DanhMuc>() {

			@Override
			public Predicate toPredicate(Root<DanhMuc> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				// TODO Auto-generated method stub
				List<Predicate> predicateList = new ArrayList<>();
				if(filterObject.getTenDanhMuc() != null) {
					predicateList.add(criteriaBuilder.like(root.get("tenDanhMuc"), "%"+filterObject.getTenDanhMuc()+"%"));
				}
				return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
			}
		},pageable);
		return listPage;
	}
	
}
