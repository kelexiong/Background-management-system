<template>
  <div>
    <ThreeSelect></ThreeSelect>
    <el-card class="box-card">
      <el-button type="primary" icon="el-icon-edit">主要按钮</el-button>
      <template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="name" label="属性名称" width="180">
          </el-table-column>
          <el-table-column prop="address" label="属性值列表"></el-table-column>
          <el-table-column prop="address" label="操作" width="150">
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "GoodsMagTow",
  data() {
    return {
      tableData: [],
    };
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
