<template>
  <div id="address">
    <!-- 头部 -->
    <van-nav-bar
      title="收货地址列表"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="back"
    />

    <!-- 列表 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="datalist"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  name: 'AddressIndex',
  created () // 创建前的钩子函数
  {
    // 调用方法：查询收货地址列表
    this.addrlist()
  },
  data () {
    return {
      chosenAddressId: '1',
      datalist: []
    }
  },
  methods: {
    async addrlist () {
      // 组装数据
      let data = {
        id: this.$cookies.get('user').id
      }

      // 发送请求
      var result = await this.$proxy.addrlist(data)

      if (result.code) {
        // 请求成功
        //  {
        //   id: '1',
        //   name: '张三',
        //   tel: '13000000000',
        //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        //   isDefault: true,
        // },

        var datalist = []

        // 循环
        for (var item of result.data) {
          // 找出默认的收货地址
          if (item.status === '1') {
            this.chosenAddressId = item.id
          }

          datalist.push({
            id: item.id,
            name: item.consignee,
            tel: item.mobile,
            address: item.address,
            isDefault: item.status === '1'
          })
        }

        // 赋值修改data里面的数据
        this.datalist = datalist
      } else {
        // 失败
        this.$notify({type: 'warning', message: result.msg})
        return false
      }
    },
    back () {
      this.$router.go(-1)
      return false
    },
    onAdd () {
      // 跳转到新增地址的界面
      this.$router.push('/user/address/add')
    },
    // 跳转编辑界面
    onEdit (item, index) {
      // 收货地址ID
      var addrid = item.id

      // 跳转路由并且传参
      this.$router.push({name: 'AddressEdit', params: {addrid: addrid}})
      return false
    },
    // 切换选择默认收货地址
    async onSelect (item, index) {
      // 组装数据
      var data = {
        userid: this.$cookies.get('user').id,
        addrid: item.id
      }

      var result = await this.$proxy.addrset(data)

      if (result.code) {
        // 设置默认地址成功
        this.chosenAddressId = item.id

        var datalist = this.datalist

        for (var value of datalist) {
          value.isDefault = false
        }

        this.datalist = datalist
        this.datalist[index].isDefault = true
      } else {
        this.$notify({ type: 'warning', message: result.msg})
        return false
      }
    }
  }
}
</script>
