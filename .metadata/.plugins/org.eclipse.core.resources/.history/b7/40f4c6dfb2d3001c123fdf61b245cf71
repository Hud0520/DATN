package vn.scam.metashop.client.controller;

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
import org.springframework.web.bind.annotation.RequestMapping;

import vn.scam.metashop.BaseController;
import vn.scam.metashop.services.DanhMucServices;
import vn.scam.metashop.dto.Grid;
import vn.scam.metashop.dto.MetaResponse;
import vn.scam.metashop.entity.DanhMuc;
import vn.scam.metashop.repository.DanhMucRepo;

@Controller
@RequestMapping(path ="/api/v1/danhmuc")
public class DanhMucController extends BaseController {
	@Autowired DanhMucRepo danhMucRepo;
	@Autowired DanhMucServices danhMucServices;
	@GetMapping(path = "")
	public ResponseEntity getListData(DanhMuc object, HttpServletRequest request, HttpServletResponse response){
		try {
			int pageSize = request.getParameter("pageSize") == null ? 20 : Integer.valueOf(request.getParameter("pageSize"));
			int page = request.getParameter("page") == null ? 0 : Integer.valueOf(request.getParameter("page"));
			String sortby = request.getParameter("sortby") == null ? "id" : request.getParameter("sortby");
			Pageable pageable = PageRequest.of(page,pageSize,Sort.by(sortby).descending());
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

}
