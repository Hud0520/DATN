package vn.scam.metashop.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import vn.scam.metashop.BaseController;
import vn.scam.metashop.dto.HashMD5;
import vn.scam.metashop.dto.MetaResponse;
import vn.scam.metashop.entity.DanhMuc;
import vn.scam.metashop.entity.NguoiDung;
import vn.scam.metashop.repository.NguoiDungRepo;
import vn.scam.metashop.common.Constants;

@Service
public class NguoiDungServices extends BaseController {
    @Autowired private NguoiDungRepo nguoiDungRepo;
    @Autowired private JdbcTemplate jdbcTemplate;

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

	public Long loginAdmin(NguoiDung loginRequest) {
		// TODO Auto-generated method stub
			String sql = "";
			Map<String, Object> paramMaps = new HashMap<String, Object>();
			if (loginRequest.getUserName() != null && loginRequest.getPassWord() != null) {
				sql = "select * from nguoidung where user_name= '"+loginRequest.getUserName()+"' and pass_word = md5('"+loginRequest.getPassWord()+"') and role=1";
			}
			if (!sql.isEmpty()) {
				List<NguoiDung> result = jdbcTemplate.query(sql,new BeanPropertyRowMapper(NguoiDung.class));
				if (result.size()>0)
					return Constants.LOGIN_SUCCESS;
				return Constants.LOGIN_FAIL;
			}
			return Constants.LOGIN_FAIL;
	}
	
}
