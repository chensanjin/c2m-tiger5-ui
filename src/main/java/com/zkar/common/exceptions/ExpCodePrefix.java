package com.zkar.common.exceptions;

/**
 * @Description:
 * @Author: Zhou Chenyu
 * @Date: 2018/6/15
 * @Version: V1.0
 */
public class ExpCodePrefix {

    /**
     * 基础服务
     */
    public static final String EUREKA_EXP_PREFIX = "01";
    public static final String ZUUL_EXP_PREFIX = "02";
    public static final String FEIGN_EXP_PREFIX = "03";

    /**
     * 基础依赖
     */
    public static final String COMMON_EXP_PREFIX = "11";
    public static final String REDIS_EXP_PREFIX = "12";

    /**
     * 代理服务
     */
    public static final String DATABASE_EXP_PREFIX = "21";
    public static final String ELASTIC_EXP_PREFIX = "22";
    /**
     *功能模块
     */
    public static final String BASE_EXP_PREFIX = "30";
    public static final String USER_EXP_PREFIX = "31";
    public static final String ROLE_EXP_PREFIX = "32";
    public static final String AUTH_EXP_PREFIX = "33";
    public static final String ATTACHMENT_EXP_PREFIX = "34";
    public static final String TREE_EXP_PREFIX = "35";
    public static final String AUTHORITY_EXP_PREFIX = "36";

    public static final String DATASOURCE_EXP_PREFIX = "41";

    public static final String GOVERN_EXP_PREFIX = "50";
    public static final String PUBLISH_EXP_PREFIX = "51";
    public static final String TASK_EXP_PREFIX = "52";

    public static final String LOG_SOURCE_EXP_PREFIX = "60";

    public static final String  ACTIVITY_SOURCE_EXP_PREFIX = "70";


}
