<template>
  <el-container class="match-parent">
    <el-aside
      class="match-parent"
      width="auto"
    >
      <el-menu
        :default-active="this.$route.path.split('?')[1] || this.$route.path.split('?')[0]"
        class="el-menu-vertical-demo match-parent"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        @open="handleOpen"
        @close="handleClose"
      >
        <div
          class="logo header title"
          @click="backHome"
        >
          <i class="el-icon-s-home" />
          {{ isCollapse ? '' : 'MoneyDodo 管理员系统' }}
        </div>
        <el-submenu index="/ums">
          <template slot="title">
            <i class="el-icon-location" />
            <span>用户管理系统</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/ums/view">
              查看
            </el-menu-item>
            <el-menu-item index="/ums/check">
              认证审核
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/dms">
          <template slot="title">
            <i class="el-icon-location" />
            <span>交易管理系统</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/dms/view">
              查看
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/tms">
          <template slot="title">
            <i class="el-icon-document" />
            <span>任务系统</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/tms/view">
              查看
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/cms">
          <template slot="title">
            <i class="el-icon-location" />
            <span>充值系统</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/cms/view">
              查看
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/rms">
          <template slot="title">
            <i class="el-icon-location" />
            <span>商家任务审核系统</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/rms/view">
              查看
            </el-menu-item>
            <!-- <el-menu-item index="/rms/check">
              审核
            </el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-col
          :span="24"
          class="header"
        >
          <el-col :span="12">
            <i
              class="el-icon-menu tools"
              @click.prevent="collapse"
            />
          </el-col>
          <el-col
            :span="12"
            class="userinfo"
          >
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link userinfo-inner">
                <img :src="sysUserAvatar">
                {{ sysUserName }}
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  我的消息
                </el-dropdown-item>
                <el-dropdown-item>
                  设置
                </el-dropdown-item>
                <el-dropdown-item
                  divided
                  @click.native="logout"
                >
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-col>
      </el-header>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      columns: {
        left: 8,
        middle: 8,
        right: 8
      },
      isCollapse: false,
      sysUserName: '',
      sysUserAvatar: '/user.png',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  mounted() {
    this.sysUserName = sessionStorage.getItem('username') || ''
  },
  methods: {
    backHome() {
      this.$router.push('/home')
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleselect(a, b) { },
    // 退出登录
    logout() {
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$axios.get('/auth/logout').then((res) => {
            console.log(res)
            if (res.data.state) {
              this.$store.commit('removeToken')
              this.$router.replace('/')
            }
          })
        })
        .catch(() => { })
    },
    // 折叠导航栏
    collapse() {
      this.isCollapse = !this.isCollapse
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        'submenu-hook-' + i
      )[0].style.display = status ? 'block' : 'none'
    }
  }
}
</script>

<style scoped>
.header {
  height: 60px;
  background: #20a0ff;
  line-height: 60px;
  color: #fff;
}
.header .userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
}
.header .userinfo .userinfo-inner {
  cursor: pointer;
  color: #fff;
}
.header .userinfo .userinfo-inner img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;
}
.logo {
  height: 60px;
  font-size: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-color: rgba(238, 241, 146, 0.3);
  border-right-width: 1px;
  border-right-style: solid;
}
.header img {
  width: 40px;
  float: left;
  margin: 10px 10px 10px 18px;
}
.header .tools {
  padding: 0px 23px;
  width: 14px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}
.el-header,
.el-footer {
  line-height: 60px;
  padding: 0px;
}
.el-header {
  font-size: xx-large;
}

.el-aside {
  line-height: 60px;
}

.el-dropdown {
  vertical-align: bottom;
}
</style>
