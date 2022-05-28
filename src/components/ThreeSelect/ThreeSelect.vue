<template>
  <el-card class="box-card">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="一级联动">
        <el-select v-model="formInline.category1Id" placeholder="请选择">
          <el-option
            v-for="item in LevelOneData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级联动">
        <el-select v-model="formInline.category2Id" placeholder="请选择">
          <el-option
            v-for="item2 in LevelTowData"
            :key="item2.id"
            :label="item2.name"
            :value="item2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级联动">
        <el-select
          v-model="formInline.category3Id"
          placeholder="请选择"
          @change="getData"
        >
          <el-option
            v-for="item3 in levelThreeData"
            :key="item3.id"
            :label="item3.name"
            :value="item3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "ThreeSelect",

  data() {
    return {
      formInline: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      LevelOneData: [],
      LevelTowData: [],
      levelThreeData: [],
    };
  },
  mounted() {
    this.getLevelOne();
  },

  methods: {
    async getLevelOne() {
      let result = await this.$API.magtow.levellOne();
      if (result.code === 200) {
        this.LevelOneData = result.data;
      } else {
        this.$message.error("网络出问题了！");
      }
    },
    async getLevelTow(id) {
      let result = await this.$API.magtow.levelTow(id);
      if (result.code === 200) {
        this.LevelTowData = result.data;
      } else {
        this.$message.error("网络出错");
      }
      this.$emit("showData", []);
    },
    async getLevelThree(id) {
      let result = await this.$API.magtow.levelThree(id);
      if (result.code === 200) {
        this.levelThreeData = result.data;
      } else {
        this.$message.error("网络出错");
      }
      this.$emit("showData", []);
    },
    async getData() {
      let result = await this.$API.magtow.getAttributeData(this.formInline);
      if (result.code === 200) {
        this.$emit("showData", {
          data: result.data,
          id: this.formInline.category3Id,
        });
      } else {
        this.$message.error("展示数据出错了");
      }
    },
  },

  watch: {
    "formInline.category1Id": {
      handler(newval) {
        if (newval) {
          this.formInline.category2Id = "";
          this.formInline.category3Id = "";
          this.LevelTowData = [];
          this.levelThreeData = [];
          this.getLevelTow(newval);
        }
      },
    },
    "formInline.category2Id": {
      handler(newval) {
        if (newval) {
          this.formInline.category3Id = "";
          this.levelThreeData = [];
          this.getLevelThree(newval);
        }
      },
    },
  },
};
</script>

<style></style>
