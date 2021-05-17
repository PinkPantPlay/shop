<template>
  <div id="addradd">
    <!-- 头部 -->
    <van-nav-bar
      title="添加充值记录"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="back"
    />

    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <!-- 数字键盘 -->
      <van-field
        label="充值金额￥"
        name="price"
        placeholder="请输入充值金额"
        :rules="[{ required: true, message: '请输入充值金额' }]"
        readonly
        clickable
        :value="pay.price"
        @touchstart.native.stop="show = true"
      />

      <van-number-keyboard
        v-model="pay.price"
        :show="show"
        :maxlength="15"
        @blur="show = false"
        theme="custom"
        extra-key="."
        close-button-text="完成"
      />

      <!-- 充值备注 -->
      <van-field
        v-model="pay.content"
        name="content"
        rows="2"
        autosize
        label="添加备注"
        type="textarea"
        maxlength="100"
        placeholder="请输入备注"
        :rules="[{ required: true, message: '请输入备注' }]"
        show-word-limit
      />

      <!-- 截图凭证 -->
      <van-field name="thumbs" label="截图凭证">
        <template #input>
          <van-uploader v-model="uploader" :max-count="4" multiple />
        </template>
      </van-field>

      <div class="btn">
        <van-button block type="info" native-type="submit">
          提交充值记录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
export default {
  name: 'PayAdd',
  data () {
    return {
      pay: {
        content: '',
        price: ''
      },
      uploader: [],
      show: false
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
      return false
    },
    async onSubmit (values) {
      // 创建表单数据对象
      var data = new FormData()

      data.append('userid', this.$cookies.get('user').id)
      data.append('price', values.price)
      data.append('content', values.content)

      // 循环处理所选择的图片
      for (var i = 0; i < values.thumbs.length; i++) {
        // data.append(`thumb${i+1}`,values.thumbs[i].file)
        data.append(`thumbs[]`, values.thumbs[i].file)
      }
      // 发送请求
      var result = await this.$proxy.payadd(data)

      if (result.code == 1) {
        // 请求成功
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

<style scope>
.van-form{
  height: 91.6vh;
}
</style>
