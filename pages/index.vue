<template>
  <el-form
    ref="loginForm"
    :model="loginForm"
    :rules="rules"
    status-icon
    class="login-container"
  >
    <h3 class="title">
      MoneyDodo 管理员登录系统
    </h3>
    <el-form-item prop="name">
      <el-input
        v-model="loginForm.name"
        type="text"
        auto-complete="off"
        placeholder="账号"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        auto-complete="off"
        placeholder="密码"
      />
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        :loading="loading"
        @click.native.prevent="submitForm"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    const isValidate = (rule, value, callback) => {
      if (!rule.regx.test(value)) {
        callback(new Error(rule.message))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      loginForm: {
        name: null,
        password: null
      },
      rules: {
        name: [
          {
            validator: isValidate,
            trigger: 'blur',
            message: '18位英文字母、数字或下划线，必须以英文字母开头',
            regx: /^[a-zA-Z][a-zA-Z0-9_]{4,17}$/
          }
        ],
        password: [
          {
            validator: isValidate,
            trigger: 'blur',
            message: '密码不正确',
            regx: /^[a-zA-Z0-9_-]{5,12}$/
          }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.loading = true
      this.$refs.loginForm.validate((valid, object) => {
        if (valid) {
          this.$axios.post('/auth/admin', this.loginForm)
            .then((res) => {
              res = res.data
              if (res.status) {
                this.$store.commit('setToken', res.data)
                this.$store.commit('setUser', this.loginForm.name)
                this.$message({
                  type: 'sucess',
                  message: '登陆成功'
                })
                if (this.$route.query.redirect) {
                  this.$router.replace(this.$route.query.redirect)
                } else {
                  this.$router.replace('/ums/check')
                }
              } else {
                this.$message({
                  type: 'error',
                  message: res.errinfo
                })
              }
              this.loading = false
            })
            .catch((err) => {
              this.loading = false
              this.$message({
                type: 'error',
                message: err.message
              })
            })
        } else {
          this.loading = false
          this.$message({
            type: 'error',
            message: '用户名或密码错误'
          })
        }
      })
    },
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 460px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
</style>
