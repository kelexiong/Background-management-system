<template>
  <div>
    <ThreeLinkage></ThreeLinkage>
    <ListBanner></ListBanner>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <LikeThings></LikeThings>
    <Floor v-for="(getfloor, index) in getfloorlist" :key="getfloor.id" :floorListData="getfloor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListBanner from './ListBanner/ListBanner.vue'
import TodayRecommend from './TodayRecommend/TodayRecommend.vue'
import Rank from './Rank/Rank.vue'
import LikeThings from './LikeThings/LikeThings.vue'
import Floor from './Floor/Floor.vue'
import Brand from './brand/Brand.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListBanner,
    TodayRecommend,
    Rank,
    LikeThings,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      getfloorlist: state => state.homestore.getFloorlists
    })
  }
}
</script>

<style></style>
