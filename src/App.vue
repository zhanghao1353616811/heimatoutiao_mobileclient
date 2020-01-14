<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view/>
    <!-- /根路由出口 -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">

// 注意:在style中使用@别名 需要在前面加~
// @之后必须有 反斜杠/
// 如果你加载的资源就是相对于当前目录 建议还是 ./  一般适用于../../
</style>
