<template>
  <div>
    <svg-icon icon-class="github" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'Test3DVideo',
  data() {
    return {
      url: '/static/3D/#/workshop'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
