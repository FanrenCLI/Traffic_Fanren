package com.fanren.Traffic.pojo;

import java.util.Set;

/**
 * 出租车实体
 * @author fanren
 *
 */
public class taxiInfo {

	private String id;
	private String lon;
	private String lat;
	private String speed;
	private String status;
	private String time;
	
	
	
	public void setTime(String time) {
		this.time = time;
	}
	public String getTime() {
		return time;
	}
	public void setSpeed(String speed) {
		this.speed = speed;
	}
	public String getSpeed() {
		return speed;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStatus() {
		return status;
	}
	
	public String getid() {
		return id;
	}
	public void setid(String id) {
		this.id=id;
	}
	public String getlon() {
		return lon;
	}
	public void setlon(String lon) {
		this.lon=lon;
	}
	public String getlat() {
		return lat;
	}
	public void setlat(String lat) {
		this.lat=lat;
	}
}
