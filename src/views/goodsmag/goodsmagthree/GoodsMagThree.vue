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
          @click="alterSPU"
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
                  ></hint-button>
                  <hint-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    size="mini"
                    title="删除SPU"
                  ></hint-button>
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
      ></SpuFrom>
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
    };
  },
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
    // 修改SPU
    alterSPU(data) {
      this.showSkuOrSpu = 1;
      this.isshowTabe = false;
      this.$refs.spuelement.getSpuData(data);
    },
    getisshowSOrS(data) {
      this.showSkuOrSpu = data;
      this.isshowTabe = true;
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
