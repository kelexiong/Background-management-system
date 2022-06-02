<template>
  <div>
    <!-- 三级联动 -->
    <ThreeSelect @showData="showList" :isshowTabe="isshowTabe"></ThreeSelect>
    <el-card class="box-card">
      <!-- 展示SPU -->
      <div v-show="showSkuOrSpu === 0">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="addSPU(category3Id)"
          :disabled="category3Id === ''"
          >添加SPU</el-button
        >
        <template>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="spuName" label="SPU名称" width="280">
            </el-table-column>
            <el-table-column prop="description" label="SPU描述" width="width">
            </el-table-column>
            <el-table-column prop="address" label="操作" width="220">
              <template slot-scope="{ row }">
                <el-row>
                  <hint-button
                    type="success"
                    icon="el-icon-plus"
                    circle
                    size="mini"
                    title="添加Sku"
                    @click="addSkuInfo(row)"
                  ></hint-button>
                  <hint-button
                    type="warning"
                    icon="el-icon-edit"
                    circle
                    size="mini"
                    title="修改SPU"
                    @click="alterSPU(row)"
                  ></hint-button>
                  <hint-button
                    type="info"
                    icon="el-icon-chat-dot-round"
                    circle
                    size="mini"
                    title="查看SPU的全部Sku列表"
                    @click="lookSkuInfo(row)"
                  ></hint-button>
                  <el-popconfirm
                    :title="`确定要删除${row.spuName}`"
                    @onConfirm="removeSpu(row.id)"
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
      </div>
      <!-- 添加SPU -->
      <SpuFrom
        ref="spuelement"
        v-show="showSkuOrSpu === 1"
        @isshowSPUorSku="getisshowSOrS"
        @retrunShowList="retrunShowList(page)"
      ></SpuFrom>
      <SkuFrom
        ref="skuelement"
        v-show="showSkuOrSpu === 2"
        @onBack="getisshowSOrS"
      ></SkuFrom>
      <el-dialog
        :title="`${spuName}SKU详情`"
        :visible.sync="dialogTableVisible"
        :before-close="close"
      >
        <el-table :data="gridData" border v-loading="loading">
          <el-table-column
            property="skuName"
            label="名称"
            width="width"
          ></el-table-column>
          <el-table-column
            property="price"
            label="价格"
            width="100"
          ></el-table-column>
          <el-table-column
            property="weight"
            label="重量"
            width="100"
          ></el-table-column>
          <!--      property="address" -->
          <el-table-column label="默认图片" width="200">
            <template slot-scope="{ row }">
              <img :src="row.skuDefaultImg" alt="" style="width: 100px" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import SpuFrom from "@/views/goodsmag/goodsmagthree/SpuFrom";
import SkuFrom from "@/views/goodsmag/goodsmagthree/SkuFrom";
export default {
  name: "GoodsMagThree",
  components: {
    SpuFrom,
    SkuFrom,
  },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      tableData: [],
      isshowTabe: true,
      showSkuOrSpu: 0,
      page: 1,
      limit: 5,
      total: 0,
      // ...........
      gridData: [
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄",
        // },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      spuName: "",
      loading: true,
    };
  },
  //
  methods: {
    showList(val) {
      if (val.c3Id) {
        this.category3Id = val.c3Id;
        this.getListInfo();
      } else if (val.c2Id) {
        this.category2Id = val.c2Id;
        this.category3Id = "";
      } else {
        this.category1Id = val.c1Id;
        this.category2Id = "";
        this.category3Id = "";
      }
    },
    // 发请求拿列表
    async getListInfo(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$API.magthree.reqSpuInfoList(
        page,
        limit,
        category3Id
      );
      if (result.code === 200) {
        this.tableData = result.data.records;
        this.total = result.data.total;
      } else this.$message.error("展示数据出错了");
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getListInfo();
    },
    // 添加SPU
    addSPU(id) {
      this.showSkuOrSpu = 1;
      this.isshowTabe = false;
      this.$refs.spuelement.addSpuData(id);
    },
    // 修改SPU
    alterSPU(data) {
      this.showSkuOrSpu = 1;
      this.isshowTabe = false;
      this.$refs.spuelement.getSpuData(data);
    },
    // 添加Sku
    addSkuInfo(row) {
      this.showSkuOrSpu = 2;
      this.isshowTabe = false;
      this.$refs.skuelement.getSkuInfo(this.category1Id, this.category2Id, row);
    },
    // 查看SKU信息
    async lookSkuInfo(row) {
      // Object.assign(this._data.gridData)
      this.dialogTableVisible = true;
      this.spuName = row.spuName;
      let result = await this.$API.magthree.reqFindBySpuId(row.id);
      if (result.code === 200) {
        this.gridData = result.data;
        this.loading = false;
      }
    },
    // 清除数据残余
    close(done) {
      this.loading = true;
      this.gridData = [];
      done();
    },
    // 切换show模块
    getisshowSOrS(data) {
      this.showSkuOrSpu = data;
      this.isshowTabe = true;
    },
    // 跳转页面
    retrunShowList(page) {
      this.showSkuOrSpu = 0;
      this.isshowTabe = true;
      if (this.$refs.spuelement.sup.id) this.getListInfo(page);
      else this.getListInfo();
    },
    async removeSpu(id) {
      let result = await this.$API.magthree.reqDeleteSpu(id);
      if (result.code === 200) {
        this.$message({
          type: "success",
          message: "删除成功！！！",
        });
        this.getListInfo(this.tableData > 1 ? this.page : this.page - 1);
      } else this.$message.error("删除失败，网络问题");
    },
  },
  watch: {
    category3Id: {
      handler(newval, oldval) {
        if (newval === "") {
          this.tableData = [];
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  margin-bottom: 20px;
}
.selectinterval {
  margin: 0 15px 0 10px;
}
</style>
