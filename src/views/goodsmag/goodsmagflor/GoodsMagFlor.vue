<template>
  <div>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="skuName" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="skuDesc" label="描述"> </el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量"> </el-table-column>
        <el-table-column prop="price" label="价格" width="100" align="center">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="{ row }">
            <el-row class="removemargin">
              <hint-button
                type="info"
                icon="el-icon-upload2"
                circle
                size="mini"
                title="上架"
                v-if="row.isSale === 0"
                @click="OnSale(row)"
              ></hint-button>
              <hint-button
                type="success"
                icon="el-icon-download"
                circle
                size="mini"
                title="下架"
                v-else
                @click="CancelSale(row)"
              ></hint-button>
              <hint-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
                title="修改SPU"
                @click="$message('功能开发中！可能没有')"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-chat-dot-round"
                circle
                size="mini"
                title="查看SPU的全部Sku列表"
                @click="lookSkuInfo(row.id)"
              ></hint-button>
              <!-- @onConfirm="removeSpu(row.id)" -->
              <el-popconfirm
                :title="`确定要删除`"
                @onConfirm="removeSkuInfo(row.id)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  slot="reference"
                  size="mini"
                  title="删除SPU"
                ></hint-button>
              </el-popconfirm>
            </el-row>
          </template>
        </el-table-column>
        <!-- 侧边栏显示sku信息 -->
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      @size-change="handleSizeChange"
      @current-change="getListInfo"
      :current-page="page"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="limit"
      layout="prev , pager, next, jumper,-> , sizes,total"
      :total="total"
    >
    </el-pagination>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      size="50%"
    >
      <template>
        <el-form
          :model="form"
          label-width="120px"
          class="formsmaring"
          v-loading="loading"
        >
          <el-form-item prop="prop" label="名称">
            <span>{{ form.skuName }}</span>
          </el-form-item>
          <el-form-item prop="prop" label="描述">
            <span>{{ form.skuDesc }}</span>
          </el-form-item>
          <el-form-item prop="prop" label="价格">
            <span>{{ form.price }}</span>
          </el-form-item>
          <el-form-item prop="prop" label="平台属性">
            <template>
              <el-tag
                size="small"
                type="success"
                v-for="item in form.skuAttrValueList"
                :key="item.id"
                >{{ item.attrName }}</el-tag
              >
            </template>
          </el-form-item>
          <el-form-item prop="prop" label="商品图片">
            <template>
              <el-carousel
                :interval="2000"
                type="card"
                height="200px"
                class="imgsmall"
              >
                <el-carousel-item
                  v-for="item in form.skuImageList"
                  :key="item.spuImgId"
                >
                  <img :src="item.imgUrl" alt="" />
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-form-item>
        </el-form>
      </template>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "GoodsMagFlor",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 1,
      tableData: [],
      loading: true,
      drawer: false,
      form: {},
      arr: [],
    };
  },
  mounted() {
    this.getListInfo();
  },
  methods: {
    handleSizeChange(data) {
      this.limit = data;
      this.getListInfo(this.page);
    },
    async getListInfo(page = 1) {
      this.loading = true;
      this.page = page;
      let result = await this.$API.magflor.reqSkuInfo(page, this.limit);
      if (result.code === 200) {
        // this.tableData = result.data.records.map((item) => {
        //   this.$set(item, "isuploadSku", true);
        //   return item;
        // });
        this.tableData = result.data.records;
        this.total = result.data.total;
      }
      this.loading = false;
    },
    async OnSale(row) {
      let result = await this.$API.magflor.reqOnSale(row.id);
      if (result.code === 200) {
        this.$message({ type: "success", message: "上架成功" });
        row.isSale = 1;
      } else {
        this.$message.error("上架失败");
      }
      this.getListInfo(this.page);
    },
    async CancelSale(row) {
      let result = await this.$API.magflor.reqCancelSale(row.id);
      if (result.code === 200) {
        this.$message({ type: "success", message: "下架成功" });
        row.isSale = 0;
      } else {
        this.$message.error("下架失败");
      }
    },
    // 查看Sku信息
    async lookSkuInfo(id) {
      this.form = {};
      this.drawer = true;
      this.loading = true;
      let result = await this.$API.magflor.reqGetSkuById(id);
      if (result.code === 200) {
        this.form = result.data;
      }
      this.loading = false;
    },
    // 删除
    async removeSkuInfo(id) {
      let result = await this.$API.magflor.reqDeleteSku(id);
      if (result.code === 200) {
        this.$message({ type: "success", message: "删除成功！" });
        this.getListInfo(this.page);
      } else {
        this.$message.error("网络出问题了删除失败！！");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.removemargin {
  a {
    margin: 0 !important;
  }
  :last-child a {
    margin: 10px !important;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }
.formsmaring {
  margin-top: 88px;
  .el-tag {
    span {
      display: flex;
      padding: 0 20px;
    }
  }
  .imgsmall {
    img {
      width: 157px;
      height: 200px;
    }
  }
}
</style>
