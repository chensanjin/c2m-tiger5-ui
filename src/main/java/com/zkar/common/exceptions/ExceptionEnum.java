package com.zkar.common.exceptions;

import static com.zkar.common.exceptions.ExpCodePrefix.*;

import java.io.Serializable;

/**
 * @Description:
 * @Author: Zhou Chenyu
 * @Date: 2018/6/15
 * @Version: V1.0
 */
public enum ExceptionEnum implements Serializable {

    /** 自定义异常消息 */
    DYNAMIC_ERROR("500", ""),
    /**
     * 通用异常
     */
    UNKNOW_ERROR(COMMON_EXP_PREFIX + "000", "未知异常"),
    ERROR_404(COMMON_EXP_PREFIX + "001", "服务404"),
    PARAM_NULL(COMMON_EXP_PREFIX + "002", "参数为空"),
    NO_REPEAT(COMMON_EXP_PREFIX + "003", "请勿重复提交"),
    TOKEN_NULL(COMMON_EXP_PREFIX + "004", "TOKEN不存在"),
    TOKEN_EXPIRED(COMMON_EXP_PREFIX + "005", "TOKEN超时"),
    TOKEN_ERROR(COMMON_EXP_PREFIX + "006", "TOKEN错误"),
    HTTP_REQ_METHOD_ERROR(COMMON_EXP_PREFIX + "007", "HTTP请求方法不正确"),
    JSON_ERROR(COMMON_EXP_PREFIX + "008", "JSON解析异常"),
    NO_PERMISSION(COMMON_EXP_PREFIX + "009", "当前用户无此操作权限"),
    SAVE_FAIL(COMMON_EXP_PREFIX + "010", "保存失败"),
    CREATE_FAIL(COMMON_EXP_PREFIX + "011", "新增失败"),
    UPDATE_FAIL(COMMON_EXP_PREFIX + "012", "更新失败"),
    DELETE_FAIL(COMMON_EXP_PREFIX + "013", "删除失败"),
    QUERY_FAIL(COMMON_EXP_PREFIX + "014", "查询失败"),
    API_INVALID(COMMON_EXP_PREFIX + "015", "接口无效"),
    CLASS_CONVERT_ERROR(COMMON_EXP_PREFIX + "020", "类型转换错误"),
    NEW_INSTANCE_ERROR(COMMON_EXP_PREFIX + "021", "对象实例化失败"),
    CLASS_NOT_FOUND(COMMON_EXP_PREFIX + "022", "未找到类"),
    SERVICE_INVOKE_ERROR(COMMON_EXP_PREFIX + "023", "远程服务调用失败"),
    PARAMS_ERROR(COMMON_EXP_PREFIX + "024","参数格式错误"),

    QUARTZ_SCHEDULE_CREATE_FAIL(COMMON_EXP_PREFIX + "801", "定时任务创建失败"),
    QUARTZ_SCHEDULE_REMOVE_FAIL(COMMON_EXP_PREFIX + "802", "定时任务移除失败"),
    QUARTZ_SCHEDULE_TRIGGER_FAIL(COMMON_EXP_PREFIX + "803", "定时任务触发失败"),
    QUARTZ_SCHEDULE_PAUSE_FAIL(COMMON_EXP_PREFIX + "804", "定时任务暂停失败"),
    QUARTZ_SCHEDULE_RESUME_FAIL(COMMON_EXP_PREFIX + "805", "定时任务恢复失败"),
    QUARTZ_SCHEDULE_ID_NULL(COMMON_EXP_PREFIX + "806", "定时任务未设置ID"),
    QUARTZ_SCHEDULE_GROUP_NULL(COMMON_EXP_PREFIX + "807", "定时任务未设置分组"),
    QUARTZ_SCHEDULE_CRON_NULL(COMMON_EXP_PREFIX + "808", "定时任务未设置定时规则"),

    URL_ENCODE_ERROR(COMMON_EXP_PREFIX + "901", "URL编码失败"),
    FILE_NOT_FOUND(COMMON_EXP_PREFIX + "902", "未找到文件"),
    FILE_TYPE_ERROR(COMMON_EXP_PREFIX + "903", "文件类型错误"),
    EXCEL_READ_FAIL(COMMON_EXP_PREFIX + "904", "Excel文件读取失败"),
    EXCEL_FIRST_ROW_EMPTY(COMMON_EXP_PREFIX + "905", "Excel文件第一行为空"),

