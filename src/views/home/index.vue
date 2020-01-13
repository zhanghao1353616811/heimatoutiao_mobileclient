<template>
  <div class="home-Container">
    <van-nav-bar title="首页"/>
        <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab title="标签 1">
          <!-- TODO: 文章列表 -->
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getUserChannel } from '@/api/channel'

export default {
  name: 'homePage',
  data () {
    return {
      active: 0,
      userChannels: []
    }
  },
  methods: {
    async loadUserChannel () {
      try {
        const { data } = await getUserChannel()
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

<style>

</style>
