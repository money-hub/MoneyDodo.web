<template>
  <div class="match-parent">
    <el-table
      ref="multipleTable"
      v-loading.body.lock="tableLoading"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      lazy
      :data="tableData"
      @expand-change="getTaskComment"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div
            v-for="i in scope.row.comments"
            :key="i.id"
            :loading="i.loadComment"
          >
            <span>{{ i.userId }}</span>
            <span>{{ i.timestamp }}</span>
            <span>{{ i.stars }}</span>
            <div>{{ i.content }}</div>
            <el-button
              type="danger"
              @click="deleteComment(i)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        align="center"
      />
      <el-table-column
        prop="taskId"
        label="任务id"
        align="center"
      />
      <el-table-column
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            :type="buttonColorTable[scope.row.state]"
            disable-transitions
          >
            {{ scope.row.state }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="userId"
        label="发布者"
        align="center"
      />
      <!-- <el-table-column
        label="查看"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="view(scope.row)"
          >
            查看
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  watchQuery: true,
  data() {
    return {
      quering: false,
      fileList: [],
      filters: {
        name: ''
      },
      radio: null,
      tableLoading: false,
      buttonColorTable: {
        'non-released': 'info',
        'released': 'success',
        'closed': 'danger'
      }
    }
  },
  asyncData({ $axios }) {
    return $axios.get('/reviews').then((res) => {
      return {
        tableData: res.data.data
      }
    })
  },
  methods: {
    deleteComment(comment) {
      this.$axios.delete('/tasks/' + comment.tasksId + '/comments/' + comment.id).then((res) => {
        if (res.data.status) {
          this.tableData.comments.splice(this.tableData.comments.indexOf(comment), 1)
          this.$message({
            type: 'sucess',
            message: '删除成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    },
    formatDate(str, fmt) {
      const d = new Date(str)
      const o = {
        'M+': d.getMonth() + 1,
        'd+': d.getDate(),
        'h+': d.getHours(),
        'm+': d.getMinutes(),
        's+': d.getSeconds(),
        'q+': Math.floor((d.getMonth() + 3) / 3),
        'S': d.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    getTaskComment(row, expandedRows) {
      if (!row.expend) {
        row.expend = true
        row.loadComment = true
        this.$axios.get('/tasks/' + row.id + '/comments').then((res) => {
          console.log(res.data)
          if (res.data.status) {
            row.comments = res.data.data
          } else {
            row.comments = []
          }
          row.loadComment = false
        }).catch((err) => {
          row.loadComment = false
          if (err) {
            console.log(err)
          }
          row.comments = []
        })
      } else {
        row.expend = false
      }
    },
    radioChanged(newLabel) {
      this.tableLoading = true
      this.$axios.get(this.prefix + '/tasks' + (newLabel ? '?state=' + newLabel : '')).then((res) => {
        this.tableData = res.data.data
        this.tableLoading = false
      })
    },
    log(userId) {
      console.log(userId)
    },
    getTasks() {
      this.quering = true
      const name = !this.filters.name ? '' : ('/' + this.filters.name)
      this.$axios.get('/tasks' + name)
        .then((res) => {
          this.quering = false
          if (res.data.status) {
            const data = res.data.data
            if (data instanceof Array) {
              this.tableData = res.data.data
            } else {
              this.tableData = [data]
            }
            this.radio = null
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
    view(row) {
      if (row.kind === 'questionnaire') {
        this.$router.push('/tms/details?taskId=' + row.id)
      } else {
        this.$message({
          type: 'error',
          message: '暂时仅支持查看问卷'
        })
      }
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
</style>
