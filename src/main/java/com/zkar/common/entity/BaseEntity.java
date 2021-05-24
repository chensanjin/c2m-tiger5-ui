package com.zkar.common.entity;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.zkar.common.enums.BaseStateEnum;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * @ClassName: base
 * @Description: 基础类
 * @Author：lizhenzhen
 * @Date：2019-06-19 10:09
 * @Version：V1.0
 * @Modified By：lizhenzhen
 * @Modified Date: 2019-06-19 10:09
 * @Why:
 */
@ApiModel(description = "基础类")
public class BaseEntity implements Serializable, Cloneable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "ID")
    private String id;

    @ApiModelProperty(value = "创建时间")
    private Date createTime;

    @ApiModelProperty(value = "创建人ID")
    private String createUserId;

    @ApiModelProperty(value = "修改时间")
    private Date updateTime;

    @ApiModelProperty(value = "修改人ID")
    private String updateUserId;

    @ApiModelProperty(value = "删除标记，ACTIVE, DELETE")
    private BaseStateEnum delFlag;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getUpdateUserId() {
        return updateUserId;
    }

    public void setUpdateUserId(String updateUserId) {
        this.updateUserId = updateUserId;
    }

    public BaseStateEnum getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(BaseStateEnum delFlag) {
        this.delFlag = delFlag;
    }

    @Override
    public String toString() {
        return JSONUtil.toJsonStr(this);
    }

    public JSONObject toJson() {

        return JSONUtil.parseObj(this);
    }
}
