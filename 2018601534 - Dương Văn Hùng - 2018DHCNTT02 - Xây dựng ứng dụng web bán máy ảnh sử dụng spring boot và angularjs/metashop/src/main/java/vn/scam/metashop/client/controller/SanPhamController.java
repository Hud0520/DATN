package vn.scam.metashop.client.controller;

import java.util.List;
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
import org.springframework.web.bind.annotation.RequestMapping;

import vn.scam.metashop.BaseController;
import vn.scam.metashop.common.Constants;
import vn.scam.metashop.dto.Grid;
import vn.scam.metashop.dto.MetaResponse;
import vn.scam.metashop.dto.SanPhamDto;
import vn.scam.metashop.entity.SanPham;
import vn.scam.metashop.repository.SanPhamRepo;
import vn.scam.metashop.services.SanPhamServices;

@Controller
@RequestMapping("/api/v1/sanpham")
public class SanPhamController extends BaseController {
    
    @Autowired SanPhamRepo sanPhamRepo;

    @Autowired SanPhamServices sanPhamServices;

    @GetMapping(path = "")
	public ResponseEntity getListData(SanPhamDto object, HttpServletRequest request, HttpServletResponse response){
		Grid<SanPham> grid = new Grid<>();
		try {
			int pageSize = request.getParameter("pageSize") == null ? 20 : Integer.valueOf(request.getParameter("pageSize"));
			int page = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
			String sortby = request.getParameter("sortby") == null ? "id" : request.getParameter("sortby");
			String order = request.getParameter("order");
			Sort sort = Sort.by(sortby);
			if("desc".equals(order)){
				sort = Sort.by(sortby).descending();
			}
			Pageable pageable = PageRequest.of(page-1,pageSize,sort);
			 
			Page<SanPham> list= sanPhamServices.findAll(object, pageable);
			
			grid.setTotal((long)list.getTotalElements());
			grid.setResult(list.getContent());
			grid.setErrCode(Constants.SUCCESS_CODE);
			grid.setErrDessc(Constants.SUCCESS_MSG);
			return new ResponseEntity<Grid<SanPham>>(grid,HttpStatus.OK);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			grid.setErrCode(Constants.FAIL_CODE);
			grid.setErrDessc(e.getMessage());
			return new ResponseEntity<Grid<SanPham>>(grid,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @GetMapping(path = "/get-by-order")
    public ResponseEntity getListData(HttpServletRequest request, HttpServletResponse response){
		Grid<SanPham> grid = new Grid<>();
		try {
			List<SanPham> list= sanPhamRepo.getByOrder();
			grid.setTotal((long) list.size());
			grid.setResult(list);
			grid.setErrCode(Constants.SUCCESS_CODE);
			grid.setErrDessc(Constants.SUCCESS_MSG);
			return new ResponseEntity<Grid<SanPham>>(grid,HttpStatus.OK);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			grid.setErrCode(Constants.FAIL_CODE);
			grid.setErrDessc(e.getMessage());
			return new ResponseEntity<Grid<SanPham>>(grid,HttpStatus.INTERNAL_SERVER_ERROR);
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
            return errorResponse("S???n ph???m kh??ng t???n t???i!");
        }
    }

}
