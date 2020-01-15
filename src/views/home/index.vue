<template>
  <div class="home-Container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed/>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-icon @click="isChannelEditShow=true" slot="nav-right" name="wap-nav"/>
      <van-tab v-for="channel in userChannels" :title="channel.name" :key="channel.id">
        <!-- 文章列表 -->
        <article-list :channel="channel"/>
        <!-- /文章列表 -->
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
    <van-popup v-model="isChannelEditShow" position="bottom" :style="{height:'93%'}"
    round closeable close-icon-position="top-left">
    <channel-edit :user-channels="userChannels" @switch="switchChannel" :active="active"/>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/channel'
import articleList from './components/article-list'
import channelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'

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
