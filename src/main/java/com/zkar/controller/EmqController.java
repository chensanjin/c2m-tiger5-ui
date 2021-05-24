package com.zkar.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.zkar.common.entity.Result;
import com.zkar.module.MCGS;
import com.zkar.services.IMCGSService;

/**
 * @Description:
 * emq 测试脚本
 */
@RestController
@RequestMapping(value = "/emq")
public class EmqController {
	@Autowired
	private IMCGSService iMCGSService;
	
	@Autowired
    public SimpMessagingTemplate simpMessagingTemplate;//websocket发送请求到前台

	/**
	 * @Date: 2020/3/11
	 * @param searchVo
	 */
	@RequestMapping(value = "/get_emq_list")
	public Result getErrorLogList(String time) {
		Result result = new Result();
		try {
			List<MCGS> list = iMCGSService.getEmqList();
			result.setData(list);
			return result;
		} catch (Exception e) {
			result.setSuccess(Boolean.FALSE);
			return result;
		}
	}
	
	/**
     * @Description:这个方法是接收客户端发送功公告的WebSocket请求，使用的是@MessageMapping
     * @SendTo 是将接收的消息发给 /topic/notice
     */
    @ResponseBody
    @MessageMapping("/change-notice")//客户端访问服务端的时候config中配置的服务端接收前缀也要加上 例：/app/change-notice
    @SendTo("/topic/notice")//config中配置的订阅前缀记得要加上
    public String greeting(String message) {
        System.out.println("服务端接收到消息：" + message);
        return message;
    }
    
    @ResponseBody
    @RequestMapping(value = "/test",method = RequestMethod.GET)//客户端访问服务端的时候config中配置的服务端接收前缀也要加上 例：/app/change-notice
    public void message(String message) {
        Map<String,String> map=new HashMap<>();
        map.put("message",message);
        //这个方法是websocket给前台发送即时数据的
        simpMessagingTemplate.convertAndSend("/topic/notice", JSONObject.toJSON(map));
    }
}