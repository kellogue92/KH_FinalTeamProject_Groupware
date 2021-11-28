package com.kh.spring.survey.model.vo;


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
public class Essay {
	
	String essayNo;
	String sequence;
	String essayText;
	String surveyNo;
}
