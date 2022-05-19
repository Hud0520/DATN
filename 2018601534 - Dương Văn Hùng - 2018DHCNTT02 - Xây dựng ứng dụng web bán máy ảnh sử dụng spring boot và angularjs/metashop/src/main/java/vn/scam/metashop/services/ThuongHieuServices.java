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

import vn.scam.metashop.entity.DanhMuc;
import vn.scam.metashop.entity.ThuongHieu;
import vn.scam.metashop.repository.DanhMucRepo;
import vn.scam.metashop.repository.ThuongHieuRepo;

@Service
public class ThuongHieuServices {
	@Autowired
	private ThuongHieuRepo thuongHieuRepo;
	public Page<ThuongHieu> findAll(ThuongHieu filterObject, Pageable pageable) {
		Page<ThuongHieu> listPage = thuongHieuRepo.findAll(new Specification<ThuongHieu>() {

			@Override
			public Predicate toPredicate(Root<ThuongHieu> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				// TODO Auto-generated method stub
				List<Predicate> predicateList = new ArrayList<>();
				if(filterObject.getTenNhanHieu() != null) {
					predicateList.add(criteriaBuilder.like(root.get("tenNhanHieu"), "%"+filterObject.getTenNhanHieu()+"%"));
				}
				return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
			}
		},pageable);
		return listPage;
	}
	
}
