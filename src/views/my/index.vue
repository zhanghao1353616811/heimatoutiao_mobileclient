<template>
  <van-row class="my-Container">
    <van-row v-if="$store.state.user" class="my-info">
      <van-row type="flex" align="center">
        <van-col span="21" class="my-image">
          <van-image @click="$router.push(`/user/${user.id}`)" :src="user.photo" round fit="cover"></van-image>
          <span @click="$router.push(`/user/${user.id}`)">{{user.name}}</span>
        </van-col>
        <van-button round size="mini">编辑资料</van-button>
      </van-row>
      <van-grid :border="false" class="data-info">
        <van-grid-item><span>{{user.art_count}}</span><span>头条</span></van-grid-item>
        <van-grid-item><span>{{user.follow_count}}</span><span>关注</span></van-grid-item>
        <van-grid-item><span>{{user.fans_count}}</span><span>粉丝</span></van-grid-item>
        <van-grid-item><span>{{user.like_count}}</span><span>获赞</span></van-grid-item>
      </van-grid>
    </van-row>
    <van-row v-else class="click-login">
      <van-col @click="$router.push('/login')" class="click-login-image"></van-col>
      <span @click="$router.push('/login')">点击登录</span>
    </van-row>
    <van-grid :column-num="3" :border="false" clickable>
        <van-grid-item text="我的收藏"><van-icon slot="icon" class-prefix="icon" name="xingxing" class="my-icon" color="#eb5253"></van-icon></van-grid-item>
        <van-grid-item text="浏览历史"><van-icon slot="icon" class-prefix="icon" name="browsing-history-o" class="my-icon" color="#ffa023"></van-icon></van-grid-item>
        <van-grid-item text="作品"><van-icon slot="icon" class-prefix="icon" name="edit" class="my-icon" color="#678eff"></van-icon></van-grid-item>
    </van-grid>
    <van-cell-group class="my-van-cell">
      <van-cell title="消息通知" is-link></van-cell>
      <van-cell title="小智同学" is-link></van-cell>
    </van-cell-group>
    <van-button @click="userLoginOut" v-if="$store.state.user" plain class="loginBtn">退出登录</van-button>
  </van-row>
</template>

<script>
import { getUserInfo } from '@/api/user'

export default {
  name: 'myPage',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.user = data.data
      } catch (error) {
        // console.log(error)
        this.$toast('获取数据失败')
      }
    },
    async userLoginOut () {
      try {
        await this.$dialog.confirm({
          title: '是否退出',
          message: '退出当前头条账号，将不能同步收藏，发布评论和云端分享等'
        })
        this.$store.commit('setUser', null)
      } catch (error) {
        // console.log('用户取消', error)
        this.$dialog.close()
      }
    }
  },
  created () {
    if (this.$store.state.user) {
      this.loadUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.my-Container{
  background-color: #f1efef;
  .my-info{
    height: 182px;
    color: #fff;
    font-size: 14px;
    padding: 40px 20px;
    box-sizing: border-box;
    background: url('~@/assets/images/banner.png') no-repeat;
    background-size: cover;
    .my-image{
      display: flex;
      align-items: center;
      .van-image{
        width: 62px;
        height: 62px;
        padding: 2px;
        margin-right: 15px;
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
  .my-icon{
    font-size: 22px;
  }
  .my-van-cell{
    margin-top:10px;
  }
}
</style>
