<template>
  <div class="swiper-container" ref="Cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carouse in list" :key="carouse.id">
        <img :src="carouse.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carsoule',
  props: ['list'],
  watch: {
    list: {
      immediate: true,
      handler(nextval, oldval) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.Cur, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: {
              delay: 2000, //1秒切换一次
              disableOnInteraction: false
            },
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',

              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar'
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-slide {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
