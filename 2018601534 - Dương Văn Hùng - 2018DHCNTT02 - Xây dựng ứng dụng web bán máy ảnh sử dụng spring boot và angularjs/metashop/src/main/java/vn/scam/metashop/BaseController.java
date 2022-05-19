package vn.scam.metashop;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import vn.scam.metashop.common.Constants;
import vn.scam.metashop.dto.MetaResponse;

@Controller
public class BaseController {
	protected ResponseEntity<MetaResponse> successResponse(){
		MetaResponse res = new MetaResponse(Constants.SUCCESS_CODE, Constants.SUCCESS_MSG);
		return new ResponseEntity<MetaResponse>(res, HttpStatus.OK);
	}
	
	protected ResponseEntity<MetaResponse> successResponse(MetaResponse  message){
		return new ResponseEntity<MetaResponse>(message, HttpStatus.OK);
	}
	
	protected ResponseEntity<MetaResponse> errorResponse(Exception ex){
		ex.printStackTrace();
		MetaResponse res = new MetaResponse(Constants.FAIL_CODE, ex.getMessage());
		return new ResponseEntity<MetaResponse>(res, HttpStatus.OK);
	}
	
	protected ResponseEntity<MetaResponse> errorResponse(String  message){
		MetaResponse res = new MetaResponse(Constants.FAIL_CODE, message);
		return new ResponseEntity<MetaResponse>(res, HttpStatus.OK);
	}
	
	protected ResponseEntity<MetaResponse> errorResponse(MetaResponse  message){
		return new ResponseEntity<MetaResponse>(message, HttpStatus.OK);
	}
}
