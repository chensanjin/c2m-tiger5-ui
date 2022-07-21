<template>
  <div>
    <svg-icon icon-class="github" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'Test3DEnergy',
  data() {
    return {
      url: '/static/3D/#/energy-data-system'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
