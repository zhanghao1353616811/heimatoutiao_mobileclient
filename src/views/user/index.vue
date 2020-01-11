<template>
  <van-row class="user-Container">
    <van-row class="user-info">
      <van-row type="flex" align="center">
        <van-col span="21" class="user-image">
          <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" round fit="fill" width="66" height="66"></van-image>
          <span>不朽之神</span>
        </van-col>
        <van-button round size="mini">编辑资料</van-button>
      </van-row>
      <van-grid :border="false" class="data-info">
        <van-grid-item><span>63111</span><span>头条</span></van-grid-item>
        <van-grid-item><span>29</span><span>关注</span></van-grid-item>
        <van-grid-item><span>184</span><span>粉丝</span></van-grid-item>
        <van-grid-item><span>847</span><span>获赞</span></van-grid-item>
      </van-grid>
    </van-row>
    <van-row class="click-login">
      <van-col class="click-login-image"></van-col>
      <span>点击登录</span>
    </van-row>
    <van-grid :column-num="3" :border="false">
        <van-grid-item text="我的收藏"><van-icon slot="icon" size="24" class-prefix="icon" name="xingxing" color="#eb5253"></van-icon></van-grid-item>
        <van-grid-item text="浏览历史"><van-icon slot="icon" size="24" class-prefix="icon" name="browsing-history-o" color="#ffa023"></van-icon></van-grid-item>
        <van-grid-item text="作品"><van-icon slot="icon" size="24" class-prefix="icon" name="edit" color="#678eff"></van-icon></van-grid-item>
    </van-grid>
    <van-cell-group style="margin-top:10px">
      <van-cell title="消息通知" is-link></van-cell>
      <van-cell title="小智同学" is-link></van-cell>
    </van-cell-group>
    <van-button plain class="loginBtn">退出登录</van-button>
  </van-row>
</template>

<script>
export default {
  name: 'userPage'
}
</script>

<style lang="less" scoped>
.user-Container{
  background-color: #f1efef;
  .user-info{
    height: 182px;
    color: #fff;
    font-size: 15px;
    padding: 40px 20px;
    box-sizing: border-box;
    background: url('~@/assets/images/banner.png') no-repeat;
    background-size: cover;
    .user-image{
      display: flex;
      align-items: center;
      .van-image{
        margin-right: 15px;
        padding: 2px;
        background: #fff;
      }
    }
   .data-info {
      ::v-deep .van-grid-item__content {
        background: none;
      }
    }
  }
  .loginBtn{
    width: 100%;
    margin-top: 10px;
  }
  .click-login{
    height: 182px;
    color: #fff;
    font-size: 15px;
    box-sizing: border-box;
    background: url('~@/assets/images/banner.png') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .click-login-image{
      width: 66px;
      height: 66px;
      margin-bottom: 10px;
      box-sizing: border-box;
      background: url('~@/assets/images/mobile.png');
      background-size: cover;
    }
  }
}
</style>
