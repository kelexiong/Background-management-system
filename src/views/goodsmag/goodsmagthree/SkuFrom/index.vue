<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        {{ spuName }}
      </el-form-item>
      <el-form-item label="SKU名称" lable-width="">
        <el-input v-model="skuInfo.skuName" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input
          v-model="skuInfo.price"
          placeholder="价格（ 元 ）"
          style="width: 200px"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量">
        <el-input
          v-model="skuInfo.weight"
          placeholder="重量（ 千克 ）"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          v-model="skuInfo.skuDesc"
          placeholder="规格描述"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            :label="item.attrName"
            v-for="item in attrListInfo"
            :key="item.id"
          >
            <el-select placeholder="请选择" v-model="item.saveAllId">
              <el-option
                :label="itemson.valueName"
                :value="`${item.id}:${itemson.id}`"
                v-for="itemson in item.attrValueList"
                :key="itemson.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            :label="item2.saleAttrName"
            v-for="item2 in saleAttr"
            :key="item2.id"
          >
            <el-select placeholder="请选择" v-model="item2.save2AllId">
              <el-option
                :label="item2son.saleAttrValueName"
                :value="`${item2.id}:${item2son.id}`"
                v-for="item2son in item2.spuSaleAttrValueList"
                :key="item2son.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <template>
          <!--      -->
          <el-table
            ref="multipleTable"
            :data="spuImageLsit"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            border
          >
            <el-table-column prop="prop" type="selection" width="55">
            </el-table-column>
            <el-table-column prop="prop" label="图片" width="width">
              <template slot-scope="{ row }"
                ><img :src="row.imgUrl" alt="" style="width: 100px"
              /></template>
            </el-table-column>
            <el-table-column prop="name" label="名称" width="width">
              <template slot-scope="{ row }">
                {{ row.imgName }}
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" width="200">
              <template slot-scope="{ row }">
                <el-button
                  type="primary"
                  v-if="row.isDefault === '0'"
                  @click="setUpBtn(row)"
                >
                  设置为默认
                </el-button>
                <el-button type="success" v-else plain>默认</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSkuInfo">保存</el-button>
        <el-button @click="backMagT">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuFrom",
  data() {
    return {
      spuName: "",
      skuInfo: {
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        skuName: "",
        skuDesc: "",
        weight: "",
        price: 0,
        skuAttrValueList: [
          // {
          //   "attrId": 0,
          //   "valueId": 0,
          // }
        ],
        skuDefaultImg: "",
        skuImageList: [
          // {
          //   "imgName": "string",
          //   "imgUrl": "string",
          //   "isDefault": "string",
          //   "spuImgId": 0
          // }
        ],
        skuSaleAttrValueList: [
          // {
          // saleAttrId: 0,
          // saleAttrValueId: 0,
          // },
        ],
      },
      spuImageLsit: [],
      saleAttr: [],
      attrListInfo: [],
      morenbutton: false,
      imgList: [], //暂时存勾选图片
    };
  },
  methods: {
    backMagT() {
      this.$emit("onBack", 0);
      Object.assign(this._data, this.$options.data());
    },
    // 获取基本数据
    async getSkuInfo(category1Id, category2Id, row) {
      this.spuName = row.spuName;
      this.skuInfo.category3Id = row.category3Id;
      this.skuInfo.tmId = row.tmId;
      this.skuInfo.spuId = row.id;
      let result = await this.$API.magthree.reqspuSaleAttrList(row.id);
      if (result.code === 200) {
        this.saleAttr = result.data;
      }
      let result2 = await this.$API.magthree.reqSpuImageList(row.id);
      if (result2.code === 200) {
        let list = result2.data;
        list.forEach((item) => {
          item.isDefault = "0";
        });
        this.spuImageLsit = list;
      }
      let result3 = await this.$API.magtow.getAttributeData({
        category1Id,
        category2Id,
        category3Id: row.category3Id,
      });
      if (result3.code === 200) {
        this.attrListInfo = result3.data;
      }
    },
    // 设置默认按钮
    setUpBtn(row) {
      if (row.isDefault === "0") {
        this.spuImageLsit.forEach((item) => {
          item.isDefault = "0";
          if (item.id === row.id) {
            item.isDefault = "1";
          }
        });
        this.skuInfo.skuDefaultImg = row.imgUrl;
      }
    },
    // 保存
    async saveSkuInfo() {
      const { saleAttr, attrListInfo, imgList, skuInfo } = this;
      skuInfo.skuSaleAttrValueList = saleAttr.reduce((pev, init) => {
        if (init.save2AllId) {
          let [saleAttrId, saleAttrValueId] = init.save2AllId.split(":");
          let a = pev.push({ saleAttrId, saleAttrValueId });
        }
        return pev;
      }, []);
      // 图片收集
      skuInfo.skuImageList = imgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      skuInfo.skuAttrValueList = attrListInfo.reduce((pev, init) => {
        if (init.saveAllId) {
          let [attrId, valueId] = init.saveAllId.split(":");
          pev.push({ attrId, valueId });
        }
        return pev;
      }, []);
      let result = await this.$API.magthree.reqSaveSkuInfo(skuInfo);
      if (result.code === 200) {
        this.$message({ type: "success", message: "添加SKU成功！" });
        this.$emit("onBack", 0);
      } else {
        this.$message.error("网络问题添加失败");
      }
    },

    // 勾选状态
    handleSelectionChange(data) {
      this.imgList = data;
    },
  },
  // props:['']
};
</script>

<style></style>
