<template>
  <div id="address">
    <!-- 头部 -->
    <van-nav-bar
      title="充值记录"
      left-text="返回"
      right-text="添加充值记录"
      left-arrow
      @click-left="back"
      @click-right="add"
    >
      <template #right>
        <van-icon name="add-o" size="25" />
      </template>
    </van-nav-bar>

    <van-swipe-cell v-for="(item,key) in datalist" :key="key">
      <van-panel @click="info" :title="item | pay" :status="item | status"></van-panel>

      <template #right>
        <van-button @click="del" square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>

  </div>
</template>

<script>
export default {
  name: 'PayIndex',
  created () // 创建前的钩子函数
  {
    // 调用方法：查询充值记录列表
    this.paylist()
  },
  data () {
    return {
      chosenAddressId: '1',
      datalist: []
    }
  },
  filters: {
    pay (value) {
      return `金额：${value.price}`
    },
    status (value) {
      switch (value.status) {
        case '0':
          return '未审核'
        case '1':
          return '已通过'
        case '-1':
          return '审核未通过'
        default:
          return '未知状态'
      }
    }
  },
  methods: {
    async paylist () {
      // 组装数据
      let data = {
        userid: this.$cookies.get('user').id
      }

      // 发送请求
      var result = await this.$proxy.paylist(data)

      if (result.code) {
        this.datalist = result.data
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
    add () {
      this.$router.push('/user/pay/add')
    },
    del () {
      this.$dialog.confirm({
        title: '是否确认删除充值记录'
      }).then(() => {
        // 删除记录
        console.log('删除记录')
        return false
      }).catch(() => {
        // 取消
      })
    },
    info () {
      console.log(123123123)
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
