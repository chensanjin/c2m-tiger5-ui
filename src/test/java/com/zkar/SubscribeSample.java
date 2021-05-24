package com.zkar;

import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

import java.text.MessageFormat;

public class SubscribeSample {    //消息订阅的客户端例子

    public static void main(String[] args) {
        String broker = "tcp://192.168.1.128:1883";    //连接服务器
        String clientId = "3c9bbe6f-7f8d-4278-adfb-a214adb59062";       //客户端id
        String topic = "ceshi3333";
        String username = "admin";
        String password = "public";
        //Use the memory persistence
        MemoryPersistence persistence = new MemoryPersistence();     //持久化
        try {
            MqttClient sampleClient = new MqttClient(broker, clientId, persistence);
            MqttConnectOptions connOpts = new MqttConnectOptions();
            connOpts.setCleanSession(true);
            connOpts.setUserName(username);
            connOpts.setPassword(password.toCharArray());

            System.out.println("Connecting to broker:" + broker);
            sampleClient.connect(connOpts);
            System.out.println("Connected");
            System.out.println("Subscribe to topic:" + topic);
            sampleClient.subscribe(topic);

            sampleClient.setCallback(new MqttCallback() {    //设置回调实例
                public void messageArrived(String topic, MqttMessage message) throws Exception {
                    String theMsg = MessageFormat.format("{0} is arrived for topic {1}.", new String(message.getPayload()), topic);
                    System.out.println(theMsg);
                }

                public void deliveryComplete(IMqttDeliveryToken token) {
                }

                public void connectionLost(Throwable throwable) {
                	System.out.println(" ..connectionLost GG ..");
                }
            });
        } catch (MqttException me) {
            System.out.println("reason" + me.getReasonCode());
            System.out.println("msg" + me.getMessage());
            System.out.println("loc" + me.getLocalizedMessage());
            System.out.println("cause" + me.getCause());
            System.out.println("excep" + me);
            me.printStackTrace();
        }
    }
}
