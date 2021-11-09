package com.kh.spring.notice.model.dao;

import java.util.ArrayList;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.spring.common.PageInfo;
import com.kh.spring.notice.model.vo.CompanyNotice;
import com.kh.spring.notice.model.vo.NoReply;

@Repository
public class NoticeDao {

	

	

	public static int selectListCount(SqlSessionTemplate sqlSession) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("noticeMapper.selectListCount");
	}

	public static ArrayList<CompanyNotice> selectNoticeList(SqlSessionTemplate sqlSession, PageInfo pi) {
		// TODO Auto-generated method stub
		int offset=(pi.getCurrentPage()-1)*pi.getBoardLimit();
		RowBounds rowBounds=new RowBounds(offset,pi.getBoardLimit());
		
		return (ArrayList)sqlSession.selectList("noticeMapper.selectNoticeList",null,rowBounds);
	}

	public static int insertNotice(SqlSessionTemplate sqlSession, CompanyNotice notice) {
		// TODO Auto-generated method stub
		return sqlSession.insert("noticeMapper.insertNotice",notice);
	}

	
	
	
	
	public int increaseCount(SqlSessionTemplate sqlSession, int nno) {
		// TODO Auto-generated method stub
		return sqlSession.update("noticeMapper.increaseCount",nno);
	}

	public CompanyNotice selectNotice(SqlSessionTemplate sqlSession, int nno) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("noticeMapper.selectNotice",nno);
	}

	public int insertReply(SqlSessionTemplate sqlSession, NoReply r) {
		// TODO Auto-generated method stub
		return sqlSession.insert("noticeMapper.insertReply",r);
	}

	public CompanyNotice selectNotify(SqlSessionTemplate sqlSession, int nno) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("noticeMapper.selectNotify",nno);
	}

	public int insertNotify(SqlSessionTemplate sqlSession, CompanyNotice notice) {
		// TODO Auto-generated method stub
		return sqlSession.insert("noticeMapper.insertNotify",notice);
	}

}
