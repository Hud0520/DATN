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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import vn.scam.metashop.BaseController;
import vn.scam.metashop.dto.Grid;
import vn.scam.metashop.dto.MetaResponse;
import vn.scam.metashop.entity.DanhMuc;
import vn.scam.metashop.entity.ThuongHieu;
import vn.scam.metashop.repository.ThuongHieuRepo;
import vn.scam.metashop.services.DanhMucServices;
import vn.scam.metashop.services.ThuongHieuServices;

@Controller
@RequestMapping("/api/admin/v1/thuonghieu")
public class ThuongHieuControllerAdmin extends BaseController {
	@Autowired ThuongHieuRepo thuongHieuRepo;
	@Autowired ThuongHieuServices thuongHieuSer;
	@GetMapping(path = "")
	public ResponseEntity getListData(ThuongHieu object, HttpServletRequest request, HttpServletResponse response){
		try {
			int pageSize = request.getParameter("pageSize") == null ? 20 : Integer.valueOf(request.getParameter("pageSize"));
			int page = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
			String sortby = request.getParameter("sortby") == null ? "id" : request.getParameter("sortby");
			Pageable pageable = PageRequest.of(page-1,pageSize,Sort.by(sortby).descending());
			Page<ThuongHieu> list= thuongHieuSer.findAll(object, pageable);
			Grid<ThuongHieu> grid = new Grid<>();
			grid.setTotal((long)list.getTotalElements());
			grid.setResult(list.getContent());
			return new ResponseEntity<Grid<ThuongHieu>>(grid,HttpStatus.OK);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(path = "/add")
	public ResponseEntity add(@RequestBody ThuongHieu object) {
		try {
			thuongHieuRepo.save(object);
			return successResponse();
		} catch (Exception e) {
			// TODO: handle exception
			return errorResponse(e);
		}
	}
	
	@PostMapping(path = "/update")
	public ResponseEntity<MetaResponse> update(@RequestBody ThuongHieu object, HttpServletRequest request, HttpServletResponse response){
		Optional<ThuongHieu> exit = thuongHieuRepo.findById(object.getId());
		if(exit.isPresent()) {
			ThuongHieu current = exit.get();
			current.setTenNhanHieu(object.getTenNhanHieu());
			thuongHieuRepo.save(object);
			return successResponse();
		}else {
			return errorResponse("C?? l???i x???y ra danh m???c kh??ng t???n t???i");
		}	
	}
	@PostMapping(path = "/delete/{id}")
	public ResponseEntity<MetaResponse> delete(@PathVariable Integer id, HttpServletRequest request, HttpServletResponse response) {
		try{thuongHieuRepo.deleteById(id);
			return successResponse();
		}catch (Exception e) {
			// TODO: handle exception
			return errorResponse(e.getMessage());
		}
	}
}
