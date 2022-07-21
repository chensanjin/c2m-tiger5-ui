<template>
  <div class="container">
    <Header />
    <div class="main-wrap">
      <panel-list />
      <production-line />
      <factory-panel />
    </div>
  </div>
</template>

<script>
// 适配flex
import '@/utils/flexible.js'
import Header from './components/Header.vue'
import PanelList from './components/PanelList.vue'
import ProductionLine from './components/ProductionLine.vue'
import FactoryPanel from './components/FactoryPanel.vue'
export default {
  name: 'DataV',
  components: {
    Header,
    PanelList,
    ProductionLine,
    FactoryPanel
  }
}
</script>

<style scoped lang="scss">
.main-wrap {
  flex: 1;
  width: 100%;
  padding: 0 3.9rem;
  box-sizing: border-box;
}
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 1366px;
    height: 100vh;
    // min-height: inherit;
    background-image: url("~@/assets/images/background/energy.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: auto;
}

</style>
