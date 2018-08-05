package com.fanren.Traffic.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.fanren.Traffic.mapper.taxiInfomapper;
import com.fanren.Traffic.pojo.taxiInfo;
import com.fanren.Traffic.service.TaxiInfoService;


@Service
public class TaxiInfoServiceImpl implements TaxiInfoService {
	
	@Autowired
	private taxiInfomapper taxiInfomapper;
	
	
	@Override	
	public List<taxiInfo> getTaxiInfoByData( String start_data){
		return taxiInfomapper.getTaxiInfoByData(start_data);
	}
}
