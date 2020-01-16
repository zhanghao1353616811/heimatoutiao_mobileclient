<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed class="home-nav-bar">
      <div slot="left" class="home-logo"></div>
      <van-button @click="$router.push('/search')" slot="right" icon="search" class="search-btn">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-icon @click="isChannelEditShow=true" slot="nav-right" name="wap-nav" class="edit-Icon" />
      <van-tab v-for="channel in userChannels" :title="channel.name" :key="channel.id">
        <!-- 文章列表 -->
        <article-list :channel="channel" />
        <!-- /文章列表 -->
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
    <van-popup v-model="isChannelEditShow" position="bottom" :style="{height:'93%'}"
      round closeable close-icon-position="top-left">
      <channel-edit :user-channels="userChannels" @switch="switchChannel" :active="active" />
    </van-popup>
  </div>
</template>

<script>
import articleList from './components/article-list'
import channelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'
import { getUserChannel } from '@/api/channel'

export default {
  name: 'homePage',
  components: {
    articleList,
    channelEdit
  },
  data () {
    return {
      isChannelEditShow: false,
      active: 0, // 控制激活样式
      userChannels: [] // 用户频道列表
    }
  },
  methods: {
    switchChannel (index) {
      this.active = index
      this.isChannelEditShow = false
    },
    async loadUserChannel () {
      try {
        // 1.声明变量存储频道数据
        let channels = []
        // 2.获取本地存储的频道列表
        const localUserChannels = getItem('user-channels')
        // 3.如果有本地存储的则使用本地存储
        if (localUserChannels) {
          channels = localUserChannels
        } else {
          // 4.如果没有本地存储的则使用接口的
          const { data } = await getUserChannel()
          // console.log(data)
          channels = data.data.channels
        }
        // 5.将数据赋值给当前组件数据
        this.userChannels = channels
      } catch (error) {
        console.log(error)
        this.$toast('获取数据失败')
      }
    }
  },
  created () {
    this.loadUserChannel()
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
  .home-logo {
    width: 100px;
    height: 30px;
    position: absolute;
    top: -37px;
    background: url("~@/assets/images/logo-light.png") no-repeat;
    background-size: cover;
  }
}
.edit-Icon {
  position: fixed;
  right: 0;
  font-size: 26px;
  line-height: 44px;
  opacity: 0.8;
  background-color: #fff;
}
/deep/.van-tabs__wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  z-index: 1;
}
.search-btn{
  border: none;
  width: 175px;
  height: 26px;
  color: #fff;
  font-size: 14px;
  line-height: 24px;
  border-radius: 12px;
  position: absolute;
  right: 0px;
  top: -35px;
  background-color: #5babfb;
  .van-icon-search{
    position: absolute;
    top: 0;
    right: 100px;
    line-height: 30px;
    font-size: 18px;
  }
}
</style>
