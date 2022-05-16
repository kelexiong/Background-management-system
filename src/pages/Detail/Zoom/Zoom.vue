<template>
  <div class="spec-preview">
    <img :src="FDJimg.imgUrl" />
    <div class="event" @mousemove="showbig"></div>
    <div class="big">
      <img :src="FDJimg.imgUrl" ref="fdjimg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  data() {
    return {
      indeximg: 0
    }
  },
  props: ['setimgurl'],
  beforeMount() {
    // console.log(this.setimgurl)
  },
  computed: {
    FDJimg() {
      return this.setimgurl[this.indeximg] || {}
    }
  },
  methods: {
    showbig(event) {
      let mask = this.$refs.mask
      let left = event.offsetX - mask.offsetWidth / 2
      let top = event.offsetY - mask.offsetHeight / 2
      let bigimg = this.$refs.fdjimg
      // console.dir(bigimg)
      if (left < 0) left = 0
      if (top < 0) top = 0
      if (left > mask.offsetWidth) left = mask.offsetWidth
      if (top > mask.offsetHeight) top = mask.offsetHeight
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      bigimg.style.top = -2 * top + 'px'
      bigimg.style.left = -2 * left + 'px'
    }
  },
  mounted() {
    this.$bus.$on('getSamllImgs', data => (data == this.indeximg ? (this.indeximg = this.indeximg) : (this.indeximg = data)))
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
