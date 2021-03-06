package vn.scam.metashop.client.controller;

import java.util.Date;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import com.nimbusds.oauth2.sdk.Response;
import com.nimbusds.oauth2.sdk.http.HTTPResponse;

import org.hibernate.mapping.MetaAttributable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import vn.scam.metashop.BaseController;
import vn.scam.metashop.common.Constants;
import vn.scam.metashop.dto.MetaResponse;
import vn.scam.metashop.entity.ChiTietDonHang;
import vn.scam.metashop.entity.DonHang;
import vn.scam.metashop.entity.GioHang;
import vn.scam.metashop.repository.ChiTietDonHangRepo;
import vn.scam.metashop.repository.DonHangRepo;

@Controller
@RequestMapping("/api/v1/donhang")
public class DonHangController extends BaseController {
    @Autowired DonHangRepo donHangRepo;
    @Autowired ChiTietDonHangRepo chiTietDonHangRepo;
    @PostMapping("/them")
    public ResponseEntity datHang(@RequestBody DonHang donhang){
        MetaResponse res = validate(donhang);
        if(Constants.SUCCESS_CODE.equals(res.getErrCode())){
        	donhang.setNgayTao(new Date());
            donhang.setTrangThai(Constants.Status.PENDING);
            DonHang save = donHangRepo.save(donhang);
            Integer maDonHang = save.getId();
            List<ChiTietDonHang> chitiet = donhang.getChiTiet();
            for(ChiTietDonHang a : chitiet) {
            	a.setMaDonHang(maDonHang);
            }
            chiTietDonHangRepo.saveAll(chitiet);

            return successResponse(res);
        }else{
            return errorResponse(res);
        }
    }
    private MetaResponse validate(DonHang dh){
        MetaResponse res = new MetaResponse();
        res.setResult(Constants.SUCCESS_CODE,Constants.SUCCESS_MSG);
        String errm = "";
        if("".equals(dh.getDiaChiNhan().trim())){
            res.setErrCode(Constants.FAIL_CODE);
            errm += "?????a ch??? nh???n kh??ng ???????c ????? tr???ng. </br>";
        }
        if("".equals(dh.getEmailNguoiNhan().trim())){
            res.setErrCode(Constants.FAIL_CODE);
            errm += "Email ng?????i nh???n kh??ng ???????c ????? tr???ng. </br>";
        }
        if("".equals(dh.getSdtNguoiNhan().trim())){
            res.setErrCode(Constants.FAIL_CODE);
            errm += "S??? ??i???n tho???i ng?????i nh???n kh??ng ???????c ????? tr???ng. </br>";
        }
        res.setErrMsg(errm);
        return res;
    }
    
}
