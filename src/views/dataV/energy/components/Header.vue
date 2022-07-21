<template>
  <div class="header-wrap">
    <div class="logo">
      <img src="@/assets/logo/logo-datav.png" alt="">
    </div>
    <div class="title">
      能耗看板
    </div>
    <div class="right-wrap">
      <span>2021.02.06</span>
      <span>温度26℃</span>
      <span>湿度75%</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.header-wrap {
  flex: 0 0 6.28rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 6.28rem;
  padding: 0 3rem;
  background-image: url("~@/assets/images/background/header-top.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.35);
  .logo {
    flex: 1;
    img {
      width: 8.2rem;
    }
  }

  .title {
    flex: 1;
    text-align: center;
    font-size: 2.6rem;
    color: #fff;
    letter-spacing: 2rem;
  }
  .right-wrap {
    flex: 1;
    color: #7c9cb5;
    font-size: 1.8rem;
    text-align: right;
    span:not(:last-child) {
      margin-right: 2rem;
    }
  }
}
</style>
