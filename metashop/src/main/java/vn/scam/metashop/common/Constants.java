package vn.scam.metashop.common;

public class Constants {
	public static final String SESSION_CURRENT_USER = "session_current_user";
	
	public static final String SUCCESS_CODE = "00";
	public static final String SERVICE_SUCCESS_CODE = "0";
	public static final String SUCCESS_MSG = "Success";
	
	public static final String FORMAT_DATE_WEB = "dd/MM/yyyy";
	public static final String FORMAT_DATE_DB = "yyyyMMdd";
	public static final String FORMAT_DATETIME_WEB = "dd/MM/yyyy HH:mm";
	public static final String FORMAT_DATETIME_WEB_HHMMSS = "dd/MM/yyyy HH:mm:ss";
	public static final String FORMAT_DATETIME_DB = "yyyyMMddHHmm";
	public static final String FORMAT_DATETIME_DB_FULL = "yyyyMMddHHmmss";
	public static final String FORMAT_DATE_SEPARATOR = "/";
	public static final String FORMAT_TIMEPICKER = "HH:mm";
	public static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
	
	public static final String FAIL_CODE = "44";
	public static final String FAIL_MSG = "Fail";

	public static final String GIO_HANG = "gio_hang"; 
	
	public class Exception {
		public static final String ERR_SESSION_TIMEOUT = "ERR_SESSION_TIMEOUT";
		public static final String ERR_SESSION_TIMEOUT_MSG = "Hết phiên làm việc, vui lòng đăng nhập lại !";
		
		public static final String ERR_SYSTEM = "ERR_SYSTEM";
		public static final String ERR_SYSTEM_MSG = "Lỗi hệ thống !";
	}

	public class Status{
		public static final String PENDING="0";//"Đang chờ xử lý";
		public static final String ACCEPTED="1";//"Đơn hàng được chấp nhận";
		public static final String CANCELED="4";//"Đơn hàng bị hủy";
		public static final String DENIED ="5";// "Đơn hàng bị từ chối";
		public static final String DELIVERING="2";//"Đơn hàng đang được giao";
		public static final String DELIVERED="3";//"Giao hàng thành công";
		
	}
}
