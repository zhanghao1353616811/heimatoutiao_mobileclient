<template>
  <div class="home-Container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed/>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-icon @click="isChannelEditShow=true" slot="nav-right" name="wap-nav"></van-icon>
      <van-tab v-for="channel in userChannels" :title="channel.name" :key="channel.id">
        <!-- 文章列表 -->
        <article-list :channel="channel"></article-list>
        <!-- /文章列表 -->
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
    <van-popup v-model="isChannelEditShow" position="bottom" :style="{height:'95%'}"
    round closeable close-icon-position="top-left">
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/channel'
import articleList from './components/article-list'

export default {
  name: 'homePage',
  components: {
    articleList
  },
  data () {
    return {
      isChannelEditShow: false,
      active: 0,
      userChannels: [] // 用户频道列表
    }
  },
  methods: {
    async loadUserChannel () {
      try {
        const { data } = await getUserChannel()
        this.userChannels = data.data.channels
        console.log(data)
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
.home-Container{
  padding-top: 90px;
  padding-bottom: 50px;
}
.van-icon{
  position: fixed;
  right: 0;
  font-size: 26px;
  line-height: 44px;
  opacity: 0.8;
  background-color: #fff;
}
/deep/.van-tabs__wrap{
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    z-index: 1;
}

</style>
