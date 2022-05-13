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
import org.springframework.web.bind.annotation.RequestMapping;

import vn.scam.metashop.BaseController;
import vn.scam.metashop.services.SanPhamServices;
import vn.scam.metashop.common.Constants;
import vn.scam.metashop.dto.Grid;
import vn.scam.metashop.dto.MetaResponse;
import vn.scam.metashop.dto.SanPhamDto;
import vn.scam.metashop.entity.SanPham;
import vn.scam.metashop.repository.SanPhamRepo;

@Controller
@RequestMapping(path = "/api/admin/v1/sanpham")
public class SanPhamControllerAdmin extends BaseController {
    @Autowired private SanPhamRepo sanPhamRepo;
    @Autowired private SanPhamServices sanPhamServices;

    @GetMapping(path = "/list-data")
	public ResponseEntity getListData(SanPhamDto object, HttpServletRequest request, HttpServletResponse response){
		try {
			int pageSize = request.getParameter("pageSize") == null ? 20 : Integer.valueOf(request.getParameter("pageSize"));
			int page = request.getParameter("page") == null ? 0 : Integer.valueOf(request.getParameter("page"));
			String sortby = request.getParameter("sortby") == null ? "id" : request.getParameter("sortby");
			Pageable pageable = PageRequest.of(page,pageSize,Sort.by(sortby).descending());
			Page<SanPham> list= sanPhamServices.findAll(object, pageable);
			Grid<SanPham> grid = new Grid<>();
			grid.setTotal(list.getTotalElements());
			grid.setResult(list.getContent());
			return new ResponseEntity<Grid<SanPham>>(grid,HttpStatus.OK);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

    @PostMapping(path = "/add")
	public ResponseEntity<MetaResponse> create(SanPham object, HttpServletRequest request, HttpServletResponse response){
		MetaResponse res = this.validate(object);
		if(res.getErrCode().equals(Constants.SUCCESS_CODE)){
			sanPhamRepo.save(object);
            return successResponse();
		}else{
            return errorResponse(res);
        }
		
	}
    @GetMapping(path = "/get")
    public ResponseEntity<MetaResponse> getOne(Integer id, HttpServletRequest request, HttpServletResponse response) {
        Optional<SanPham> exit = sanPhamRepo.findById(id);
        if(exit.isPresent()){
            MetaResponse res = new MetaResponse();
            res.setData(exit.get());
            res.setErrCode(Constants.SUCCESS_CODE);
            res.setErrMsg(Constants.SUCCESS_MSG);
            return successResponse(res);
        }else{
            return errorResponse("Sản phẩm không tồn tại!");
        }
    }
	@PostMapping(path = "/update")
	public ResponseEntity<MetaResponse> update(SanPham object, HttpServletRequest request, HttpServletResponse response){
		Optional<SanPham> exit = sanPhamRepo.findById(object.getId());
		if(exit.isPresent()) {
			SanPham current = exit.get();
            current.setSoLuong(object.getSoLuong());
            current.setChiTiet(object.getChiTiet());
            current.setAnh1(object.getAnh1());
            current.setAnh2(object.getAnh2());
            current.setAnh3(object.getAnh3());
            current.setAnh4(object.getAnh4());
            current.setGia(object.getGia());
            current.setPhuKien(object.getPhuKien());
            current.setThongSo(object.getThongSo());
            current.setThongTin(object.getThongTin());
			sanPhamRepo.save(object);
			return successResponse();
		}else {
			return errorResponse("Có lỗi xảy ra danh mục không tồn tại");
		}	
	}
	@PostMapping(path = "/delete")
	public ResponseEntity<MetaResponse> delete(Integer id, HttpServletRequest request, HttpServletResponse response) {
		try{sanPhamRepo.deleteById(id);
			return successResponse();
		}catch (Exception e) {
			// TODO: handle exception
			return errorResponse(e.getMessage());
		}
	}

    public MetaResponse validate(SanPham object){
        String errmes ="";
        MetaResponse res = new MetaResponse();
        res.setErrCode(Constants.SUCCESS_CODE);
        res.setErrMsg(Constants.SUCCESS_MSG);
        if("".equalsIgnoreCase(object.getTenSanPham().trim())){
            errmes += "Tên sản phẩm không được để trống. </br>";
            res.setErrCode(Constants.FAIL_CODE);
        }
        if(object.getGia() == null){
            errmes += "Giá sản phẩm không được để trống. </br>";
            res.setErrCode(Constants.FAIL_CODE);
        }
        if(object.getSoLuong() == 0){
            errmes += "Số lượng sản phẩm không được để trống. </br>";
            res.setErrCode(Constants.FAIL_CODE);
        }
        res.setErrMsg(errmes);
        return res;
    }
}
