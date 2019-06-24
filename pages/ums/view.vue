<template>
  <div class="match-parent">
    <el-col
      :span="24"
      class="toolbar"
      style="padding-bottom: 0px;"
    >
      <el-form
        :inline="true"
        :model="filters"
      >
        <el-form-item>
          <el-input
            v-model="filters.name"
            placeholder="id 或 用户名"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="quering"
            @click="getUsers"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      lazy
      :data="tableData"
      :row-class-name="tableRowClassName"
      @row-click="tableRowClick"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" /> -->
      <el-table-column
        prop="id"
        label="id"
        align="center"
      />
      <el-table-column
        label="头像"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            lazy
            fit="scale-down"
            :src="scope.row.icon"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="认证信息"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            lazy
            fit="scale-down"
            :src="scope.row.certifiedPic"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        align="center"
      />
      <el-table-column
        prop="introduction"
        label="个人简介"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        align="center"
      />
      <el-table-column
        prop="balance"
        label="余额"
        align="center"
      />
      <el-table-column
        prop="phone"
        label="电话"
        align="center"
      />
      <el-table-column
        prop="creditScore"
        label="信用分"
        align="center"
      />
      <!-- <el-table-column label="操作" fixed="right" align="center" min-width="150px">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="check(scope.row.id, true)">
            通过
          </el-button>
          <el-button size="small" type="danger" @click="check(scope.row.id, false)">
            拒绝
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
      <el-upload
        ref="upload"
        action="alert"
        class="avatar-uploader"
        :file-list="fileList"
        :limit="1"
        :auto-upload="false"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-change="handleAvatarChange"
        :on-exceed="replaceFile"
        :http-request="uploadIcon"
      >
        <img v-if="avatar" :src="avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="uploadDisabled" @click="confirm">
          确 定
        </el-button>
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      quering: false,
      multipleSelection: [],
      fileList: [],
      // dialogFormTitle: '',
      // dialogFormVisible: false,
      // avatar: '',
      // infoForm: null,
      // uploadDisabled: true
      filters: {
        name: ''
      }
    }
  },
  asyncData({ $axios, params }) {
    return $axios.get('/users').then((res) => {
      return { tableData: res.data.data }
    })
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.certifiedPic == null) {
        return 'warning-row'
      } else if (row.certifiedPic != null) {
        return 'success-row'
      }
      return ''
    },
    getUsers() {
      this.quering = true
      this.$axios.get('/users' + (!this.filters.name ? '' : ('/' + this.filters.name)))
        .then((res) => {
          this.quering = false
          if (res.data.status) {
            const data = res.data.data
            if (data instanceof Array) {
              this.tableData = res.data.data
            } else {
              this.tableData = [data]
            }
          } else {
            this.tableData = []
          }
        })
        .catch((err) => {
          this.quering = false
          if (err) {
            console.log(err)
          }
          this.tableData = []
        })
    },
    // beforeAvatarUpload(file) {
    //   const isLt2M = file.size / 1024 / 1024 < 2

    //   if (!isLt2M) {
    //     this.$message.error('图片大小不能超过 2MB!')
    //   }
    //   return isLt2M
    // },
    // confirm() {
    //   this.$refs.upload.submit()
    // },
    // uploadIcon(param) {
    //   this.uploadDisabled = true
    //   const postData = Object.assign({}, this.infoForm, { certifiedPic: this.avatar })
    //   this.$axios.put('/users/' + postData.id, postData)
    //     .then((res) => {
    //       if (res.data.status) {
    //         this.infoForm.certifiedPic = this.avatar
    //         this.dialogFormVisible = false
    //         this.avatar = null
    //       } else {
    //         this.$message.error(res.data.errinfo)
    //       }
    //     })
    //     .catch((err) => {
    //       this.$message.error(err.message)
    //       this.avatar = null
    //     })
    // },
    // handleAvatarChange(file, fileList) {
    //   this.uploadDisabled = true
    //   const reader = new FileReader()
    //   const that = this
    //   reader.readAsDataURL(file.raw)
    //   reader.onload = function (e) {
    //     that.avatar = reader.result
    //     that.uploadDisabled = false
    //   }
    // },
    // replaceFile(files, fileList) {
    //   this.fileList[0] = files[0]
    //   this.handleAvatarChange({ raw: files[0] }, this.fileList)
    // },
    tableRowClick(row, col) {
      // this.infoForm = row
      // this.dialogFormTitle = row.name
      // this.dialogFormVisible = true
      this.$router.push('/tms/view?userId=' + row.id)
    }
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-image {
  height: 80px;
}
/* .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
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
} */
</style>
