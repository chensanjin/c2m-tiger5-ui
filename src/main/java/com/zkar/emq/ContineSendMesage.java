package com.zkar.emq;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

//这个类是模拟一下在线程中持续给前台更新即时数据
@Component
public class ContineSendMesage implements CommandLineRunner{

  //使用RestTemplate转发给前台
  @Autowired
  private RestTemplate restTemplate;
  //该方法为项目加载后自定加载  模拟在线程中持续给前台发数据
  @Override
  public void run(String... strings) throws Exception {
      Runnable runnable=new Runnable() {
          @Override
          public void run() {
              while (true){
                  Map<String,String> map=new HashMap<>();
                  Date date=new Date();
                  map.put("message","WebSocket发送当前时间为"+date.toString());
                  //发送到controller中test方法中
                  //restTemplate.getForObject("http://localhost:8080/emq/test?message={message}",Object.class,map);
                  try {
                      Thread.sleep(1000);
                  } catch (InterruptedException e) {
                      e.printStackTrace();
                  }
              }
          }
      };
      Thread thread=new Thread(runnable);
      thread.start();
  }
}