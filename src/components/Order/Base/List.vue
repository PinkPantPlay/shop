<template>
  <div id="orderlist">
    <!-- 头部 -->
    <van-nav-bar
      title="订单列表"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="back"
    />
    <van-tabs v-model="active" @click="onClick">
      <van-tab title="待支付">
        <!-- 订单列表 -->
        <div class="orderlist">
          <van-swipe-cell v-for="(item, index) in orderdata" :key="index" class="box">
            <router-link :to="'detail/'+item.id">
            <div class="item">
              <div class="orderitem">
                <van-image
                  width="10em"
                  height="100%"
                  class="cover"
                  :src="item.img"
                />

                <div class="info">
                  <div class="name">商品总数：{{item.count}}</div>
                  <div class="price">订单总价: ¥{{item.total}}</div>
                  <div class="code">订单号: {{item.code}}</div>
                </div>
              </div>
            </div>
            </router-link>
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="delorder(item, index)" />
            </template>
          </van-swipe-cell>
        </div>
      </van-tab>
      <van-tab title="待发货">
        <!-- 订单列表 -->
        <div class="orderlist">
          <van-swipe-cell v-for="(item, index) in orderdata" :key="index" class="box">
            <router-link :to="'detail/'+item.id">
              <div class="item">
                <div class="orderitem">
                  <van-image
                    width="10em"
                    height="100%"
                    class="cover"
                    :src="item.img"
                  />

                  <div class="info">
                    <div class="name">商品总数：{{item.count}}</div>
                    <div class="price">订单总价: ¥{{item.total}}</div>
                    <div class="code">订单号: {{item.code}}</div>
                  </div>
                </div>
              </div>
            </router-link>
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="delorder(item, index)" />
            </template>
          </van-swipe-cell>
        </div>
      </van-tab>
      <van-tab title="待收货">
        <!-- 订单列表 -->
        <div class="orderlist">
          <van-swipe-cell v-for="(item, index) in orderdata" :key="index" class="box">
            <router-link :to="'detail/'+item.id">
              <div class="item">
                <div class="orderitem">
                  <van-image
                    width="10em"
                    height="100%"
                    class="cover"
                    :src="item.img"
                  />

                  <div class="info">
                    <div class="name">商品总数：{{item.count}}</div>
                    <div class="price">订单总价: ¥{{item.total}}</div>
                    <div class="code">订单号: {{item.code}}</div>
                  </div>
                </div>
              </div>
            </router-link>

            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="delorder(item, index)" />
            </template>
          </van-swipe-cell>
        </div>
      </van-tab>
      <van-tab title="待评价">
        <!-- 订单列表 -->
        <div class="orderlist">
          <van-swipe-cell v-for="(item, index) in orderdata" :key="index" class="box">
            <router-link :to="'detail/'+item.id">
              <div class="item">
                <div class="orderitem">
                  <van-image
                    width="10em"
                    height="100%"
                    class="cover"
                    :src="item.img"
                  />

                  <div class="info">
                    <div class="name">商品总数：{{item.count}}</div>
                    <div class="price">订单总价: ¥{{item.total}}</div>
                    <div class="code">订单号: {{item.code}}</div>
                  </div>
                </div>
              </div>
            </router-link>

            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="delorder(item, index)" />
            </template>
          </van-swipe-cell>
        </div>
      </van-tab>
      <van-tab title="售后">
        <!-- 订单列表 -->
        <div class="orderlist">
            <van-swipe-cell v-for="(item, index) in orderdata" :key="index" class="box">
              <router-link :to="'detail/'+item.id">
                <div class="item">
                  <div class="orderitem">
                    <van-image
                      width="10em"
                      height="100%"
                      class="cover"
                      :src="item.img"
                    />

                    <div class="info">
                      <div class="name">商品总数：{{item.count}}</div>
                      <div class="price">订单总价: ¥{{item.total}}</div>
                      <div class="code">订单号: {{item.code}}</div>
                    </div>
                  </div>
                </div>
              </router-link>

              <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="delorder(item, index)" />
              </template>
            </van-swipe-cell>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'List',
  created () {
    // 查询订单
    this.onClick()
  },
  data () {
    return {
      active: 0,
      user: this.$cookies.get('user'),
      orderdata: [],
      ordersid: []
    }
  },
  methods: {
    // 查询待支付订单列表
    async onClick () {
      this.orderdata = []
      let i
      if (this.active === 4) {
        i = -1
      } else {
        i = this.active
      }
      var data = {
        userid: this.user.id,
        status: i
      }

      // 发送请求
      var result = await this.$proxy.orderList(data)

      if (result.code === 1) {
        // 请求成功
        this.orderdata = result.data
      } else {
        this.$toast('暂无此状态的订单')
        return false
      }
    },
    back () {
      this.$router.go(-1)
      return false
    },
    // 删除订单记录
    delorder (order, index) {
      this.$dialog.confirm({
        title: '是否确认删除订单记录'
      }).then(async () => {
        // 组装数据
        var data = {
          ordersid: order.id,
          userid: order.userid
        }

        var result = await this.$proxy.orderDel(data)

        if (result.code == 1) {
          // 删除成功
          this.$toast(result.msg)
          // 数组的删除
          this.orderdata.splice(index, 1)
        } else {
          // 删除失败
          this.$toast(result.msg)
          return false
        }
      }).catch(() => {
        // 取消
      })
    }
  }
}
</script>

<style scoped>
  .orderlist{
    width:100%;
  }

  .orderlist .box{
    width:100%;
    border-bottom: 1px solid #e1e1e1;
  }

  .orderlist .box .item{
    width:100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding:1em 0em;
  }

  .orderlist .box .item .check{
    margin:0em 1em;
  }

  .orderlist .box .item .orderitem{
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  .orderlist .box .item .orderitem .cover{
    width:10em;
    border-radius: 10px;
    overflow: hidden;
    margin-right:1em;
  }

  .orderlist .box .item .orderitem .info{
    display: flex;
    align-content: space-between;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .orderlist .box .item .orderitem .info .name{
    width:53%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.4em;
  }

  .orderlist .box .item .orderitem .info .price{
    width:100%;
    color:red;
    font-size:1.2em;
  }
  .orderlist .box .item .orderitem .info .code{
    width:100%;
    font-size:1.2em;
  }

  .orderlist .box .item .orderitem .info .select{
    display: flex;
    align-items: center;
    justify-content:space-between;
    width:35%;
  }

  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
</style>
