<template>
  <div>
    <ThreeSelect @showData="showList"></ThreeSelect>
    <el-card class="box-card">
      <div v-show="isshowTabe">
        <el-button
          type="primary"
          icon="el-icon-edit"
          :disabled="tableData.length === 0"
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
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    size="mini"
                  ></el-button>
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
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="addAttrValueList"
              :disabled="addOrAlter.attrName === ''"
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
                  <template slot-scope="{ row }">
                    <el-input
                      v-model="row.valueName"
                      placeholder="请输入属性值"
                      size="mini"
                      v-if="row.flag"
                      @blur="viewMode(row)"
                    >
                    </el-input>
                    <span @click="modifyModel(row)" v-else>{{
                      row.valueName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="width">
                  <template>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      size="mini"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveUpload">保存</el-button>
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
            min: 2,
            max: 10,
            message: "长度在 2到 10个字符",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    showList(val) {
      if (Array.isArray(val)) this.tableData = val;
      else {
        this.tableData = val.data;
        this.addOrAlter.categoryId = val.id;
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

    addAttrValueList() {
      this.addOrAlter.attrValueList.push({
        attrId: undefined,
        valueName: "",
        flag: true,
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
      console.log(ass);
      if (row.valueName.trim() === "" || ass) {
        this.$message.error("不能为空或属性值相同");
        return;
      }

      row.flag = false;
    },
    modifyModel(row) {
      row.flag = true;
    },
    saveUpload() {},
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
