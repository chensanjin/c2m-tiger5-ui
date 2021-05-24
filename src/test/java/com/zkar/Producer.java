package com.zkar;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

public class Producer {
    private static final String broker = "tcp://mq.tlink.io:1883";
    private static final String content = "{\r\n" + 
    		"  \"sensorDatas\":\r\n" + 
    		"  [\r\n" + 
    		"    {\r\n" + 
    		"      \"flag\":\"A\",\r\n" + 
    		"      \"value\":12.0\r\n" + 
    		"    },\r\n" + 
    		"    {\r\n" + 
    		"      \"flag\":\"B\",\r\n" + 
    		"      \"value\":13.0\r\n" + 
    		"    },\r\n" + 
    		"    {\r\n" + 
    		"      \"flag\":\"C\",\r\n" + 
    		"      \"value\":14.0\r\n" + 
    		"    }\r\n" + 
    		"  ]\r\n" + 
    		"}";
    private static final int qos = 1;
    // 输入发布主题（设备序列号），和要发送的消息内容（粘贴上一步骤复制的JSON字符串），单击Publish，即向平台发布了一条上行数据
    private static final String topic = "ZKARWUXI00123456";
    private static final String clientId = "ZKARWUXI00123456";
    private static final String username = "17766335023";
    private static final String password = "630008456a@";

    public static void main(String[] args) throws MqttException, InterruptedException {
        MqttClient pubClient = getMqttClient();
        MqttMessage mqttMessage = getMqttMessage();
        pubClient.publish(topic, mqttMessage);
        System.out.println("Send message success.");
    }

    private static MqttMessage getMqttMessage() {
        MqttMessage mqttMessage = new MqttMessage(content.getBytes());
        mqttMessage.setQos(qos);
        return mqttMessage;
    }

    private static MqttClient getMqttClient() {
        try {
            MqttClient pubClient = new MqttClient(broker, clientId, new MemoryPersistence());
            MqttConnectOptions connectOptions = new MqttConnectOptions();
            connectOptions.setWill("lwt", "this is a will message".getBytes(), 1, false);
            connectOptions.setCleanSession(false);
            connectOptions.setUserName(username);
            connectOptions.setPassword(password.toCharArray());
            System.out.println("Connecting to broker: " + broker);
            pubClient.connect(connectOptions);
            return pubClient;
        } catch (MqttException e) {
            e.printStackTrace();
        }
        return null;
    }
}
