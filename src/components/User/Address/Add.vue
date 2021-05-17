<template>
  <div id="addradd">
    <!-- 头部 -->
    <van-nav-bar
      title="新增收货地址"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="back"
    />

    <van-address-edit
      :area-list="areaList"
      :address-info="AddrInfo"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
export default {
  name: 'AddressAdd',
  data () {
    return {
      areaList,
      AddrInfo: {
        name: this.$cookies.get('user').nickname,
        tel: this.$cookies.get('user').phone
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
      return false
    },
    async onSave (content) {
      console.log(content)

      // 组装数据
      var data = {
        areaCode: content.areaCode,
        addressDetail: content.addressDetail,
        isDefault: content.isDefault,
        name: content.name,
        tel: content.tel,
        id: this.$cookies.get('user').id
      }

      // 发送请求
      var result = await this.$proxy.addradd(data)

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
    },
    onDelete () {
      Toast('delete')
    }
  }
}
</script>
