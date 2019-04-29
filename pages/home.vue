<template>
  <div>
    Hello world
  </div>
</template>

<script>
export default {
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
      checked: true,
      loginForm: {
        username: null,
        password: null
      },
      rules: {
        username: [
          {
            validator: isValidate,
            trigger: 'blur',
            message: '18位英文字母、数字或下划线，必须以英文字母开头',
            regx: /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/
          }
        ],
        password: [
          {
            validator: isValidate,
            trigger: 'blur',
            message: '密码不正确',
            regx: /^[a-zA-Z0-9_-]{6,12}$/
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
          this.loading = false
          this.$root.user = this.loginForm.username
          this.$router.replace('/')
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
