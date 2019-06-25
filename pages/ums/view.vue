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
      if (!row.certifiedPic) {
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
.el-image {
  height: 80px;
}
.warning-row {
  background: rgb(253, 230, 230);
}
.success-row {
  background: #f0f9eb;
}
</style>
