package com.zkar.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{

    //添加服务端点,接受客户端连接
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //webSocket添加跨域和SocketJs支持
        registry.addEndpoint("/socket").setAllowedOrigins("*").withSockJS();
    }


    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //客户端接受服务端消息的地址的前缀信息(前台被动接受消息 也就是前台的前缀要和他对应上)
        registry.enableSimpleBroker("/topic");
        //客户端发给服务端消息的地址前缀信息(前台发送消息 也就是前台的前缀要和他对应上)
        registry.setApplicationDestinationPrefixes("/app");
    }
}
