package com.zkar;

import javax.annotation.PreDestroy;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallbackExtended;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

public class ClientMQTT {

    private static String serverURI = "tcp://192.168.1.128:1883";
    private static String clientId = "ZKARWUXI20209001";
    private static String username = "admin";
    private static String password = "public";
    private static boolean isReconnect = true;
    private static int keepAliveInterval=20;
    private static String mqttTopic = "ZKARWUXI20209001";
    private static MqttClient client;
    private static MqttConnectOptions options;

    private static void start() {

        try {
            client = new MqttClient(serverURI, clientId, new MemoryPersistence());
            options = new MqttConnectOptions();
            options.setCleanSession(true);
            options = new MqttConnectOptions();
            // 设置是否清空session,这里如果设置为false表示服务器会保留客户端的连接记录，这里设置为true表示每次连接到服务器都以新的身份连接
            options.setCleanSession(true);
            // 设置连接的用户名
            options.setUserName(username);
            options.setMqttVersion(MqttConnectOptions.MQTT_VERSION_3_1_1);
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
                    System.out.println("连接完成...");
                    try {
                        // 重连后要自己重新订阅topic，这样emq服务发的消息才能重新接收到，不然的话，断开后客户端只是重新连接了服务，并没有自动订阅，导致接收不到消息
                        client.subscribe(mqttTopic);
                        System.out.println("订阅成功");
                    }catch (Exception e){
                        System.out.println("订阅出现异常:{}");
                    }
                }

                @Override
                public void connectionLost(Throwable cause) {
                    System.out.println("失去连接....");
                }

                @Override
                public void messageArrived(String topic, MqttMessage message) throws Exception {
                    // subscribe后得到的消息会执行到这里面
                    String content = new String(message.getPayload());
                    System.out.println("接收消息主题 : " + topic);
                    System.out.println("接收消息Qos : " + message.getQos());
                    System.out.println("接收消息内容 : " + content);
                    // 处理数据
                    // messageConsumeService.dealEmqContent(content);
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
            System.out.println("断开连接失败:{}");
        }
    }
    
    public static void main(String[] args) {
    	start();
	}
}
