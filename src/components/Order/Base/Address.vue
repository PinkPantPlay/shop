<template>
  <div id="address">
    <!-- 头部 -->
    <van-nav-bar
      title="请选择收货地址"
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
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  name: 'OrderAddress',
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
        this.$notify({ type: 'warning', message: result.msg})
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
    // 选择收货地址
    async onSelect (item, index) {
      // 收货地址的ID
      var addrid = item.id

      // 将选择的收货地址ID 保存到cookie里面去
      this.$cookies.set('addrid', addrid)

      // 返回上一个界面
      this.$router.go(-1)
      return false
    }
  }
}
</script>

<style scope>
  .van-address-item__edit{
    display:none;
  }
</style>
