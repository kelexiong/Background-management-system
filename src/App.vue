<template>
  <div id="app">
    <HeardSeac></HeardSeac>

    <router-view></router-view>

    <FooterDetails v-show="$route.meta.show"></FooterDetails>
  </div>
</template>

<script>
import HeardSeac from './components/head/HeardSeac.vue'
import FooterDetails from './components/footer/FooterDetails.vue'

export default {
  name: 'App',
  components: {
    HeardSeac,
    FooterDetails
  },
  mounted() {
    // 给home小仓库数据
    this.$store.dispatch('getThreelist')
  }
}
</script>

<style>
#app {
}
</style>
