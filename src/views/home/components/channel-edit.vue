<template>
  <div class="channel-edit">
    <div data-v-6275ee05 class="van-nav-bar__title van-ellipsis">编辑频道</div>
    <van-cell title="我的频道">
      <span slot="icon" class="tip">点击进入频道</span>
      <van-button slot="right-icon" round type="danger" size="mini">编辑</van-button>
    </van-cell>
    <van-grid :column-num="4">
        <van-grid-item v-for="value in 15" :key="value" text="推荐"></van-grid-item>
    </van-grid>
    <van-cell title="推荐频道">
      <span slot="icon" class="tip">点击添加频道</span>
      <van-button slot="right-icon" round type="danger" size="mini">编辑</van-button>
    </van-cell>
    <van-grid :column-num="4">
        <van-grid-item v-for="value in 15" :key="value" text="推荐"></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.channel-edit {
  .tip {
    position: absolute;
    left: 82px;
    font-size: 0.32rem;
    color: #ccc;
  }
}
.van-nav-bar__title {
  max-width: 18%;
  margin: 14px auto;
  color: #333;
  font-weight: 500;
  font-size: 0.42667rem;
}
.van-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
