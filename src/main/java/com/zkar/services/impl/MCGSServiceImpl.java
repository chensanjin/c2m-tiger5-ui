package com.zkar.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zkar.dao.MCGSMapper;
import com.zkar.module.MCGS;
import com.zkar.services.IMCGSService;

@Service("gpsServiceImpl")
public class MCGSServiceImpl implements IMCGSService{

	@Autowired
	private MCGSMapper MCGSMapper;

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public void transMCGS(String content) {
		JSONObject obj = JSON.parseObject(content);
        JSONArray answerArray = obj.getJSONArray("sensorDatas");
        List<MCGS> list = JSONObject.parseArray(answerArray.toJSONString(), MCGS.class);
        try {
        	MCGSMapper.save(list);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<MCGS> getEmqList() {
		return null;
	}

}