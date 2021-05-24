package com.zkar.common.entity;

import java.io.Serializable;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * @Description:
 * @Author: Zhou Chenyu
 * @Date: 2018/6/15
 * @Version: V1.0
 */
@ApiModel(description= "分页类")
public class Page implements Serializable {

    /** 默认每页显示记录数 */
    private static final int DEFAULT_PAGE_SIZE = 10;

    @ApiModelProperty(value = "当前页数，默认第一页")
    protected int pageIndex ;

    @ApiModelProperty(value = "每页记录数")
    protected int pageSize;

    @ApiModelProperty(value = "总记录数")
    protected long totalCount;

    @ApiModelProperty(value = "总页数")
    protected int pageCount;

    public Page() {
        this.pageSize = DEFAULT_PAGE_SIZE;
        this.pageIndex = 1;
        this.pageCount = 1;
        this.totalCount = 0;
    }

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
        this.setPageCount();
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
        this.setPageCount();
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
        this.setPageCount();
    }

    public int getPageCount() {
        return pageCount;
    }

    private void setPageCount() {
        if (this.totalCount == 0) {
            return;
        }
        if (this.pageSize == 0) {
            this.pageSize = 10;
        }
        this.pageCount = (int) Math.ceil(this.totalCount * 1.0 / this.pageSize);
        if (this.pageCount == 0) {
            this.pageCount = 1;
        }
        if (this.pageCount < this.pageIndex) {
            this.pageIndex = 1;
        }
    }

    @Override
    public String toString(){
        StringBuilder builder = new StringBuilder().
                append("Page { pageIndex=").append(pageIndex).
                append(", pageSize=").append(pageSize)
                .append(", totalCount=").append(totalCount)
                .append(", pageCount=").append(pageCount)
                .append(" }");
        return builder.toString();
    }
    
    public static Page getPage(PageInfo pageInfo){
        Page page = new Page();
        page.setPageIndex(pageInfo.getPageNum());
        page.setPageSize(pageInfo.getPageSize());
        page.setTotalCount(pageInfo.getTotal());
        return page;
    }
}
