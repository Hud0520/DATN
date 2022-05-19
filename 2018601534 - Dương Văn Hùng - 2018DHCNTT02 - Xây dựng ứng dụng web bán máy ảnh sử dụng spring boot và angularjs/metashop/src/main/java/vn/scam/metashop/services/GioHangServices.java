package vn.scam.metashop.services;

import java.util.NoSuchElementException;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import vn.scam.metashop.common.Constants;
import vn.scam.metashop.entity.GioHang;
import vn.scam.metashop.entity.SanPham;
import vn.scam.metashop.repository.SanPhamRepo;

@Service
public class GioHangServices {
    @Autowired
	private SanPhamServices sanPhamServices;
    private SanPhamRepo sanPhamRepo;
	
	public GioHang layGioHang(HttpSession session) {
		if (session.getAttribute(Constants.GIO_HANG) == null) {
            GioHang gioHang = new GioHang();
			session.setAttribute(Constants.GIO_HANG, gioHang);
		}
		return (GioHang) session.getAttribute(Constants.GIO_HANG);
	}
	
	public void capNhat(HttpSession session, SanPham sanPham) {
		SanPham sp = sanPhamRepo.getById(sanPham.getId());
		if (sp == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		GioHang cart = layGioHang(session);
		cart.capNhat(sp);
	}
	
	public void xoaSanPham(HttpSession session, Integer sanPham) {
		try {
			GioHang cart= layGioHang(session);
			cart.xoaSanPham(sanPham);
		} catch (NoSuchElementException exc) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
	}
	public void xoaTatCa(HttpSession session){
		try {
			GioHang cart= layGioHang(session);
			cart.xoaTatCa();
		} catch (NoSuchElementException exc) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND);
		}
	}
	public void destroyCart(HttpSession session) {
		session.removeAttribute(Constants.GIO_HANG);
	}
}
