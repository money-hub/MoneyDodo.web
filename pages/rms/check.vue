<template>
  <div>
    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      :data="tableData"
      :row-class-name="tableRowClassName"
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
            :src="scope.row.icon || ''"
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
            :src="scope.row.certifiedPic || ''"
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
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="150px"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            @click="check(scope, true)"
          >
            通过
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="check(scope, false)"
          >
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
    check(scope, isApproved) {
      this.$axiosres.data.status
        .post('/certs/' + String(scope.row.id), {
          pass: isApproved
        })
        .then((res) => {
          if (res.data.status) {
            const index = this.tableData.indexOf(scope.row)
            if (index > -1) {
              this.tableData.splice(index, 1)
            }
          }
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
