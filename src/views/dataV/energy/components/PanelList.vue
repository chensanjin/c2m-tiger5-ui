<template>
  <div class="panel-group-wrap">
    <div class="panel-item">
      <img src="@/assets/icons/icon-electric.png" alt="">
      <span class="label">上月用电量</span>
      <span class="value">15263<span class="company">KW/h</span></span>
    </div>
    <div class="panel-item">
      <img src="@/assets/icons/icon-electric.png" alt="">
      <span class="label">上月燃气用量</span>
      <span class="value">15263<span class="company">KW/h</span></span>
    </div>
    <div class="panel-item">
      <img src="@/assets/icons/icon-electric.png" alt="">
      <span class="label">上月蒸汽用量</span>
      <span class="value">15263<span class="company">KW/h</span></span>
    </div>
    <div class="panel-item">
      <img src="@/assets/icons/icon-electric.png" alt="">
      <span class="label">上月水用量</span>
      <span class="value">15263<span class="company">KW/h</span></span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.panel-group-wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 2.8rem 0 0 0;
  box-sizing: border-box;

  .panel-item {
    // flex: 0 0 41.6rem;
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    padding-left: 3.8rem;
    margin: 0 3.1rem;

    background-image: url("~@/assets/images/background/panel.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 9.6rem;
    color: #fff;
    box-sizing: border-box;
    .label {
      margin-left: 0.6rem;
      margin-right: 3rem;
    }
    .value {
      font-size: 3rem;
      color: #ff5420;
      .company {
        font-size: 1.4rem;
      }
    }
  }
  .panel-item:first-child {
    margin-left: 0;
  }
  .panel-item:last-child {
    margin-right: 0;
  }
}
</style>
