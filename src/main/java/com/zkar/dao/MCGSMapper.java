package com.zkar.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.zkar.module.MCGS;

@Mapper
public interface MCGSMapper {
	/**
	 * 多笔数据保存
	 * @param list tableName
	 * @return
	 */
	int save(@Param("list") List<MCGS> list );
}
