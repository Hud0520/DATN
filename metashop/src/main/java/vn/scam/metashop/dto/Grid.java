package vn.scam.metashop.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Grid<T> {
	private List<T> result;
	private Long total;
	private String errCode;
	private String errDessc;
}
