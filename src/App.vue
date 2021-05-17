<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
import MenuList from '@/components/Common/MenuList'
export default {
  name: 'App',
  data () {
    return {
      isshow: true,
      transitionName: ''
    }
  },
  components: { // 加载你需要的组件
    MenuList
  },
  watch: {
    $route (to, from) {
      // 将不想有过渡动画效果的部分路由写进判断条件中

      // 封装的不需要滑动的路由地址
      var routerlist = [
        '/',
        '/user/base/index',
        '/product/type/index'
      ]

      // 只要是路径存在于这个数组的就不需要滑动   //in_array()

      // to.path
      // from.path

      // routerlist.includes

      // if(to.path !=='/' && to.path !=='/user/base/index' || from.path !=='/' && from.path !=='/user/base/index')

      if (routerlist.includes(to.path) || routerlist.includes(from.path)) {
        this.transitionName = ''
      } else {
        // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index < from.meta.index) {
          // 设置动画名称
          this.transitionName = 'slide-left'
        } else if (to.meta.index > from.meta.index) {
          this.transitionName = 'slide-right'
        } else if (to.meta.index == 99) {
          this.transitionName = ''
        }
      }
    }
  }
}
</script>
<style scoped>
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all .3s;
    position: absolute;
    width: 100%;
  }
  .slide-right-enter {
    left: 200%;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-enter-to{
    left: 0;
  }
  .slide-right-leave {
    left: 0;
  }
  .slide-right-leave-to{
    left: -100%;
  }
  .slide-left-enter {
    left: -100%;
  }
  .slide-left-enter-to{
    left: 0;
  }
  .slide-left-leave{
    left:0
  }
  .slide-left-leave-to{
    left: 200%;
  }
</style>
