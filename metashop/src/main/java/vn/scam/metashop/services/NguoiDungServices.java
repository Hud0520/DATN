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
import vn.scam.metashop.dto.HashMD5;
import vn.scam.metashop.dto.MetaResponse;
import vn.scam.metashop.entity.DanhMuc;
import vn.scam.metashop.entity.NguoiDung;
import vn.scam.metashop.repository.NguoiDungRepo;

@Service
public class NguoiDungServices extends BaseController {
    @Autowired private NguoiDungRepo nguoiDungRepo;

    public Page<NguoiDung> findAll(NguoiDung filter, Pageable pageable){
        Page<NguoiDung> list = nguoiDungRepo.findAll(new Specification<NguoiDung>() {

			@Override
			public Predicate toPredicate(Root<NguoiDung> root, CriteriaQuery<?> query,
					CriteriaBuilder criteriaBuilder) {
				List<Predicate> pre = new ArrayList<>();
				if(filter.getUserName() != null) {
					pre.add(criteriaBuilder.like(root.get("userName"), "%"+filter.getUserName()+"%"));
				}
				if(filter.getHoTen() != null) {
					pre.add(criteriaBuilder.like(root.get("hoTen"), "%"+filter.getHoTen()+"%"));
				}
				if(filter.getDiaChi() != null) {
					pre.add(criteriaBuilder.like(root.get("diaChi"),"%"+filter.getDiaChi()+"%"));
				}
				
				return criteriaBuilder.and(pre.toArray(new Predicate[pre.size()]));
			}
		}, pageable);
        
        return list;
    }
	
}
