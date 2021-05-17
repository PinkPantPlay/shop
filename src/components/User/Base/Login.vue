<template>
  <div class="limiter">
      <div class="container-login100" style="background-image: url('/static/images/img-01.jpg');">
          <div class="wrap-login100 p-t-190 p-b-30">
              <form @submit.prevent="login" class="login100-form validate-form">
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

                  <div class="container-login100-form-btn p-t-10">
                      <button class="login100-form-btn">登 录</button>
                  </div>

                  <div class="text-center w-full p-t-25 p-b-230">
                      <router-link to="/user/base/register" class="txt1">立即注册</router-link>
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
      user: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      // 手机号码验证
      let phone = this.user.phone
      let phoneReg = /^1[3-9]{1}[0-9]{9}$/

      if (!phoneReg.test(phone)) {
        this.$notify({ type: 'warning', message: '手机号码输入有误，请重新填写' })
        return false
      }

      let data = {
        phone: this.user.phone,
        password: this.user.password
      }

      // 发送请求
      let result = await this.$proxy.login(data)

      if (result.code == 1) {
        // 登录成功 返回会员中心界面
        this.$notify({ type: 'success', message: result.msg})

        // 将js的对象转化为json数据
        var content = JSON.stringify(result.data)

        // 将用户信息保存到cookie中
        this.$cookies.set('user', content)

        // 在1秒后跳转到会员中心
        setTimeout(() => {
          // 跳转路由
          return this.$router.push('/user/base/index')
        }, 1000)
      } else {
        // 登录失败
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
