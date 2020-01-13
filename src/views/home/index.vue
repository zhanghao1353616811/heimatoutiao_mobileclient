<template>
  <div class="home-Container">
    <van-nav-bar title="首页"/>
    <van-tabs v-model="active">
      <van-tab v-for="channel in userChannels" :title="channel.name" :key="channel.id"/>
    </van-tabs>
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

<style>

</style>
