<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view></router-view>

    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <h2 class="box">你好</h2>
    <van-cell-group>
      <van-cell title="单元格" value="内容"/>
      <van-cell title="单元格" value="内容" label="描述信息"/>
    </van-cell-group>
    <h2></h2>
    <i class="iconfont icon-apple"></i>
    <i class="iconfont icon-Apple"></i>
    <van-icon name="like-o"></van-icon>
    <van-icon name="flower-o" color="red" size="80"/>
    <van-icon class-prefix="icon" name="apple" color="blue" size="60"></van-icon>
    <van-icon class-prefix="icon" name="Apple"/>
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

@import url("~@/styles/variables.less");

.box{
  color:@color-primary;
}

</style>
