<template>
  <el-form
    :model="loginForm"
    status-icon
    :rules="rules"
    ref="loginForm"
    class="login-container"
  >
    <h3 class="title">MoneyDodo 管理员登录系统</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="submitForm"
        :loading="loading"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    var isValidate = (rule, value, callback) => {
      if (!rule.regx.test(value)) {
        callback(new Error(rule.message));
      } else {
        callback();
      }
    };
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
            trigger: "blur",
            message: "18位英文字母、数字或下划线，必须以英文字母开头",
            regx: /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/
          }
        ],
        password: [
          {
            validator: isValidate,
            trigger: "blur",
            message: "密码不正确",
            regx: /^[a-zA-Z0-9_\-]{6,12}$/
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.loading = true;
      this.$refs.loginForm.validate((valid, object) => {
        if (valid) {
          this.loading = false;
          this.$root.user = this.loginForm.username;
          this.$router.replace('/home');
        } else {
          this.loading = false;
          this.$message({
            type: "error",
            message: "用户名或密码错误"
          });
        }
      });
    },
    resetForm() {
      this.$refs.loginForm.resetFields();
    }
  }
};
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