    /**
     * Feign模块异常
     */
    HYSTRIX(FEIGN_EXP_PREFIX + "000", "服务暂时失效，请重试"),

    /**
     * Redis模块异常
     */
    REDIS_GET_ERROR(REDIS_EXP_PREFIX + "000", "Redis读取失败"),
    REDIS_SET_ERROR(REDIS_EXP_PREFIX + "001", "Redis存储失败"),
    REDIS_REMOVE_ERROR(REDIS_EXP_PREFIX + "002", "Redis删除失败"),
    REDIS_EXISTS_ERROR(REDIS_EXP_PREFIX + "003", "Redis校验失败"),

    /**
     * Elastic模块异常
     */
    ELASTIC_CREATE_FAIL(ELASTIC_EXP_PREFIX + "001", "Elastic新增失败"),
    ELASTIC_UPDATE_FAIL(ELASTIC_EXP_PREFIX + "002", "Elastic更新失败"),
    ELASTIC_DELETE_FAIL(ELASTIC_EXP_PREFIX + "003", "Elastic删除失败"),
    ELASTIC_QUERY_FAIL(ELASTIC_EXP_PREFIX + "004", "Elastic查询失败"),
    ELASTIC_OPERATE_FAIL(ELASTIC_EXP_PREFIX + "005", "Elastic操作失败"),
    ELASTIC_NOT_JSON(ELASTIC_EXP_PREFIX + "006", "Elastic存储对象类型错误"),
    ELASTIC_ID_NULL(ELASTIC_EXP_PREFIX + "007", "Elastic存储对象ID为空"),
    ELASTIC_NOT_SUPPORT_OPERATE(ELASTIC_EXP_PREFIX + "008", "不支持的操作"),

    /**
     * 动态数据源模块异常
     */
    DYNAMIC_DATASOURCE_NOT_FOUND(DATABASE_EXP_PREFIX + "001", "未找到动态数据源"),
    DYNAMIC_QUERY_FAIL(DATABASE_EXP_PREFIX + "002", "数据查询失败"),
    NOT_DB_SOURCE(DATABASE_EXP_PREFIX + "003", "此数据源不是数据库"),
    QUERY_DB_FAIL(DATABASE_EXP_PREFIX + "004", "查询数据库失败"),
    API_PROXY_FAIL(DATABASE_EXP_PREFIX + "005", "请求代理失败"),
    HOST_NULL(DATABASE_EXP_PREFIX + "006", "未定义服务器地址"),
    PORT_NULL(DATABASE_EXP_PREFIX + "007", "未定义端口"),
    USERNAME_NULL(DATABASE_EXP_PREFIX + "008", "未定义用户名"),
    TYPE_NULL(DATABASE_EXP_PREFIX + "009", "未定义数据库类型"),
    DB_NAME_NULL(DATABASE_EXP_PREFIX + "010", "未定义数据库名称"),

    /**
     * User模块异常
     */
    ACCOUNT_NULL(USER_EXP_PREFIX + "000", "用户名为空"),
    USER_NULL(USER_EXP_PREFIX + "001", "用户不存在"),
    USER_INVALID(USER_EXP_PREFIX + "002", "用户失效"),
    PASSWORD_NULL(USER_EXP_PREFIX + "011", "密码为空"),
    PASSWORD_ERROR(USER_EXP_PREFIX + "012", "密码错误"),
    PASSWORD_CHANGE_FAIL(USER_EXP_PREFIX + "013", "密码修改失败"),
    PASSWORD_DIFFERENT(USER_EXP_PREFIX + "014", "两次输入的密码不一致"),

    /**
     * Attachment模块异常
     */
    UPLOAD_FAIL(ATTACHMENT_EXP_PREFIX + "000", "文件上传失败"),

    /**
     * Authority模块异常
     */
    AUTH_ID_UNDEFINED(AUTHORITY_EXP_PREFIX + "000", "未定义权限ID"),
    AUTH_OWNER_UNDEFINED(AUTHORITY_EXP_PREFIX + "001", "未定义权限所有者"),
    AUTH_ITEM_UNDEFINED(AUTHORITY_EXP_PREFIX + "002", "未定义权限对象"),
    AUTH_TYPE_UNDEFINED(AUTHORITY_EXP_PREFIX + "003", "未定义权限类型"),

