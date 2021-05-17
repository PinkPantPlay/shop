<template>
  <div id="user">
    <div class="myBox">
      <!-- 头像 -->
      <div class="L">
        <img :src="user.avatar ? 'http://www.backend.com/'+user.avatar : '/static/images/01.jpg'" />
      </div>

      <!-- 个人信息 -->
      <div class="C">
        <div class="tit">{{user.nickname ? user.nickname : '请设置您的昵称'}}</div>
        <div class="sub">{{user.phone | hide(3,8)}}</div>
      </div>

      <div class="R">
        <img src="/static/images/go.png" />
      </div>
    </div>

    <div class="clear"></div>
    <div class="allkbox"></div>

    <!-- 基本资料 -->
    <div class="myboxcon">
      <router-link to="/user/base/profile">
        <p>基本资料</p>
        <img src="/static/images/go.png">
      </router-link>
    </div>

    <!-- 修改密码 -->
    <div class="myboxcon">
      <router-link to="/user/base/changepwd">
        <p>修改密码</p>
        <img src="/static/images/go.png">
      </router-link>
    </div>

    <!-- 修改支付密码 -->
    <div class="myboxcon">
      <router-link to="/user/base/paymentpwd">
        <p>修改支付密码</p>
        <img src="/static/images/go.png">
      </router-link>
    </div>

    <!-- 收货地址 -->
    <div class="myboxcon">
      <router-link to="/user/address/index">
        <p>收货地址</p>
        <img src="/static/images/go.png">
      </router-link>
    </div>

    <!-- 我的订单 -->
    <div class="myboxcon">
      <router-link to="/order/base/list">
        <p>我的订单</p>
        <img src="/static/images/go.png">
      </router-link>
    </div>

    <!-- 我的收藏 -->
    <div class="myboxcon">
      <router-link to="/user/base/favorites">
        <p>我的收藏</p>
        <img src="/static/images/go.png">
      </router-link>
    </div>

    <!-- 在线充值 -->
    <div class="myboxcon">
      <router-link to="/user/pay/index">
        <p>在线充值</p>
        <img src="/static/images/go.png">
      </router-link>
    </div>

    <!-- 推荐海报 -->
    <div class="myboxcon">
      <p>推荐海报</p>
      <img src="/static/images/go.png">
    </div>

    <!-- 退出登录 -->
    <div class="myboxcon" @click="logout">
      <p>退出登录</p>
      <img src="/static/images/go.png">
    </div>

    <!--公共底部-->
    <menu-list />
  </div>
</template>

<script>
import MenuList from '@/components/Common/MenuList'
export default {
  name: 'BaseIndex',
  components: { // 加载你需要的组件
    MenuList
  },
  data () {
    return {
      user: this.$cookies.get('user')
    }
  },
  filters: {
    hide (phone, start, end) {
      var startpos = start
      var endpos = end
      var phonestr = phone

      // 将字符串变成一个数组
      var phonearr = phonestr.split('')

      for (startpos; startpos <= endpos; startpos++) {
        phonearr[startpos] = '*'
      }

      // 再将数组变成字符串
      return phonearr.join('')
    }
  },
  methods: {
    // 退出
    logout () {
      this.$dialog.confirm({
        title: '是否确认退出登录'
      }).then(() => {
        // 确认
        this.$cookies.remove('user')

        // 跳转到登录页面
        this.$router.push('/user/base/login')

        return false
      }).catch(() => {
        // 取消
      })
    }
  }

}
</script>
