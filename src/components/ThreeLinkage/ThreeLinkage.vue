<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="deleteListbg">
        <h2 class="all" @mouseenter="showthreelist">{全部商品分类}</h2>
        <transition name="slow">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click.prevent="getlistelement">
              <div class="item" v-for="(list1, index) in getThreelist" :key="list1.categoryId" :class="{ listbackgorundcolor: Addcalssbcflg === index }">
                <h3 @mouseenter="Addcalssbc(index)">
                  <a href="" :data-category1Id="list1.categoryId" :data-categoryName="list1.categoryName">{{ list1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix" :style="{ display: Addcalssbcflg === index ? 'block' : 'none' }">
                  <div class="subitem">
                    <dl class="fore" v-for="list2 in list1.categoryChild" :key="list2.categoryId">
                      <dt>
                        <a href="" :data-category2Id="list2.categoryId" :data-categoryName="list2.categoryName">{{ list2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="list3 in list2.categoryChild" :key="list3.categoryId">
                          <a href="" :data-category3Id="list3.categoryId" :data-categoryName="list3.categoryName">{{ list3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ThreeLinkage',
  data() {
    return {
      Addcalssbcflg: -1,
      show: true
      // timer: null
    }
  },
  mounted() {
    // 给home小仓库数据
    this.$store.dispatch('getThreelist')
    console.log(this.$route)
    // debugger
    if (this.$route.path !== '/home' && this.$route.path !== '/') {
      // console.log(this.$route.path)
      this.show = false
    } else {
      this.show = true
      console.log(111)
    }
  },
  computed: {
    ...mapState({
      getThreelist: state => {
        return state.homestore.threelistdata
      }
    })
  },
  methods: {
    // Addcalssbc(index) {
    //   // // if (this.flg) {
    //   // //   this.flg = false
    //   // clearTimeout(this.timer)
    //   // this.timer = setTimeout(() => {
    //   //   this.Addcalssbcflg = index
    //   //   console.log(index)
    //   //   // this.flg = true
    //   // }, 100)
    //   // }
    // },

    Addcalssbc: throttle(function (index) {
      this.Addcalssbcflg = index
    }, 50),
    deleteListbg() {
      this.Addcalssbcflg = -1
      if (this.$route.path !== '/home' && this.$route.path !== '/') this.show = false
    },
    getlistelement(e) {
      let node = e.target.dataset
      let { categoryname, category1id, category2id, category3id } = node
      if (categoryname) {
        let path = { name: 'search', query: { categoryName: categoryname } }
        if (category1id) {
          path.query.category1Id = category1id
        } else if (category2id) {
          path.query.category2Id = category2id
        } else {
          path.query.category3Id = category3id
        }
        this.$router.push(path)
        // console.log(path)
      }
    },
    // 鼠标引入显示三级列表
    showthreelist() {
      this.show = true
    }
  },
  updated() {}
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .listbackgorundcolor {
          background-color: lightpink;
        }
      }
    }
    .slow-enter,
    .slow-leave-to {
      height: 0px;
    }
    .slow-enter-to,
    .slow-leave {
      height: 510px;
    }
    .slow-enter-active,
    .slow-leave-active {
      transition: all 0.2s linear;
    }
  }
}
</style>