    /**
     * CommTreeNode模块异常
     */
    TREE_CHILDREN_EXIST(TREE_EXP_PREFIX + "000", "无法删除有子节点的节点"),
    TREE_QUERY_TYPE_NULL(TREE_EXP_PREFIX + "001", "未传入查询树信息的类型参数"),
    TREE_PARENT_NULL(TREE_EXP_PREFIX + "002", "未定义父节点"),
    TREE_TYPE_ERROR(GOVERN_EXP_PREFIX + "301", "树类型错误"),
    TREE_NODE_UNDEFINED(GOVERN_EXP_PREFIX + "302", "未声明挂载的树节点"),

    /**
     * Transport模块异常
     */
    TRANSPORT_TASK_NOT_FOUND(TASK_EXP_PREFIX + "000", "采集任务不存在"),

    /**
     * Govern模块异常
     */
    GOVERN_DATABASE_QUERY_FAIL(GOVERN_EXP_PREFIX + "000", "数据表查询失败"),
    GOVERN_DATABASE_UNDEFINED(GOVERN_EXP_PREFIX + "001", "数据库的元数据信息不存在"),
    GOVERN_DATABASE_HAS_TABLE(GOVERN_EXP_PREFIX + "002", "数据库中存在表，禁止删除"),
    GOVERN_TABLE_NAME_UNDEFINED(GOVERN_EXP_PREFIX + "101", "未声明数据表名"),
    GOVERN_TABLE_HAS_NO_COLUMN(GOVERN_EXP_PREFIX + "102", "未声明数据表的列信息"),
    GOVERN_TABLE_QUERY_FAIL(GOVERN_EXP_PREFIX + "103", "数据表查询失败"),
    GOVERN_TABLE_UNDEFINED(GOVERN_EXP_PREFIX + "104", "数据表的元数据信息不存在"),
    GOVERN_TABLE_HAS_DATA(GOVERN_EXP_PREFIX + "105", "数据表中存在数据，禁止删除"),
    GOVERN_TABLE_HAS_NO_TREE_NODE(GOVERN_EXP_PREFIX + "106", "未声明数据表所属的树节点"),
    GOVERN_COLUMN_NAME_UNDEFINED(GOVERN_EXP_PREFIX + "201", "未声明列名称"),
    GOVERN_COLUMN_TYPE_UNDEFINED(GOVERN_EXP_PREFIX + "202", "未声明列类型"),
    GOVERN_COLUMN_BELONG_TO_NO_TABLE(GOVERN_EXP_PREFIX + "203", "未声明列所属的数据表"),
    GOVERN_COLUMN_QUERY_FAIL(GOVERN_EXP_PREFIX + "204", "数据表字段查询失败"),

    /**
     * Publish模块异常
     */
    PUBLISH_SERVICE_INVALID(PUBLISH_EXP_PREFIX + "000", "服务不存在"),
    PUBLISH_TYPE_UNDEFINED(PUBLISH_EXP_PREFIX + "001", "未定义服务类型"),
    PUBLISH_TREENODE_UNDEFINED(PUBLISH_EXP_PREFIX + "002", "未定义服务所处树节点"),
    PUBLISH_SERVICE_NO_AUTHORITY(PUBLISH_EXP_PREFIX + "003", "未获得服务的访问授权"),
    PUBLISH_SERVICE_INACTIVE(PUBLISH_EXP_PREFIX + "004", "服务未启用"),

    /**
     * DataSource模块异常
     */
    DATASOURCE_NOT_FOUND(DATASOURCE_EXP_PREFIX + "000", "未找到数据源"),
    DATASOURCE_INFO_NOT_FOUND(DATASOURCE_EXP_PREFIX + "001", "未找到数据源详情"),
    DATASOURCE_SERVICE_NOT_FOUND(DATASOURCE_EXP_PREFIX + "002", "未找到数据源服务"),

    /**
     * Log模块异常
     */
    LOG_SOURCE_NOT_EXIST(LOG_SOURCE_EXP_PREFIX + "000", "未找到日志源"),
    UNKNOW_HOST(LOG_SOURCE_EXP_PREFIX + "001", "未知的服务器地址"),
    /**
     * ActivityPatication模块异常
     */
    ROLE_NOT_EXIST(ACTIVITY_SOURCE_EXP_PREFIX + "000", "角色不存在"),
    ROLE_NO_PERMISSION(ACTIVITY_SOURCE_EXP_PREFIX + "001", "角色权限不足")

    ;

    private String code;
    private String message;

    ExceptionEnum() {
    }

    ExceptionEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }


    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
