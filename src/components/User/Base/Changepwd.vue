<template>
  <div id="changepwd">
    <!-- 头部 -->
    <van-nav-bar
      title="修改密码"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="back"
    />

    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <!-- 原密码 -->
      <van-field
        v-model="user.oldPassword"
        type="password"
        name="原密码"
        label="原密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <!--新密码-->
      <van-field
        v-model="user.password"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="新密码"
        :rules="[{ pattern: PassReg, required: true, message: '密码必须由6-12位英文和数字组成' }]"
      />
      <!--重复密码-->
      <van-field
        v-model="user.repassword"
        type="password"
        name="重复密码"
        label="重复密码"
        placeholder="重复密码"
        :rules="[{ validator, required: true, message: '两次输入密码不一致' }]"
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
  name: 'BaseChangepwd',
  data () {
    return {
      user: this.$cookies.get('user'),
      PassReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
    }
  },
  methods: {
    validator (val) {
      if (this.user.password !== val) {
        return false
      }
    },
    back () {
      this.$router.go(-1)
      return false
    },
    async onSubmit (values) {
      // 组装数据
      let data = {
        oldpwd: this.user.oldPassword,
        password: this.user.password,
        id: this.user.id
      }

      // 发送请求
      var result = await this.$proxy.changepwd(data)

      if (result.code == 1) {
        // 成功
        this.$notify({ type: 'success', message: result.msg})

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
  #changepwd{
    height:91vh;
  }

  .van-form{
    height:100%;
    position: relative;
  }

  .btn{
    position: absolute;
    bottom:-2.3%;
    left:0;
    width:100%;
  }
</style>
