<template>
  <div>
    <ThreeLinkage></ThreeLinkage>
    <ListBanner></ListBanner>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <LikeThings></LikeThings>
    <Floor></Floor>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListBanner from '@/pages/Home/ListBanner/ListBanner'
import TodayRecommend from './TodayRecommend/TodayRecommend.vue'
import Rank from './Rank/Rank.vue'
import LikeThings from './LikeThings/LikeThings.vue'
import Floor from './Floor/Floor.vue'
import Brand from './brand/Brand.vue'

export default {
  name: 'Home',
  components: {
    ListBanner,
    TodayRecommend,
    Rank,
    LikeThings,
    Floor,
    Brand
  }
}
</script>

<style></style>
