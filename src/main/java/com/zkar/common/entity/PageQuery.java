package com.zkar.common.entity;

/**
 * @ClassName PageQuery
 * @Description 分页查询用POJO类
 * @date 2019/1/25
 * @author lufangjie
 * @Version 1.0
 **/
public class PageQuery<T> {
    private Integer pageIndex;
    private Integer pageSize;
    private T obj;

    public PageQuery() {
    }

    public PageQuery(int pageIndex, int pageSize) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
    }

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public T getObj() {
        return obj;
    }

    public void setObj(T obj) {
        this.obj = obj;
    }

    @Override
    public String toString() {
        return "当前页数：" + this.pageIndex + "，每页显示记录数：" + this.pageSize+",参数："+this.obj;
    }
}
