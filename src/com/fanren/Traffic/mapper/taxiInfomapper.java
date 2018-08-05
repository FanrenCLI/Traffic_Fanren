package com.fanren.Traffic.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.fanren.Traffic.pojo.taxiInfo;

/**
 * 跟据字典编码查询字典列表
 * @param start_data
 * @return
 */

public interface taxiInfomapper {
	List<taxiInfo> getTaxiInfoByData(@Param(value="start_data") String start_data);
}
