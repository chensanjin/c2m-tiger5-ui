<template>
  <div>
    <svg-icon icon-class="github" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'Test3D',
  data() {
    return {
      url: '/static/3D/#/enviroment-data-system?num=1'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
