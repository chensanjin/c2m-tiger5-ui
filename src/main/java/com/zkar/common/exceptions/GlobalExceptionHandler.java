package com.zkar.common.exceptions;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.zkar.common.entity.Result;

import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;

/**
 * Controller层通用的异常处理，每个controller只要根据业务，抛出对应的异常或返回Result对象即可，不需要再针对异常做额外处理
 * @ClassName GlobalExceptionHandler
 * @Date 2019/4/25
 * @Author lufangjie
 * @Version 1.0
 **/
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Log logger = LogFactory.get();

    @ExceptionHandler(CommonException.class)
    public Result processCommonException(CommonException e) {
        return new Result<>(e);
    }

    @ExceptionHandler(RuntimeException.class)
    public Result processRuntimeException(HttpServletRequest request, RuntimeException e) {
        String url = request.getRequestURI();
        logger.error("请求{}时，运行异常：{}", url, e.getMessage());
        return new Result<>(new CommonException(ExceptionEnum.UNKNOW_ERROR));
    }

    @ExceptionHandler(Exception.class)
    public Result processException(HttpServletRequest request, Exception e) {
        String url = request.getRequestURI();
        logger.error("请求{}时，发生异常：{}", url, e.getMessage());
        return new Result<>(ExceptionEnum.UNKNOW_ERROR);
    }

}
