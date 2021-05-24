package com.zkar.common.entity;
import java.io.Serializable;

import com.zkar.common.exceptions.CommonException;
import com.zkar.common.exceptions.ExceptionEnum;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * @Description:
 * @Author: Zhou Chenyu
 * @Date: 2018/5/9
 * @Version: V1.0
 */
@ApiModel(description= "查询结果类")
public class Result<T> implements Serializable {

    @ApiModelProperty(value = "是否成功")
    private Boolean success;

    @ApiModelProperty(value = "错误代码")
    private String errorCode;

    @ApiModelProperty(value = "消息")
    private String message;

    @ApiModelProperty(value = "分页结果")
    private Page page;

    @ApiModelProperty(value = "结果数据集")
    private T data;

    public Result() {
        this.success = true;
    }

    public Result(Boolean success) {
        this.success = success;
    }

    public Result(T data) {
        this.success = true;
        this.data = data;
    }

    public Result(Boolean success, T data) {
        this.success = success;
        this.data = data;
    }

    public Result(T data, Page page) {
        this.success = true;
        this.page = page;
        this.data = data;
    }

    public Result(CommonException exception) {
        this.success = false;
        this.errorCode = exception.getCodeEnum().getCode();
        this.message = exception.getCodeEnum().getMessage();
    }

    public Result(ExceptionEnum exception) {
        this.success = false;
        this.errorCode = exception.getCode();
        this.message = exception.getMessage();
    }

    public Result(T data, CommonException exception) {
        this.success = false;
        this.data = data;
        this.errorCode = exception.getCodeEnum().getCode();
        this.message = exception.getCodeEnum().getMessage();
    }

    public Result(T data, Page page, CommonException exception) {
        this.success = false;
        this.data = data;
        this.page = page;
        this.errorCode = exception.getCodeEnum().getCode();
        this.message = exception.getCodeEnum().getMessage();
    }

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}
}
