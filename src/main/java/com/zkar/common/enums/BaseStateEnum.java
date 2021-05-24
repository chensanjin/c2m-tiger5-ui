package com.zkar.common.enums;

public enum BaseStateEnum implements BaseEnum {
    /**
     * 有效
     */
    ACTIVE(0, "有效"),
    /**
     * 删除
     */
    DELETE(1, "删除");

    private int code;
    private String msg;

    BaseStateEnum(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    @Override
    public int getCode() {
        return code;
    }

    @Override
    public String getMsg() {
        return msg;
    }

    @Override
    public String toString() {
        return "BaseStateEnum{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                '}';
    }
}
