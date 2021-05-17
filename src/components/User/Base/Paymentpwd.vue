<template>
  <div id="paymentpwd">
    <!-- 头部 -->
    <van-nav-bar
      title="修改支付密码"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="back"
    />

    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <!-- 原密码 -->
      <van-password-input
        :value="user.oldpwd"
        info="请输入原支付密码"
        :error-info="errorInfo"
        :focused="showKeyboard1"
        :blur="showKeyboard1"
        @focus="showKeyboard1 = true"
        @blur="showKeyboard1 = false"
      />
      <van-number-keyboard
        v-model="user.oldpwd"
        :show="showKeyboard1"
        @blur="showKeyboard1 = false"
      />
      <!--新密码-->
      <van-password-input
        :value="user.paypass"
        info="请输入新支付密码"
        :error-info="errorInfo1"
        :focused="showKeyboard2"
        :blur="showKeyboard2"
        @focus="showKeyboard2 = true"
        @blur="showKeyboard2 = false"
      />
      <van-number-keyboard
        v-model="user.paypass"
        :show="showKeyboard2"
        @blur="showKeyboard2 = false"
      />
      <!--重复密码-->
      <van-password-input
        :value="user.repass"
        info="请重复新支付密码"
        :error-info="errorInfo2"
        :focused="showKeyboard3"
        :blur="showKeyboard3"
        @focus="showKeyboard3 = true"
        @blur="showKeyboard3 = false"
      />
      <van-number-keyboard
        v-model="user.repass"
        :show="showKeyboard3"
        @blur="showKeyboard3 = false"
      />

      <div class="btn">
        <van-button block type="info" native-type="submit">
          确认修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'Paymentpwd',
  data () {
    return {
      user: this.$cookies.get('user'),
      errorInfo: '',
      errorInfo1: '',
      errorInfo2: '',
      showKeyboard1: false,
      showKeyboard2: false,
      showKeyboard3: false
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
      return false
    },
    async onSubmit (values) {
      if (this.user.paypass.length !== 6) {
        this.errorInfo1 = '支付密码必须为6位数字'
        // console.log(this.errorInfo1)
        return false
      }
      if (this.user.paypass !== this.repass) {
        this.errorInfo2 = '两次输入的支付密码不一致'
        return false
      }
      // 组装数据
      let data = {
        oldpwd: this.user.oldpwd,
        paypass: this.user.paypass,
        id: this.user.id
      }

      // 发送请求
      var result = await this.$proxy.paymentpwd(data)

      if (result.code == 1) {
        // 成功
        this.$notify({type: 'success', message: result.msg})

        // 跳转路由
        return this.$router.go(-1)
      } else {
        // 失败
        this.$notify({ type: 'warning', message: result.msg})
        return false
      }
    }
  }
}
</script>

<style scoped>
  #paymentpwd{
    height:91vh;
  }

  .van-form{
    margin-top: 1em;
    height:100%;
    position: relative;
  }

  .van-password-input__error-info, .van-password-input__info{
    margin-top: 0;
    margin-bottom: 1em;
  }

  .btn{
    position: absolute;
    bottom:-1.1%;
    left:0;
    width:100%;
  }
</style>
