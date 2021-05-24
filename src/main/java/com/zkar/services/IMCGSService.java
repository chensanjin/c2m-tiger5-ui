package com.zkar.services;

import java.util.List;

import com.zkar.module.MCGS;

public interface IMCGSService {

	void transMCGS(String content);

	List<MCGS> getEmqList();
}
