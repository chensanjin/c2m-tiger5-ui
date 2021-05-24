package com.zkar.emq;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallbackExtended;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.zkar.services.IMCGSService;

@Component
public class ClientMQTT {

    @Value("${mqtt.serverURI}")
    private String serverURI;

    @Value("${mqtt.clientID}")
    private String clientId;

    @Value("${mqtt.username}")
    private String username;

    @Value("${mqtt.password}")
    private String password;

    @Value("${mqtt.isReconnect}")
    private boolean isReconnect;

    @Value("${mqtt.keepAliveInterval}")
    private int keepAliveInterval;

    @Value("${mqtt.topic}")
    private String mqttTopic;

    private MqttClient client;
    private MqttConnectOptions options;

    @Autowired
    IMCGSService iMCGSService;
    
    //使用RestTemplate转发给前台
//    @Autowired
//    private RestTemplate restTemplate;
    
     @Autowired
     public SimpMessagingTemplate simpMessagingTemplate;//websocket发送请求到前台

    @PostConstruct
    private void start() {

        try {
            client = new MqttClient(serverURI, clientId, new MemoryPersistence());
            options = new MqttConnectOptions();
            options.setCleanSession(true);
            options = new MqttConnectOptions();
            // 设置是否清空session,这里如果设置为false表示服务器会保留客户端的连接记录，这里设置为true表示每次连接到服务器都以新的身份连接
            options.setCleanSession(true);
            // 设置连接的用户名
            options.setUserName(username);
            // 设置连接的密码
            options.setPassword(password.toCharArray());
            // 设置超时时间 单位为秒
            options.setConnectionTimeout(10);
            // 设置会话心跳时间 单位为秒
            options.setKeepAliveInterval(keepAliveInterval);
            // 设置自动重连
            options.setAutomaticReconnect(true);
            System.out.println("Connecting to broker:" + serverURI);
            client.connect(options);
            System.out.println("Connected");
            System.out.println("Subscribe to topic:" + mqttTopic);
            client.subscribe(mqttTopic);
            // 此处使用的MqttCallbackExtended类而不是MqttCallback，是因为如果emq服务出现异常导致客户端断开连接后，重连后会自动调用connectComplete方法
            client.setCallback(new MqttCallbackExtended() {
                @Override
                public void connectComplete(boolean reconnect, String serverURI) {
                    //System.out.println("连接完成...");
                    try {
                        // 重连后要自己重新订阅topic，这样emq服务发的消息才能重新接收到，不然的话，断开后客户端只是重新连接了服务，并没有自动订阅，导致接收不到消息
                        client.subscribe(mqttTopic);
                        //log.info("订阅成功");
                    }catch (Exception e){
                        //log.info("订阅出现异常:{}", e);
                    	e.printStackTrace();
                    }

                }

                @Override
                public void connectionLost(Throwable cause) {
                    // System.out.println("失去连接...."+cause.getMessage()+cause.getCause()+cause.getStackTrace());
                }
                
                @Override
                public void messageArrived(String topic, MqttMessage message) throws Exception {
                    // subscribe后得到的消息会执行到这里面
                    String content = new String(message.getPayload());
                    System.out.println("接收消息主题 : " + topic);
                    System.out.println("接收消息Qos : " + message.getQos());
                    System.out.println("接收消息内容 : " + content);
                    // 处理数据
                    try {
                    	simpMessagingTemplate.convertAndSend("/topic/notice", JSONObject.toJSON(content));
//                    	restTemplate.getForObject("http://localhost:8080/emq/test?message={content}",Object.class,content);
                    	iMCGSService.transMCGS(content);
                        System.out.println("convertAndSend is ok ..");
					} catch (Exception e) {
						e.printStackTrace();
						System.out.println("convertAndSend is failed ..");
					}
                }

                @Override
                public void deliveryComplete(IMqttDeliveryToken token) {
                    System.out.println("deliveryComplete....");
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PreDestroy
    public void end(){
        try {
            client.disconnect();
            client.close();
        } catch (MqttException e) {
        	System.out.println("断开连接失败....");
//            log.info("断开连接失败:{}", e);
        }
    }
}
