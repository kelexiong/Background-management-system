<template>
  <el-row>
    <!-- 添加按钮 -->
    <el-button icon="el-icon-plus" type="primary" @click="showdiload"
      >主要按钮</el-button
    >
    <!-- 弹出层 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form
        :model="oneform"
        style="width: 90%"
        :rules="rules"
        ref="submitgoodsform"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="oneform.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/get-goods/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="oneform.logoUrl" :src="oneform.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upGoods">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 列表 -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column
        prop="date"
        type="index"
        label="序号"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width=""
      ></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 70px" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="upDataGoods(row)"
            round
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deletegoods(row)"
            round
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="limit"
      layout="prev , pager, next, jumper,-> , sizes,total"
      :total="total"
    >
    </el-pagination>
  </el-row>
</template>

<script>
export default {
  name: "GoodsMagOne",
  data() {
    return {
      total: 0,
      list: [],
      page: 1,
      limit: 5,
      dialogFormVisible: false,
      oneform: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请选择图片" }],
      },
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    // 每次关闭后清除掉Diload
    dialogFormVisible: {
      handler(newval, oldval) {
        if (!newval) {
          this.oneform.tmName = "";
          this.oneform.logoUrl = "";
          this.oneform.id = "";
        }
      },
    },
  },
  methods: {
    async getData(page = 1, limit = 5) {
      let result = await this.$API.magone.getpage(page, limit);
      if (result.code === 200) {
        const { data } = result;
        this.total = data.total;
        this.list = data.records;
      } else {
        this.$message.error("数据加载失败！！！");
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getData(this.page, this.limit);
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getData(this.page, this.limit);
    },
    // 添加显示Diload
    showdiload() {
      this.dialogFormVisible = true;
      console.log(this.oneform.id);
    },
    // 上传添加
    upGoods() {
      this.$refs.submitgoodsform.validate(async (status) => {
        if (status) {
          if (this.oneform.id) {
            let result = await this.$API.magone.putgoods(this.oneform);
            if (result.code === 200) {
              this.$message({
                message: "修改成功！！！",
                type: "success",
              });
              this.dialogFormVisible = false;
            } else {
              this.$message.error("上传失败了！！！");
              return Promise.reject(new Error("出错"));
            }
          } else {
            let result = await this.$API.magone.upgoods(this.oneform);
            if (result.code === 200) {
              this.$message({
                message: "上传成功！！！",
                type: "success",
              });
              this.dialogFormVisible = false;
            } else {
              this.$message.error("上传失败了！！！");
              return Promise.reject(new Error("出错"));
            }
          }
          this.getData(this.page);
        }
      });
    },
    // 修改
    upDataGoods(data) {
      this.oneform.id = data.id;
      this.oneform.tmName = data.tmName;
      this.oneform.logoUrl = data.logoUrl;
      this.dialogFormVisible = true;
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.oneform.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 删除
    deletegoods(data) {
      this.$confirm(`确定要删除 ${data.tmName} 吗, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 埋坑
          let result = await this.$API.magone.deletegoods(data.id);
          if (result.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getData(this.page);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scope>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
