<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="upPage">上一页</button>
    <button v-if="starOrendPage.leftnum > 1" @click="jumpPage(1)">1</button>
    <button v-if="starOrendPage.leftnum > parseInt(lianXpage / 2) - 1">···</button>

    <button :class="{ btnborder: pageNo === pages }" :disabled="pageNo === pages" v-for="(pages, index) in interval" :key="index" @click="jumpPage(pages)">{{ pages }}</button>

    <button v-if="starOrendPage.rightnum < totalpage - 1">···</button>
    <button v-if="starOrendPage.rightnum < totalpage" @click="jumpPage(totalpage)">{{ totalpage }}</button>
    <button :disabled="pageNo === totalpage" @click="nextPgae">下一页</button>

    <button style="margin-left: 30px">共 {{ tato }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'tato', 'lianXpage'],
  computed: {
    // 最大页数
    totalpage() {
      return Math.ceil(this.tato / this.pageSize)
    },
    // 连续页数
    starOrendPage() {
      const { pageNo, tato, lianXpage } = this
      let leftnum = pageNo - parseInt(lianXpage / 2)
      let rightnum = pageNo + parseInt(lianXpage / 2)
      let num = 0
      // 当区间大于总数时
      if (this.totalpage < lianXpage) {
        leftnum = 1
        rightnum = this.totalpage
        return { leftnum, rightnum }
      }
      // 当区间左端小于左边界时
      if (leftnum < 1) {
        num = 1 - leftnum
        leftnum = 1
        rightnum = rightnum + num
        return { leftnum, rightnum }
      }
      // 当区间右端大于总数时
      if (rightnum > this.totalpage) {
        num = rightnum - this.totalpage
        leftnum = leftnum - num
        rightnum = this.totalpage
        return { leftnum, rightnum }
      }

      return { leftnum, rightnum }
    },
    // 中间的连续区间
    interval() {
      let arr = []
      let { leftnum, rightnum } = this.starOrendPage
      for (let index = leftnum; index <= rightnum; index++) {
        arr.push(index)
      }
      return arr
    }
  },
  methods: {
    upPage() {
      let data = this.pageNo - 1
      this.$emit('newpage', data)
    },
    nextPgae() {
      let data = this.pageNo + 1
      this.$emit('newpage', data)
    },
    jumpPage(data) {
      this.$emit('newpage', data)
    }
  },

  mounted() {}
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  .btnborder {
    background-color: lightblue;
    color: #78627d !important;
  }
}
</style>
