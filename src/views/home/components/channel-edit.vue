<template>
  <div class="channel-edit">
    <div data-v-6275ee05 class="van-nav-bar__title van-ellipsis">编辑频道</div>
    <van-cell title="我的频道">
      <span slot="icon" class="tip">点击进入频道</span>
      <van-button slot="right-icon" round type="danger" size="mini">编辑</van-button>
    </van-cell>
    <van-grid :column-num="4">
      <van-grid-item v-for="channel in userChannels" :key="channel.id" :text="channel.name"/>
    </van-grid>
    <van-cell title="推荐频道">
      <span slot="icon" class="tip">点击添加频道</span>
    </van-cell>
    <van-grid :column-num="4">
      <van-grid-item @click="addChannels" v-for="channel in remainingChannels" :key="channel.id" :text="channel.name"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'channelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: []// 所有频道
    }
  },
  methods: {
    async addChannels () {
      const { data } = this.remainingChannels()
    },
    async loadAllChannels () {
      const { data } = await getAllChannels()
      console.log(data)
      this.allChannels = data.data.channels
    }
  },
  computed: {
    remainingChannels () {
      const remainChannels = [] // 剩余频道
      const { userChannels, allChannels } = this
      allChannels.forEach(item => {
        if (!userChannels.find(element => element.id === item.id)) {
          remainChannels.push(item)
        }
      })
      return remainChannels
    }
  },
  created () {
    this.loadAllChannels()
  }
}
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
