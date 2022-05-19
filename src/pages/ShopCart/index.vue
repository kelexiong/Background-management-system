<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartlists in cartInfoList.cartInfoList" :key="cartlists.skuId">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartlists.isChecked === 1"
              @change="changeCheckbox(cartlists.skuId, $event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartlists.imgUrl" />
            <div class="item-msg">{{ cartlists.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartlists.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeCartNum('minus', cartlists.skuNum, cartlists.skuId)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cartlists.skuNum"
              minnum="1"
              class="itxt"
              @change="changeCartNum('ipt', cartlists.skuNum, cartlists.skuId, $event.target.value * 1)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeCartNum('add', cartlists.skuNum, cartlists.skuId)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartlists.skuPrice * cartlists.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleteGoods(cartlists.skuId)" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllcheck" id="allcheckId" @click="changeAllCheckbox($event.target.checked)" />
        <label for="allcheckId"><span>全选</span></label>
      </div>
      <div class="option">
        <a @click="deletecheckall">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ allNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  data() {
    return {
      flg: true
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    getDate() {
      this.$store.dispatch('getshopcartlist')
    },
    changeCartNum(who, val, skuId, initval) {
      if (this.flg) {
        this.flg = false
        switch (who) {
          case 'add':
            val = '1'
            break
          case 'minus':
            val = val > 1 ? '-1' : '0'
            break
          case 'ipt':
            val = isNaN(initval) || parseInt(initval) < 1 ? '0' : parseInt(initval) - val

            break
        }
        try {
          this.$store.dispatch('changeshoppingcart', { skuId, skuNum: val })
          setTimeout(() => {
            this.getDate()
            this.flg = true
          }, 800)
        } catch {
          this.flg = true
          alert(error.message)
        }
      }
    },
    changeCheckbox(skuId, isChecked) {
      if (isChecked) isChecked = '1'
      else isChecked = '0'
      if (this.flg) {
        this.flg = false
        try {
          this.$store.dispatch('changescheckcart', { skuId, isChecked })
        } catch (error) {
          this.flg = true
        }
      }
      setTimeout(() => {
        this.getDate()
        this.flg = true
      }, 500)
    },
    // 全选
    async changeAllCheckbox(isChecked) {
      if (isChecked) isChecked = '1'
      else isChecked = '0'
      if (this.flg) {
        this.flg = false
        try {
          await this.$store.dispatch('changesallcheckcart', isChecked)
          setTimeout(() => {
            this.getDate()
            this.flg = true
          }, 700)
        } catch {
          this.flg = true
        }
      }
    },
    // 删除
    async deleteGoods(skuId) {
      console.log(skuId)
      await this.$store.dispatch('deletegoodscart', skuId)
      setTimeout(() => {
        this.getDate()
      }, 300)
    },
    // 删除选中
    async deletecheckall() {
      try {
        await this.$store.dispatch('deleteCheckAll')
        setTimeout(() => {
          this.getDate()
        }, 300)
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(['cartInfoList']),
    cartList() {
      return this.cartInfoList.cartInfoList || []
    },
    isAllcheck() {
      return this.cartList.every(item => item.isChecked === 1)
    },
    allPrice() {
      return this.cartList.reduce((preval, curval) => {
        preval += curval.skuPrice * curval.skuNum
        return preval
      }, 0)
    },
    allNum() {
      return this.cartList.reduce((preval, curval) => preval + curval.skuNum, 0)
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  a {
    cursor: pointer;
  }
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
