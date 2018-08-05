package com.fanren.Traffic.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.fanren.Traffic.pojo.taxiInfo;
import com.fanren.Traffic.service.TaxiInfoService;

/**
 * 轨迹显示功能
 * @author fanren
 *
 */

@Controller
@RequestMapping("static/info.do")
public class trackvisual {
	@Autowired
	private TaxiInfoService taxiInfoservice;
	
	@RequestMapping("")
	@ResponseBody
	public List<taxiInfo> taxiInformation(@RequestParam("start_data") String start_data) {
		List<taxiInfo> data=null;
		data=taxiInfoservice.getTaxiInfoByData(start_data);
		System.out.println("参数传递过来了");
		return data;
	}
}
