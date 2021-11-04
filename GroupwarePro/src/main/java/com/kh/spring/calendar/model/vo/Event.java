package com.kh.spring.calendar.model.vo;

import java.sql.Date;
import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Event {
	private int evtNo; // 이벤트 번호
	private String name; // 이름
	private Date startDate; // 시작일 sql.Date
	private Date endDate; // 종료일 sql.Date
	private int calNo; // 캘린더 번호
	private int rezNo; // 예약 번호
}