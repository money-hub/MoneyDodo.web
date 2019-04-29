<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" disabled="disabled">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="id" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers">
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
      :data="tableData"
      :row-class-name="tableRowClassName"
      @row-click="tableRowClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column prop="id" label="id" align="center" />
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.icon"></img>
        </template>
      </el-table-column>
      <el-table-column label="认证信息">
        <template slot-scope="scope">
          <img :src="scope.row.certifiedPic"></img>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" />
      <el-table-column prop="introduction" label="个人简介" show-overflow-tooltip />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="balance" label="余额" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="creditScore" label="信用分" />
      <el-table-column label="操作" min-width="130px">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="check(scope.row.id, true)">
            通过
          </el-button>
          <el-button size="small" type="danger" @click="check(scope.row.id, false)">
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">
        切换第二、第三行的选中状态
      </el-button>
      <el-button @click="toggleSelection()">
        取消选择
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      filters: {
        name: ''
      }
    }
  },
  asyncData({ $axios, params }) {
    return $axios.get('/certs').then((res) => {
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
    tableRowClick(row, col) {
      console.log(row)
    },
    check(id, isApproved) {
      this.$axios.post('/certs/' + String(id), isApproved).then((res) => {
        console.log(res)
      })
    },
    getUsers() {
      this.$axios.get('/certs' + (!this.filters.name ? '' : ('/' + this.filters.name)))
        .then((res) => {
          const data = res.data.data
          if (data instanceof Array) {
            this.tableData = res.data.data
          } else {
            this.tableData = [data]
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
          this.tableData = []
        })
    }
  }
}
</script>

<style scoped>
table {
  text-align: center;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
