<template>
  <div id="app">
    <!-- 根路由出口 -->
    <!-- <router-view/> 就是一个动态组件-->
    <!-- 默认缓存所有组件
    keep-alive是vue本身内置的一个组件 专门用来缓存组件的
    也可以用过include exclude缓存
    include 可以配置哪些组件缓存
    exclude 配置哪些组件不要缓存 -->
    <keep-alive :include="$store.state.cachePages">
      <router-view/>
    </keep-alive>
    <!-- /根路由出口 -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      cachePages: ['TabBar']
    }
  }
}
</script>

<style lang="less">
// 注意:在style中使用@别名 需要在前面加~
// @之后必须有 反斜杠/
// 如果你加载的资源就是相对于当前目录 建议还是 ./  一般适用于../../
</style>
