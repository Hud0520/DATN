package vn.scam.metashop.client.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.nimbusds.oauth2.sdk.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import vn.scam.metashop.BaseController;
import vn.scam.metashop.common.Constants;
import vn.scam.metashop.dto.MetaResponse;
import vn.scam.metashop.entity.GioHang;
import vn.scam.metashop.entity.SanPham;
import vn.scam.metashop.services.GioHangServices;

@Controller
@RequestMapping("/api/v1/giohang")
public class GioHangController extends BaseController {
    @Autowired private GioHangServices gioHangServices;

	@GetMapping("/")
	public ResponseEntity getCart(HttpSession session){
		GioHang giohang = gioHangServices.layGioHang(session);
        MetaResponse res = new MetaResponse();
        res.setResult(Constants.SUCCESS_CODE, Constants.SUCCESS_MSG, giohang);
		return successResponse(res);
	}
	@PostMapping("/capnhat")
	public ResponseEntity capNhat(HttpSession session, List<SanPham> sanPhams){
        MetaResponse res = new MetaResponse();
        try{
            for (SanPham sanPham : sanPhams) {
                gioHangServices.capNhat(session, sanPham);
            }
            return successResponse();
        }catch(Exception ex){
            ex.printStackTrace();
            return errorResponse(ex);
        }
		
	}
	@PostMapping("/xoa")
	public ResponseEntity removeFromCart(HttpSession session, @RequestParam("id") Integer id){
		
        try {
            gioHangServices.xoaSanPham(session, id);
            return successResponse();
        } catch (Exception ex) {
            //TODO: handle exception
            ex.printStackTrace();
            return errorResponse(ex);
        }
	}
}
