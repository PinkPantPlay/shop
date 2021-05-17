<template>
  <div id="addradd">
    <!-- 头部 -->
    <van-nav-bar
      title="编辑收货地址"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="back"
    />

    <van-address-edit
      :area-list="areaList"
      :address-info="AddrInfo"
      show-set-default
      show-delete
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import {Toast} from 'vant'
export default {
  name: 'AddressEdit',
  created () {
    var addrid = this.$route.params.addrid ? this.$route.params.addrid : 0

    // 没有当前的收货地址ID
    if (!addrid) {
      this.$notify({ type: 'warning', message: '请重新选择收货地址ID'})

      // 返回上一个界面重新选择收货地址
      this.$router.go(-1)

      return false
    }

    this.addrinfo(addrid)
  },
  data () {
    return {
      areaList,
      AddrInfo: {
        id: 0,
        name: this.$cookies.get('user').nickname,
        tel: this.$cookies.get('user').phone
      }
    }
  },
  methods: {
    // 获取当前的收货地址信息
    async addrinfo (addrid) {
      // 组装数据
      var data = {
        userid: this.$cookies.get('user').id,
        addrid: addrid
      }

      var result = await this.$proxy.addrinfo(data)

      if (result.code) {
        var back = result.data

        var AddressInfo = {
          id: back.id,
          name: back.consignee,
          tel: back.mobile,
          province: back.province.name,
          city: back.city.name,
          county: back.district.name,
          areaCode: back.district.code,
          addressDetail: back.address,
          isDefault: back.status === '1'
        }

        this.AddrInfo = AddressInfo
      } else {
        this.$notify({ type: 'warning', message: result.msg})

        // 当差不多这个收货地址的时候 就让他返回上一层界面
        this.$router.go(-1)

        return false
      }
    },
    back () {
      this.$router.go(-1)
      return false
    },
    async onSave (content) {
      // 组装数据
      var data = {
        areaCode: content.areaCode,
        addressDetail: content.addressDetail,
        isDefault: content.isDefault,
        name: content.name,
        tel: content.tel,
        userid: this.$cookies.get('user').id,
        addrid: this.AddrInfo.id
      }

      // 发送请求
      var result = await this.$proxy.addredit(data)

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
    async onDelete () {
      // 组装数据
      var data = {
        userid: this.$cookies.get('user').id,
        addrid: this.AddrInfo.id
      }

      // 发送请求
      var result = await this.$proxy.addrdel(data)

      if (result.code == 1) {
        // 请求成功
        // this.$notify({ type: 'success', message: result.msg})
        Toast('删除成功')
        // 跳转路由
        return this.$router.go(-1)
      } else {
        // 失败
        // this.$notify({ type: 'warning', message: result.msg})
        Toast('删除失败')
        return false
      }
      // Toast('delete')
    }
  }
}
</script>
