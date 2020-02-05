<template>
  <div class="channel-edit">
    <div data-v-6275ee05 class="van-nav-bar__title van-ellipsis">编辑频道</div>
    <van-cell title="我的频道" :border="false" class="channel-title">
      <span slot="icon" class="tip">点击进入频道</span>
      <van-button @click="isEditShow=!isEditShow" slot="right-icon" round type="danger" size="mini">
        {{isEditShow?"完成":"编辑"}}
      </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item @click="onUserChannerClick(index)" v-for="(channel,index) in userChannels" :key="channel.id" class="channel-grid">
        <span slot="text" class="text" :class="{active:active===index}">{{channel.name}}</span>
        <van-icon v-show="isEditShow &&index!==0" slot="icon" name="close" class="channel-icon" />
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道" :border="false">
      <span slot="icon" class="tip">点击添加频道</span>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item @click="addChannel(channel)"
      v-for="channel in remainingChannels" :key="channel.id" :text="channel.name"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isEditShow: false,
      allChannels: [] // 所有频道
    }
  },
  methods: {
    onUserChannerClick (index) {
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1)
      } else {
        this.$emit('switch', index)
      }
    },
    addChannel (channel) {
      this.userChannels.push(channel)
    },
    async loadAllChannels () {
      const { data } = await getAllChannels()
      // console.log(data)
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
  watch: {
    // 当 userChannels 发生变化，会调用该函数
    userChannels (newValue) {
      setItem('user-channels', newValue)
    }
  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  .channel-title {
    position: relative;
  }
  .tip {
    position: absolute;
    left: 82px;
    font-size: 0.32rem;
    color: #ccc;
  }
  .channel-grid {
    position: relative;
    .channel-icon {
      position: absolute;
      top: -20px;
      left: 32px;
      font-size: 16px;
    }
  }
}
.van-nav-bar__title {
  max-width: 18%;
  margin: 14px auto;
  color: #333;
  font-weight: 500;
  font-size: 0.42667rem;
}
/deep/ .van-grid-item {
  width: 80px;
  height: 43px;
  position: relative;
  .van-grid-item__content {
    background-color: rgb(244, 245, 246);
  }
  .van-grid-item__text,
  .text {
    font-size: 14px;
    color: #222;
  }
  .active {
    color: red;
  }
}
</style>
