package com.fanren.Traffic.service;

import java.util.List;



import com.fanren.Traffic.pojo.taxiInfo;



public interface TaxiInfoService  {
	/**
	 * 跟据字典编码查询字典列表
	 * @param start_data
	 * @return
	 */
	 List<taxiInfo> getTaxiInfoByData(String start_data);
}
