package vn.scam.metashop.admin.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import vn.scam.metashop.BaseController;
import vn.scam.metashop.common.CommonUtils;
import vn.scam.metashop.common.Constants;
import vn.scam.metashop.services.NguoiDungServices;
import vn.scam.metashop.dto.Auth;
import vn.scam.metashop.dto.Grid;
import vn.scam.metashop.dto.HashMD5;
import vn.scam.metashop.dto.MetaResponse;
import vn.scam.metashop.entity.NguoiDung;
import vn.scam.metashop.repository.NguoiDungRepo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping(path = "/api/admin/v1/nguoidung")
public class NguoiDungControllerAdmin extends BaseController {
    @Autowired private NguoiDungRepo nguoiDungRepo;
    @Autowired private NguoiDungServices nguoiDungServices;
    @Autowired private CommonUtils commonUtils;
    
    @PostMapping(path = "/add")
    public ResponseEntity<MetaResponse> create(@RequestBody NguoiDung object){
    	if(object.getId() == null) {
			Optional<NguoiDung> exit = nguoiDungRepo.findByUserName(object.getUserName());
			if(exit.isPresent()) {
				return errorResponse("Tên người dùng đã tồn tại");
			}if(object.getPassWord().trim().length() <5){
	            return errorResponse("Mật khẩu phải dài hơn 5 ký tự");       
	        }else {
				object.setPassWord(HashMD5.encode(object.getPassWord()));
				nguoiDungRepo.save(object);
			}
    	}else {
    		nguoiDungRepo.save(object);
    	}
		return successResponse();	
	}
	@PostMapping(path = "/update")
	public ResponseEntity<MetaResponse> update(@RequestBody NguoiDung object){
		Optional<NguoiDung> exit = nguoiDungRepo.findById(object.getId());
		if(exit.isPresent()) {
			NguoiDung current = exit.get();
			current.setHoTen(object.getHoTen());
			current.setEmail(object.getEmail());
			current.setSdt(object.getSdt());
			current.setDiaChi(object.getDiaChi());
			return successResponse();
		}else {
			return errorResponse("Có lỗi xảy ra danh mục không tồn tại");
		}	
	}
    @PostMapping( path = "/delete/{id}")
	public ResponseEntity<MetaResponse> delete(@PathVariable Integer id) {
		try{nguoiDungRepo.deleteById(id);
			return successResponse();
		}catch (Exception e) {
			// TODO: handle exception
			return errorResponse(e.getMessage());
		}
	}

    @GetMapping(path = "")
    public ResponseEntity getAllData(NguoiDung object, HttpServletRequest request, HttpServletResponse response) {
        try {
			int pageSize = request.getParameter("pageSize") == null ? 20 : Integer.valueOf(request.getParameter("pageSize"));
			int page = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
			String sortby = request.getParameter("sortby") == null ? "id" : request.getParameter("sortby");
			Pageable pageable = PageRequest.of(page-1,pageSize,Sort.by(sortby).descending());
			Page<NguoiDung> list= nguoiDungServices.findAll(object, pageable);
			Grid<NguoiDung> grid = new Grid<>();
			grid.setTotal(list.getTotalElements());
			grid.setResult(list.getContent());
			return new ResponseEntity<Grid<NguoiDung>>(grid,HttpStatus.OK);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		}
    }
    
    @PostMapping(value = "/login")
	public ResponseEntity<MetaResponse> login(@RequestBody NguoiDung loginRequest) {
		if (nguoiDungServices.loginAdmin(loginRequest) == Constants.LOGIN_SUCCESS) {
			String auth;
			Auth login= null;
			try {
				auth = commonUtils.createToken(loginRequest.getUserName(), loginRequest.getPassWord(), "1");
				login = new Auth(auth,loginRequest.getUserName());
			} catch (Exception e) {
				return new ResponseEntity<MetaResponse>(new MetaResponse("false", ""), HttpStatus.OK);
			}
			return new ResponseEntity<MetaResponse>(new MetaResponse("00","success",login),
					HttpStatus.OK);
		}
		return new ResponseEntity<MetaResponse>(new MetaResponse("false", ""), HttpStatus.OK);

	}
    

}
