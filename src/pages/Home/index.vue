<template>
  <div>
    <ThreeLinkage></ThreeLinkage>
    <ListBanner></ListBanner>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <LikeThings></LikeThings>
  </div>
</template>

<script>
import ListBanner from '@/pages/Home/ListBanner/ListBanner'
import TodayRecommend from './TodayRecommend/TodayRecommend.vue'
import Rank from './Rank/Rank.vue'
import LikeThings from './LikeThings/LikeThings.vue'

export default {
  name: 'Home',
  components: {
    ListBanner,
    TodayRecommend,
    Rank,
    LikeThings
  }
}
</script>

<style></style>
