<template>
  <div id="profile">
      <!-- 头部 -->
      <van-nav-bar
        title="基本资料"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="back"
      />

      <!-- 表单 -->
      <van-form @submit="onSubmit">
        <!-- 昵称 -->
        <van-field
          v-model="user.nickname"
          name="nickname"
          label="昵称"
          placeholder="请填写昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />

        <!-- 手机号码 -->
        <van-field
          v-model="user.phone"
          name="phone"
          label="手机号码"
          placeholder="请填写手机号码"
          :rules="[{pattern:PhoneReg, required: true, message: '请按照规则填写手机号' }]"
        />

        <!-- 性别 -->
        <van-field name="gender" label="性别">
          <template #input>
            <van-radio-group v-model="user.gender" direction="horizontal">
              <van-radio name="0">保密</van-radio>
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <!-- 头像上传 -->
        <van-field name="avatar" label="头像上传">
          <template #input>
            <van-uploader v-model="uploader" :max-count="1" />
          </template>
        </van-field>

        <div class="btn">
          <van-button block type="info" native-type="submit">
            提交资料
          </van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
export default {
  name: 'BaseProfile',
  data () {
    return {
      user: this.$cookies.get('user'),
      PhoneReg: /^1[3-9]{1}[0-9]{9}$/,
      uploader: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
      return false
    },
    async onSubmit (values) {
      // 组装数据
      var data = new FormData()
      data.append('nickname', this.user.nickname)
      data.append('phone', this.user.phone)
      data.append('gender', this.user.gender)
      data.append('id', this.user.id)
      data.append(`avatar[]`, values.avatar[0].file)
      // 发送请求
      var result = await this.$proxy.profile(data)

      if (result.code == 1) {
        // 将js的对象转化为json数据
        var content = JSON.stringify(result.data)

        // 将用户信息保存到cookie中
        this.$cookies.set('user', content)

        // 成功
        this.$notify({type: 'success', message: result.msg})

        // 跳转路由
        return this.$router.go(-1)
      } else {
        // 失败
        this.$notify({type: 'warning', message: result.msg})
        return false
      }
    }
  }
}
</script>

<style scope>
  #profile{
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
