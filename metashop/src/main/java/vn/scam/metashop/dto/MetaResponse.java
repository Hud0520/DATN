package vn.scam.metashop.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MetaResponse {
	private String errCode;
	private String errMsg;
	
	@JsonInclude(content = Include.NON_NULL)
	private Object data;
	
	
	public String getErrCode() {
		return errCode;
	}
	
	public void setErrCode(String errCode) {
		this.errCode = errCode;
	}
	
	public String getErrMsg() {
		return errMsg;
	}
	
	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}
	
	public Object getData() {
		return data;
	}
	
	public void setData(Object data) {
		this.data = data;
	}
	
	
	public MetaResponse(String errCode,String errMsg, Object data) {
		this.errCode = errCode;
		this.errMsg = errMsg;
		this.data = data;
	}
	
	public MetaResponse(){
		
	}
	
	public MetaResponse(String errCode,String errMsg) {
		this.errCode = errCode;
		this.errMsg = errMsg;
	}
	
	public void setResult(String errCode,String errMsg) {
		this.errCode = errCode;
		this.errMsg = errMsg;
	}
	
	public void setResult(String errCode,String errMsg, Object data) {
		this.errCode = errCode;
		this.errMsg = errMsg;
		this.data = data;
	}
	
	public String toJson() {
		ObjectMapper objectMapper = new ObjectMapper();
		String jsonResult = "CHUA KHOI TAO";
		try {
			jsonResult = objectMapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			jsonResult = e.getMessage();
		}catch (Exception e) {
			jsonResult = e.getMessage();
		}
		System.out.println("KQ TRA VE:" + jsonResult);
		return jsonResult;
	}
}
