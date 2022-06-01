<template>
  <el-form ref="form" :model="sup" label-width="80px" :rules="rules">
    <el-form-item label="SPU名称" prop="spuName">
      <el-input v-model="sup.spuName" style="width: 35%"></el-input>
    </el-form-item>
    <el-form-item label="品牌" prop="tmId">
      <el-select v-model="sup.tmId" placeholder="请选择品牌">
        <el-option
          :label="item.tmName"
          v-for="item in TrademarkChooseList"
          :key="item.id"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述" prop="description">
      <el-input
        type="textarea"
        v-model="sup.description"
        rows="4"
        placeholder="请输入SPU的描述"
        style="width: 50%"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <!-- 照片墙 -->
      <!-- 上传 -->
      <!-- list-type="picture-card"这是文件列表类型照片墙类型  on-preview预览触发函数 
      on-remove删除时触发函数   file-list上传的文件列表, 例如: [{name: 'food.jpg', url: '}]是个数组-->
      <el-upload
        action="/get-goods/admin/product/fileUpload"
        list-type="picture-card"
        :file-list="spuIamgeList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleAdd"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <!-- 展示 -->
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select
        v-model="sakeid"
        :placeholder="`未选择的销售属性:${unSalesAttr.length}`"
      >
        <el-option
          :label="item.name"
          v-for="item in unSalesAttr"
          :key="item.id"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-edit"
        :disabled="sakeid === ''"
        @click="addSalesAttr"
        >添加销售属性</el-button
      >
    </el-form-item>
    <el-form-item>
      <template>
        <el-table :data="sup.spuSaleAttrList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="220">
          </el-table-column>
          <el-table-column
            prop="spuSaleAttrList"
            label="属性值名称列表"
            width="width"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="tag in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row, $index)"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="200">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="sup.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveAllForm('form')">保存</el-button>
      <el-button @click="isshowSPUorSku">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SpuFrom",
  data() {
    return {
      sup: {
        category3Id: 0,
        description: "",
        spuImageList: [],
        spuName: "",
        spuSaleAttrList: [],
        tmId: "",
      },
      rules: {
        spuName: [{ required: true, message: "请输入" }],
        tmId: [{ required: true, message: "请输入" }],
        description: [{ required: true, message: "请输入" }],
      },
      TrademarkChooseList: [], //选择品牌列表
      saleAttrList: [], //销售属性下拉
      sakeid: "", //储存未添加的属性
      spuIamgeList: [], //SPU照片墙列表
      dialogImageUrl: "",
      dialogVisible: false,
      inputVisible: false,
      inputValue: "", //存储输入的属性值
    };
  },
  mounted() {},
  methods: {
    handleAdd(response, file, fileList) {
      this.spuIamgeList = fileList;
    },
    handleRemove(file, fileList) {
      this.spuIamgeList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    isshowSPUorSku() {
      this.$emit("isshowSPUorSku", 0);
      Object.assign(this._data, this.$options.data());
    },
    // 获取天机的基本数据
    async addSpuData(id) {
      // 初始化数据************************************
      this.sup.category3Id = id;
      // this.sup = {
      // category3Id: id,
      //   description: "",
      //   spuImageList: [],
      //   spuName: "",
      //   spuSaleAttrList: [],
      //   tmId: "",
      // };
      // this.TrademarkChooseList = []; //选择品牌列表
      // this.saleAttrList = []; //销售属性下拉
      // this.sakeid = ""; //储存未添加的属性
      // this.spuIamgeList = []; //SPU照片墙列表
      // this.dialogImageUrl = "";
      // this.dialogVisible = false;
      // this.inputVisible = false;
      // this.inputValue = "";
      // 初始化数据结束************************************

      let getTrademark = await this.$API.magthree.reqTrademarkList();
      if (getTrademark.code === 200) {
        this.TrademarkChooseList = getTrademark.data;
      }
      let getSalelist = await this.$API.magthree.reqbaseSaleAttrList();
      if (getSalelist.code === 200) {
        this.saleAttrList = getSalelist.data;
      }
    },
    // 获取修改的基本数据
    async getSpuData(row) {
      try {
        let getspuid = await this.$API.magthree.reqGetSpuById(row.id);
        if (getspuid.code === 200) {
          this.sup = getspuid.data;
          this.sup.spuName = getspuid.data.spuName;
          this.sup.description = getspuid.data.description;
          // this.form.spuselcetList = getspuid.data.spuSaleAttrList;
        }
        let getTrademark = await this.$API.magthree.reqTrademarkList();
        if (getTrademark.code === 200) {
          this.TrademarkChooseList = getTrademark.data;
        }
        let getSpuIamge = await this.$API.magthree.reqSpuImageList(row.id);
        if (getSpuIamge.code === 200) {
          let arr = getSpuIamge.data;
          arr.forEach((item) => {
            item.name = item.imgName;
            item.url = item.imgUrl;
          });
          this.spuIamgeList = arr;
        }
        let getSalelist = await this.$API.magthree.reqbaseSaleAttrList();
        if (getSalelist.code === 200) {
          this.saleAttrList = getSalelist.data;
        }
      } catch (error) {}
    },
    // 添加属性值
    handleClose(tag) {
      this.sup.spuSaleAttrList.forEach((item) => {
        if (item.baseSaleAttrId === tag.baseSaleAttrId) {
          item.spuSaleAttrValueList.splice(
            item.spuSaleAttrValueList.indexOf(tag),
            1
          );
        }
      });
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput(val) {
      // console.log(12322222222);
      // this.sup.spuSaleAttrList.forEach((item) => {
      //   item.saleAttrName === val.saleAttrName
      //     ? this.$set(item, "inputVisible", true)
      //     : this.$set(item, "inputVisible", false);
      // });
      this.$set(val, "inputVisible", true);

      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(val) {
      let inputValue = {};
      this.inputValue = this.inputValue.trim();
      if (this.inputValue) {
        let result = this.sup.spuSaleAttrList.some((item) => {
          if (item.saleAttrName === val.saleAttrName)
            return item.spuSaleAttrValueList.some(
              (itemson) => itemson.saleAttrValueName === this.inputValue
            );
        });
        // let reuslt=val.spuSaleAttrValueList.some(item=>itemson.saleAttrValueName === this.inputValue)
        if (!result) {
          inputValue.saleAttrValueName = this.inputValue;
          inputValue.baseSaleAttrId = val.baseSaleAttrId;
          val.spuSaleAttrValueList.push(inputValue);
        } else {
          this.$message.error("重复了都不知道");
        }

        // this.sup.spuSaleAttrList.forEach((item) => {
        //   if (item.saleAttrName === val.saleAttrName) {
        //     item.spuSaleAttrValueList.push(inputValue);
        //   }
        // });
      }

      val.inputVisible = false;
      this.inputValue = "";
    },
    // 添加属性到属性列表
    addSalesAttr() {
      let [baseSaleAttrId, saleAttrName] = this.sakeid.split(":");
      let objdata = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] };
      this.sup.spuSaleAttrList.push(objdata);
      this.sakeid = "";
    },
    saveAllForm(val) {
      // if(this.sup.description!==''&&this.sup.category3Id!==''&&this.sup.spuName!===''&&)
      this.$refs[val].validate(async (valid) => {
        if (valid) {
          this.sup.spuImageList = this.spuIamgeList.map((item) => {
            return {
              imgName: item.name,
              imgUrl: item.url,
              // item.response.data ? item.response.data :
            };
          });
          let result = await this.$API.magthree.reqUpdateAndSaveSpuInfo(
            this.sup
          );
          if (result.code === 200) {
            this.$message({
              type: "success",
              message: "保存成功",
            });

            this.$emit("retrunShowList", 1);
            Object.assign(this._data, this.$options.data());
          }
        } else {
          return false;
        }
      });
    },
  },
  computed: {
    unSalesAttr() {
      // console.log(this.sup.spuSaleAttrList.length);
      // if (this.sup.spuSaleAttrList.length !== 0) {
      return this.saleAttrList.filter((item) => {
        return this.sup.spuSaleAttrList.every(
          (item1) => item.name !== item1.saleAttrName
        );
      });
      // }
      // return [];
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
