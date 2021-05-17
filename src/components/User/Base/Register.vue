<template>
  <div class="limiter">
      <div class="container-login100" style="background-image: url('/static/images/img-01.jpg');">
          <div class="wrap-login100 p-t-190 p-b-30">
              <form @submit.prevent="register" class="login100-form validate-form">
                  <!--头像-->
                  <div class="login100-form-avatar">
                      <img src="/static/images/avatar-01.jpg" alt="AVATAR">
                  </div>

                  <!--手机号码-->
                  <div class="wrap-input100 validate-input m-b-10">
                      <input class="input100" type="text" v-model="user.phone" placeholder="请输入手机号码" required>
                      <span class="focus-input100"></span>
                      <span class="symbol-input100">
                          <i class="fa fa-user"></i>
                      </span>
                  </div>

                  <!--密码-->
                  <div class="wrap-input100 validate-input m-b-10">
                      <input class="input100" type="password" v-model="user.password" placeholder="请输入密码" required>
                      <span class="focus-input100"></span>
                      <span class="symbol-input100">
                          <i class="fa fa-lock"></i>
                      </span>
                  </div>

                  <!--确认密码-->
                  <div class="wrap-input100 validate-input m-b-10">
                      <input class="input100" type="password" v-model="user.repass" placeholder="请输入确认密码" required>
                      <span class="focus-input100"></span>
                      <span class="symbol-input100">
                          <i class="fa fa-lock"></i>
                      </span>
                  </div>

                  <div class="container-login100-form-btn p-t-10">
                      <button class="login100-form-btn">
                        注 册
                      </button>
                  </div>

                  <div class="text-center w-full p-t-25 p-b-230">
                      <router-link to="/user/base/login" class="txt1">立即登录</router-link>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'BaseRegister',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async register () {
      // 手机号码验证
      let phone = this.user.phone
      let phoneReg = /^1[3-9]{1}[0-9]{9}$/

      if (!phoneReg.test(phone)) {
        this.$notify({ type: 'warning', message: '手机号码输入有误，请重新填写' })
        return false
      }

      // 密码 最少6位，包括至少1个大写字母，1个小写字母，1个数字
      var password = this.user.password
      var passReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/

      if (!passReg.test(password)) {
        this.$notify({ type: 'warning', message: '密码 最少6位，包括至少1个大写字母，1个小写字母，1个数字' })
        return false
      }

      // 密码和确认密码
      var repass = this.user.repass

      if (password != repass) {
        this.$notify({ type: 'warning', message: '密码和确认密码不一致，请重新输入' })
        return false
      }

      let data = {
        phone: this.user.phone,
        password: this.user.password
      }

      // 发送请求 同步
      let result = await this.$proxy.register(data)

      if (result.code == 1) {
        // 成功,返回到登录界面
        this.$notify({ type: 'success', message: result.msg})

        // 在1秒后跳转到登录界面
        setTimeout(() => {
          // 跳转路由
          return this.$router.push('/user/base/login')
        }, 1000)
      } else {
        // 失败
        this.$notify({ type: 'warning', message: result.msg})
        return false
      }
    }
  }
}
</script>

<style scope>
  @import '../../../../static/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
  @import '../../../../static/css/loginutil.css';
  @import '../../../../static/css/login.css';
</style>
