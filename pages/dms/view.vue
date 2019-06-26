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
            placeholder="id"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="quering"
            @click="getDeal"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-radio-group
      v-model="radio"
      @change="radioChanged"
    >
      <el-radio :label="null">
        全部
      </el-radio>
      <el-radio :label="'underway'">
        正在进行中
      </el-radio>
      <el-radio :label="'closure'">
        已完成
      </el-radio>
    </el-radio-group>
    <el-table
      ref="multipleTable"
      v-loading.body.lock="tableLoading"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      lazy
      :data="tableData"
    >
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
        prop="publisher"
        label="发布者 "
        align="center"
      />
      <el-table-column
        label="发布时间"
        align="center"
      >
        <template slot-scope="scope">
          <span>
            {{ formatDate(scope.row.since, 'yyyy-MM-dd hh:mm:ss') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="reward"
        label="reward"
        align="center"
      />
      <el-table-column
        prop="recipient"
        label="接收者"
        align="center"
      />
      <el-table-column
        label="截止时间"
        align="center"
      >
        <template slot-scope="scope">
          <span>
            {{ formatDate(scope.row.until, 'yyyy-MM-dd hh:mm:ss') }}
          </span>
        </template>
      </el-table-column>
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
        'underway': 'success',
        'closure': 'danger'
      }
    }
  },
  asyncData({ $axios, params, route }) {
    const prefix = route.query.userId ? '/users/' + route.query.userId : ''
    return $axios.get(prefix + '/deals').then((res) => {
      console.log(res.data)
      return {
        tableData: res.data.data,
        prefix: prefix
      }
    })
  },
  methods: {
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
    radioChanged(newLabel) {
      this.tableLoading = true
      this.$axios.get(this.prefix + '/deals' + (newLabel ? '?state=' + newLabel : '')).then((res) => {
        this.tableData = res.data.data
        this.tableLoading = false
      })
    },
    log(userId) {
      console.log(userId)
    },
    getDeal() {
      this.quering = true
      const name = !this.filters.name ? '' : ('/' + this.filters.name)
      this.$axios.get('/deals' + name)
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
