package vn.scam.metashop.admin.controller;

import java.nio.file.Path;
import java.util.List;
import java.util.Map;
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
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import vn.scam.metashop.BaseController;
import vn.scam.metashop.services.DonHangServices;
import vn.scam.metashop.common.Constants;
import vn.scam.metashop.dto.DonHangDto;
import vn.scam.metashop.dto.Grid;
import vn.scam.metashop.dto.MetaResponse;
import vn.scam.metashop.entity.ChiTietDonHang;
import vn.scam.metashop.entity.DonHang;
import vn.scam.metashop.repository.ChiTietDonHangRepo;
import vn.scam.metashop.repository.DonHangRepo;

@Controller
@RequestMapping(path = "/api/admin/v1/donhang")
public class DonHangControllerAdmin extends BaseController {
    @Autowired DonHangRepo donHangRepo;
	@Autowired DonHangServices danhMucServices;
    @Autowired ChiTietDonHangRepo chiTietDonHangRepo;
    @Autowired JdbcTemplate jdbctemplate;
	@GetMapping(path = "")
	public ResponseEntity getListData(DonHangDto object, HttpServletRequest request, HttpServletResponse response){
		try {
			int pageSize = request.getParameter("pageSize") == null ? 20 : Integer.valueOf(request.getParameter("pageSize"));
			int page = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
			String sortby = request.getParameter("sortby") == null ? "id" : request.getParameter("sortby");
			Pageable pageable = PageRequest.of(page-1,pageSize,Sort.by(sortby).descending());
			Page<DonHang> list= danhMucServices.findAll(object, pageable);
			Grid<DonHang> grid = new Grid<>();
			grid.setTotal(list.getTotalElements());
			grid.setResult(list.getContent());
			return new ResponseEntity<Grid<DonHang>>(grid,HttpStatus.OK);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(path = "/update")
	public ResponseEntity<MetaResponse> update(@RequestBody DonHang object, HttpServletRequest request, HttpServletResponse response){
		Optional<DonHang> exit = donHangRepo.findById(object.getId());
		if(exit.isPresent()) {
			DonHang current = exit.get();
            current.setDiaChiNhan(object.getDiaChiNhan());
            current.setEmailNguoiNhan(object.getEmailNguoiNhan());
            current.setGhiChu(object.getGhiChu());
            current.setTrangThai(object.getTrangThai());
            donHangRepo.save(current);
			return successResponse();
		}else {
			return errorResponse("C?? l???i x???y ra danh m???c kh??ng t???n t???i");
		}	
	}
	@PostMapping(path = "/delete")
	public ResponseEntity<MetaResponse> delete(Integer id, HttpServletRequest request, HttpServletResponse response) {
		try{donHangRepo.deleteById(id);
			return successResponse();
		}catch (Exception e) {
			// TODO: handle exception
			return errorResponse(e.getMessage());
		}
	}

	@GetMapping(path = "/get")
    public ResponseEntity<MetaResponse> getOne(Integer id, HttpServletRequest request, HttpServletResponse response) {
        Optional<DonHang> exit = donHangRepo.findById(id);
        if(exit.isPresent()){
            MetaResponse res = new MetaResponse();
            res.setData(exit.get());
            res.setErrCode(Constants.SUCCESS_CODE);
            res.setErrMsg(Constants.SUCCESS_MSG);
            return successResponse(res);
        }else{
            return errorResponse("S???n ph???m kh??ng t???n t???i!");
        }
    }

	@GetMapping(path = "/chitiet/{id}")
	public ResponseEntity getListSanPham(@PathVariable(name = "id") Integer id){
		MetaResponse res = new MetaResponse();
		if(id == null){
			return errorResponse("B???n c???n ch???n ????n h??ng ????? xem chi ti???t");
		}else{
			String sql = "SELECT sp.id,sp.TEN_SAN_PHAM,ct.DON_GIA,ct.SO_LUONG FROM SANPHAM sp inner join CHITIETDONHANG ct on sp.ID = ct.MA_SAN_PHAM WHERE ct.MA_DON_HANG = "+id;
			List<Map<String, Object>> exit = jdbctemplate.queryForList(sql);
			res.setData(exit);
            res.setErrCode(Constants.SUCCESS_CODE);
            res.setErrMsg(Constants.SUCCESS_MSG);
            return successResponse(res);
		}
	}
	
	@PostMapping(value = "/cancel-bill")
	public ResponseEntity<MetaResponse> cancelBill(@RequestBody DonHang bill) {
		if(bill!=null) {
			// save bill	
			bill.setTrangThai(Constants.Status.CANCELED);
			donHangRepo.save(bill);
			// refund produc
			return new ResponseEntity<MetaResponse>(new MetaResponse("00","oke"), HttpStatus.OK);
		}
		return new ResponseEntity<MetaResponse>(new MetaResponse("44", "L???i tr???ng"), HttpStatus.OK);
	}

}
