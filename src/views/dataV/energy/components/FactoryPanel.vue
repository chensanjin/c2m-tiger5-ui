<template>
  <div class="factory-panel-wrap">
    <div class="left-wrap">
      <div class="line" />
      <div class="title-wrap">
        <div class="title">工厂区域用电</div>
        <div>
          <span>253658 kw/h</span>
          <span class="price">￥ 253658</span>
        </div>
      </div>
    </div>
    <div class="right-wrap">
      <div class="production-center-item">
        <div class="icon">
          <img src="@/assets/icons/icon-light.png" alt="">
        </div>
        <div class="info-wrap">
          <span class="label">制造中心</span>
          <span>125366 kw/h</span>
          <span class="price">￥ 25639</span>
        </div>
      </div>
      <div class="production-center-item">
        <div class="icon">
          <img src="@/assets/icons/icon-light.png" alt="">
        </div>
        <div class="info-wrap">
          <span class="label">制造中心</span>
          <span>125366 kw/h</span>
          <span class="price">￥ 25639</span>
        </div>
      </div>
      <div class="production-center-item">
        <div class="icon">
          <img src="@/assets/icons/icon-light.png" alt="">
        </div>
        <div class="info-wrap">
          <span class="label">制造中心</span>
          <span>125366 kw/h</span>
          <span class="price">￥ 25639</span>
        </div>
      </div>
      <div class="production-center-item">
        <div class="icon">
          <img src="@/assets/icons/icon-light.png" alt="">
        </div>
        <div class="info-wrap">
          <span class="label">制造中心</span>
          <span>125366 kw/h</span>
          <span class="price">￥ 25639</span>
        </div>
      </div>
      <div class="production-center-item">
        <div class="icon">
          <img src="@/assets/icons/icon-light.png" alt="">
        </div>
        <div class="info-wrap">
          <span class="label">制造中心</span>
          <span>125366 kw/h</span>
          <span class="price">￥ 25639</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.factory-panel-wrap {
  display: flex;
  margin-top: 2.3rem;
  padding-bottom: 3.5rem;
  .left-wrap {
    display: flex;
    align-items: center;
    .line {
      display: inline-block;
      width: 0.5rem;
      height: 6.6rem;
      background: #ff6030;
    }
    .title-wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #fff;
      margin-left: 4.1rem;
      height: 100%;
      .title {
        font-size: 2.8rem;
        font-weight: bold;
      }
    }
  }
  .right-wrap {
      flex: 1;
    display: flex;
    padding-left: 8.6rem;
    .production-center-item {
      flex: 1;
      display: flex;
      color: #fff;
      .icon {
          flex: 0
      }
      & > .info-wrap {
        display: flex;
        flex-direction: column;
        margin-left: 1.8rem;
        font-size: 1.6rem;
        .label {
          color: #7c9cb5;
          margin-bottom: 0.8rem;
        }
        .price {
          color: #ff6030;
        }
      }
    }
  }
}
</style>
