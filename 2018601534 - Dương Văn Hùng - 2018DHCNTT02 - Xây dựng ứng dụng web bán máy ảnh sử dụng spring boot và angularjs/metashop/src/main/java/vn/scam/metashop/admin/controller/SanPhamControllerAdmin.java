package vn.scam.metashop.admin.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping(path = "")
	public ResponseEntity getListData(SanPhamDto object, HttpServletRequest request, HttpServletResponse response){
		try {
			int pageSize = request.getParameter("pageSize") == null ? 20 : Integer.valueOf(request.getParameter("pageSize"));
			int page = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
			String sortby = request.getParameter("sortby") == null ? "id" : request.getParameter("sortby");
			Pageable pageable = PageRequest.of(page-1,pageSize,Sort.by(sortby).descending());
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
	public ResponseEntity<MetaResponse> create(@RequestBody SanPham object, HttpServletRequest request, HttpServletResponse response){
		MetaResponse res = this.validate(object);
		if(res.getErrCode().equals(Constants.SUCCESS_CODE)){
			SanPham s = sanPhamRepo.save(object);
			res.setData(s);
            return successResponse(res);
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
            return errorResponse("S???n ph???m kh??ng t???n t???i!");
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
			return errorResponse("C?? l???i x???y ra danh m???c kh??ng t???n t???i");
		}	
	}
	@PostMapping(path = "/delete/{id}")
	public ResponseEntity<MetaResponse> delete(@PathVariable(name = "id") Integer id, HttpServletRequest request, HttpServletResponse response) {
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
            errmes += "T??n s???n ph???m kh??ng ???????c ????? tr???ng. </br>";
            res.setErrCode(Constants.FAIL_CODE);
        }
        if(object.getGia() == null){
            errmes += "Gi?? s???n ph???m kh??ng ???????c ????? tr???ng. </br>";
            res.setErrCode(Constants.FAIL_CODE);
        }
        if(object.getSoLuong() == 0){
            errmes += "S??? l?????ng s???n ph???m kh??ng ???????c ????? tr???ng. </br>";
            res.setErrCode(Constants.FAIL_CODE);
        }
        res.setErrMsg(errmes);
        return res;
    }
    
    @RequestMapping(path = "/cms_anh/{id}", method = RequestMethod.POST, consumes = { "multipart/form-data" })
	public ResponseEntity<MetaResponse> fileUpload(@PathVariable(name = "id") Integer id,
			@RequestParam(name = "file0",required=false) MultipartFile multipartFile,
			@RequestParam(name = "file1",required=false) MultipartFile multipartFile1,
			@RequestParam(name = "file2",required=false) MultipartFile multipartFile2,
			@RequestParam(name ="file3",required=false) MultipartFile multipartFile3) {
		String rootFileUpload = Constants.ROOT_IMAGES_BACKEND;
		String rootFileUpload1 = Constants.ROOT_IMAGES_FRONTEND;
//		String rootFileUpload = "/home/app/bidv_run";
		SanPham product = sanPhamRepo.findById(id).orElse(null);
		String originalFilename = "";
		File file = null;
		File file1 = null;
		if (product != null) {
			if(multipartFile != null) {
				originalFilename = multipartFile.getOriginalFilename();
			product.setAnh1(originalFilename);
			 file = new File(rootFileUpload + originalFilename);
			if (file.getParentFile().exists() == false) {
				file.getParentFile().mkdirs();
			}
			 file1 = new File(rootFileUpload1 + originalFilename);
			if (file1.getParentFile().exists() == false) {
				file1.getParentFile().mkdirs();
			}
			try {
				try (InputStream is = multipartFile.getInputStream()) {
					try (OutputStream os = new FileOutputStream(file)) {
						byte[] b = new byte[10240];
						int size = 0;
						while ((size = is.read(b)) != -1) {
							os.write(b, 0, size);
						}
					}

					is.close();
				}
				try (InputStream is1 = multipartFile.getInputStream()) {
					try (OutputStream os = new FileOutputStream(file1)) {
						byte[] b = new byte[10240];
						int size = 0;
						while ((size = is1.read(b)) != -1) {
							os.write(b, 0, size);
						}
					}
					is1.close();
				}
				// save product
				
			} catch (IOException e) {
				e.printStackTrace();
				return new ResponseEntity<MetaResponse>(new MetaResponse("00","","Update th??nh c??ng"), HttpStatus.OK);
			}
			}
			if(multipartFile1 != null) {
			originalFilename = multipartFile1.getOriginalFilename();
			product.setAnh2(originalFilename);
			 file = new File(rootFileUpload + originalFilename);
			if (file.getParentFile().exists() == false) {
				file.getParentFile().mkdirs();
			}
			 file1 = new File(rootFileUpload1 + originalFilename);
			if (file1.getParentFile().exists() == false) {
				file1.getParentFile().mkdirs();
			}
			try {
				try (InputStream is = multipartFile1.getInputStream()) {
					try (OutputStream os = new FileOutputStream(file)) {
						byte[] b = new byte[10240];
						int size = 0;
						while ((size = is.read(b)) != -1) {
							os.write(b, 0, size);
						}
					}

					is.close();
				}
				try (InputStream is1 = multipartFile1.getInputStream()) {
					try (OutputStream os = new FileOutputStream(file1)) {
						byte[] b = new byte[10240];
						int size = 0;
						while ((size = is1.read(b)) != -1) {
							os.write(b, 0, size);
						}
					}
					is1.close();
				}
				// save product
				
			} catch (IOException e) {
				e.printStackTrace();
				return new ResponseEntity<MetaResponse>(new MetaResponse("00","","Update th??nh c??ng"), HttpStatus.OK);
			}
			}
			if(multipartFile2 != null) {
			originalFilename = multipartFile2.getOriginalFilename();
			product.setAnh3(originalFilename);
			file = new File(rootFileUpload + originalFilename);
			if (file.getParentFile().exists() == false) {
				file.getParentFile().mkdirs();
			}
			file1 = new File(rootFileUpload1 + originalFilename);
			if (file1.getParentFile().exists() == false) {
				file1.getParentFile().mkdirs();
			}
			try {
				try (InputStream is = multipartFile2.getInputStream()) {
					try (OutputStream os = new FileOutputStream(file)) {
						byte[] b = new byte[10240];
						int size = 0;
						while ((size = is.read(b)) != -1) {
							os.write(b, 0, size);
						}
					}

					is.close();
				}
				try (InputStream is1 = multipartFile2.getInputStream()) {
					try (OutputStream os = new FileOutputStream(file1)) {
						byte[] b = new byte[10240];
						int size = 0;
						while ((size = is1.read(b)) != -1) {
							os.write(b, 0, size);
						}
					}
					is1.close();
				}
				// save product
				
			} catch (IOException e) {
				e.printStackTrace();
				return new ResponseEntity<MetaResponse>(new MetaResponse("00","","Update th??nh c??ng"), HttpStatus.OK);
			}
			}
			if(multipartFile3 != null) {
			originalFilename = multipartFile3.getOriginalFilename();
			product.setAnh4(originalFilename);
			file = new File(rootFileUpload + originalFilename);
			if (file.getParentFile().exists() == false) {
				file.getParentFile().mkdirs();
			}
			file1 = new File(rootFileUpload1 + originalFilename);
			if (file1.getParentFile().exists() == false) {
				file1.getParentFile().mkdirs();
			}
			try {
				try (InputStream is = multipartFile3.getInputStream()) {
					try (OutputStream os = new FileOutputStream(file)) {
						byte[] b = new byte[10240];
						int size = 0;
						while ((size = is.read(b)) != -1) {
							os.write(b, 0, size);
						}
					}

					is.close();
				}
				try (InputStream is1 = multipartFile3.getInputStream()) {
					try (OutputStream os = new FileOutputStream(file1)) {
						byte[] b = new byte[10240];
						int size = 0;
						while ((size = is1.read(b)) != -1) {
							os.write(b, 0, size);
						}
					}
					is1.close();
				}
				// save product
				
				
			} catch (IOException e) {
				e.printStackTrace();
				return new ResponseEntity<MetaResponse>(new MetaResponse("00","","Update th??nh c??ng"), HttpStatus.OK);
			}
			}
			sanPhamRepo.save(product);
			return new ResponseEntity<MetaResponse>(new MetaResponse("00","","Update th??nh c??ng"), HttpStatus.OK);
		}
		
		return ResponseEntity.notFound().build();
	}
}
