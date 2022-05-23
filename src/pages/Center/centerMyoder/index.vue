<template>
  <div class="order-content">
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="orders">
      <table class="order-item" v-for="item in orederRecords" :key="item.id">
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle"
                >{{ item.createTime }}　订单编号：{{ item.outTradeNo }} <span class="pull-right delete"><img src="../images/delete.png" /></span
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(itemchilder, index) in item.orderDetailList" :key="itemchilder.id">
            <td width="60%">
              <div class="typographic">
                <img :src="itemchilder.imgUrl" />
                <a class="block-text">{{ itemchilder.skuName }}</a>
                <span>x{{ itemchilder.skuNum }}</span>
                <a class="service">售后申请</a>
              </div>
            </td>
            <td :rowspan="item.orderDetailList.length" width="8%" class="center" v-if="index === 0">{{ item.consignee }}</td>
            <td :rowspan="item.orderDetailList.length" width="13%" class="center" v-if="index === 0">
              <ul class="unstyled">
                <li>总金额¥{{ item.totalAmount }}.00</li>
                <li>在线支付</li>
              </ul>
            </td>
            <td :rowspan="item.orderDetailList.length" width="8%" class="center" v-if="index === 0">
              <a class="btn">{{ item.orderStatusName }} </a>
            </td>
            <td :rowspan="item.orderDetailList.length" width="13%" class="center" v-if="index === 0">
              <ul class="unstyled">
                <li>
                  <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>
              </ul>
            </td>
          </tr>
          <!-- <tr>
            <td width="50%">
              <div class="typographic">
                <img src="../images/goods.png" />
                <a  class="block-text">包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶 新款</a>
                <span>x1</span>
                <a href="#" class="service">售后申请</a>
              </div>
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
    <!--分页器 -->
    <div class="choose-order">
      <Pagination :pageNo="page" :pageSize="limit" :tato="orederData.total" :lianXpage="5" @newpage="newpage"></Pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'centerMyoder',
  data() {
    return {
      orederData: {},
      page: 1,
      limit: 3
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      let result = await this.$API.reqMyOrederList(this.page, this.limit)
      if (result.code === 200) {
        this.orederData = result.data
      }
    },
    newpage(data) {
      this.page = data
      this.getData()
    }
  },
  computed: {
    orederRecords() {
      return this.orederData.records || {}
    }
  }
}
</script>

<style lang="less">
.typographic {
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
