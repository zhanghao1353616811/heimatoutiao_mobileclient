<template>
  <van-row class="user-Container">
    <van-row class="user-info">
      <van-col span="16" class="user-image">
        <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" round fit="fill" width="62" height="62"></van-image>
        <span>不朽之神</span>
      </van-col>
      <van-col span="8"></van-col>
    </van-row>
  </van-row>
</template>

<script>
export default {
  name: 'userPage'
}
</script>

<style lang="less" scoped>
.user-Container{
  .user-info{
    background: url('~@/assets/images/banner.png')
  }
}
</style>
