<template>
  <div>
    <ThreeSelect @showData="showList" :isshowTabe="isshowTabe"></ThreeSelect>
    <el-card class="box-card">
      <div v-show="isshowTabe">
        <el-button
          type="primary"
          icon="el-icon-edit"
          :disabled="formInline.category3Id === '' && tableData.length === 0"
          @click="addAttr"
          >添加属性</el-button
        >
        <template>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="80"
            >
            </el-table-column>
            <el-table-column prop="attrName" label="属性名称" width="150">
            </el-table-column>
            <el-table-column prop="prop" label="属性值列表">
              <template slot-scope="{ row }">
                <el-tag
                  type="success"
                  v-for="attritem in row.attrValueList"
                  :key="attritem.id"
                  style="margin: 0 10px"
                  >{{ attritem.valueName }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" width="150">
              <template slot-scope="{ row }">
                <el-row>
                  <el-button
                    type="warning"
                    icon="el-icon-edit"
                    circle
                    size="mini"
                    @click="alterAttr(row)"
                  ></el-button>
                  <el-popconfirm
                    :title="`确定要删除${row.attrName}吗？`"
                    @onConfirm="deletAttribute(row)"
                  >
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      size="mini"
                      slot="reference"
                    ></el-button>
                  </el-popconfirm>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div v-show="!isshowTabe">
        <el-form
          ref="form"
          :model="addOrAlter"
          label-width="80px"
          :rules="rules"
        >
          <el-form-item label="属性名" prop="attrName">
            <el-input
              v-model="addOrAlter.attrName"
              placeholder="请输入属性名"
              style="width: 40%"
              @input="isButtonNot"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="addAttrValueList"
              :disabled="isAddAttr"
              >添加属性</el-button
            >
            <el-button @click="isshowTabe = true">取消</el-button>
          </el-form-item>
          <el-form-item>
            <template>
              <el-table
                :data="addOrAlter.attrValueList"
                border
                style="width: 100%"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  align="center"
                  width="80"
                >
                </el-table-column>
                <el-table-column prop="name" label="属性值名称" width="width">
                  <template slot-scope="{ row, $index }">
                    <el-input
                      v-model="row.valueName"
                      placeholder="请输入属性值"
                      size="mini"
                      v-if="row.flag"
                      @blur="viewMode(row, $index)"
                      :ref="$index"
                    >
                    </el-input>
                    <span @click="modifyModel(row, $index)" v-else>{{
                      row.valueName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="width">
                  <template slot-scope="{ $index }">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      size="mini"
                      @click="deleteValueName($index)"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="addOrAlter.attrValueList.length < 1"
              @click="saveUpload"
              >保存</el-button
            >
            <el-button @click="isshowTabe = true">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "GoodsMagTow",
  data() {
    return {
      formInline: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      isAddAttr: true,
      tableData: [],
      isshowTabe: true,
      addOrAlter: {
        attrName: "",
        categoryId: "",
        categoryLevel: 3,
        attrValueList: [],
      },
      rules: {
        attrName: [
          { required: true, message: "请输入属性名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1到 10个字符",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    async showList(val) {
      if (val.c3Id) {
        this.formInline.category3Id = val.c3Id;

        let result = await this.$API.magtow.getAttributeData(this.formInline);
        if (result.code === 200) {
          this.tableData = result.data;
          this.addOrAlter.categoryId = this.formInline.category3Id;
        } else {
          this.$message.error("展示数据出错了");
        }
      } else if (val.c2Id) {
        this.formInline.category2Id = val.c2Id;
        this.formInline.category3Id = "";
      } else {
        this.formInline.category1Id = val.c1Id;
        this.formInline.category2Id = "";
        this.formInline.category3Id = "";
      }
    },
    addAttr() {
      this.isshowTabe = false;
      this.addOrAlter = {
        attrName: "",
        categoryId: this.addOrAlter.categoryId,
        categoryLevel: 3,
        attrValueList: [],
      };
    },
    // 判断按钮是否可以用
    isButtonNot() {
      this.isAddAttr = this.addOrAlter.attrName === "" ? true : false;
    },
    addAttrValueList() {
      this.addOrAlter.attrValueList.push({
        attrId: undefined,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.addOrAlter.attrValueList.length - 1].focus();
        this.isAddAttr = true;
      });
    },
    // 修改属性值
    alterAttr(val) {
      this.isshowTabe = false;
      val.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
      this.addOrAlter = cloneDeep(val);
    },
    // 修改模式和查看模式
    viewMode(row) {
      let ass = this.addOrAlter.attrValueList.some((item) => {
        if (item !== row) {
          return item.valueName === row.valueName;
        }
      });

      if (row.valueName.trim() === "" || ass) {
        this.$message.error("不能为空或属性值相同");
        return;
      }
      this.isAddAttr = false;
      row.flag = false;
    },
    modifyModel(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    deleteValueName(index) {
      this.$confirm("此操作将删除该属性值, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.addOrAlter.attrValueList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 保存
    async saveUpload() {
      if (this.addOrAlter.attrValueList.length === 0) {
        this.$message.error("保存失败，不能为空");
      } else {
        let result = await this.$API.magtow.addAttribute(this.addOrAlter);
        if (result.code === 200) {
          this.$message({
            type: "success",
            message: "保存成功！",
          });
          this.showList({ c3Id: this.formInline.category3Id });
          this.isshowTabe = true;
        } else {
          this.$message.error("网络问题，保存失败");
        }
      }
    },
    // 删除属性
    async deletAttribute(row) {
      let result = await this.$API.magtow.deleteAttribute(row.id);
      if (result.code === 200) {
        this.$message({
          type: "success",
          message: "删除属性成功",
        });
        this.showList({ c3Id: this.formInline.category3Id });
      } else {
        this.message.error("网络不好，删除失败");
      }
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
.selectin terval {
  margin: 0 15px 0 10px;
}
</style>
