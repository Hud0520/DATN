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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import vn.scam.metashop.BaseController;
import vn.scam.metashop.services.DanhMucServices;
import vn.scam.metashop.dto.Grid;
import vn.scam.metashop.dto.MetaResponse;
import vn.scam.metashop.entity.DanhMuc;
import vn.scam.metashop.repository.DanhMucRepo;

@Controller
@RequestMapping(path ="/api/admin/v1/danhmuc")
public class DanhMucControllerAdmin extends BaseController {
	@Autowired DanhMucRepo danhMucRepo;
	@Autowired DanhMucServices danhMucServices;
	@GetMapping(path = "")
	public ResponseEntity getListData(DanhMuc object, HttpServletRequest request, HttpServletResponse response){
		try {
			int pageSize = request.getParameter("pageSize") == null ? 20 : Integer.valueOf(request.getParameter("pageSize"));
			int page = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
			String sortby = request.getParameter("sortby") == null ? "id" : request.getParameter("sortby");
			Pageable pageable = PageRequest.of(page-1,pageSize,Sort.by(sortby).descending());
			Page<DanhMuc> list= danhMucServices.findAll(object, pageable);
			Grid<DanhMuc> grid = new Grid<>();
			grid.setTotal(list.getTotalElements());
			grid.setResult(list.getContent());
			return new ResponseEntity<Grid<DanhMuc>>(grid,HttpStatus.OK);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(path = "/add")
	public ResponseEntity<MetaResponse> create(@RequestBody DanhMuc object, HttpServletRequest request, HttpServletResponse response){
		Optional<DanhMuc> exit = danhMucRepo.findByTenDanhMuc(object.getTenDanhMuc());
		if(exit.isPresent()) {
			return errorResponse("Danh m???c ???? t???n t???i");
		}else {
			danhMucRepo.save(object);
		}
		return successResponse();	
	}
	@PostMapping(path = "/update")
	public ResponseEntity<MetaResponse> update(@RequestBody DanhMuc object, HttpServletRequest request, HttpServletResponse response){
		Optional<DanhMuc> exit = danhMucRepo.findById(object.getId());
		if(exit.isPresent()) {
			DanhMuc current = exit.get();
			current.setMoTa(object.getMoTa());
			danhMucRepo.save(object);
			return successResponse();
		}else {
			return errorResponse("C?? l???i x???y ra danh m???c kh??ng t???n t???i");
		}	
	}
	@PostMapping(path = "/delete")
	public ResponseEntity<MetaResponse> delete(@RequestBody DanhMuc object, HttpServletRequest request, HttpServletResponse response) {
		try{danhMucRepo.deleteById(object.getId());
			return successResponse();
		}catch (Exception e) {
			// TODO: handle exception
			return errorResponse(e.getMessage());
		}
	}
}
