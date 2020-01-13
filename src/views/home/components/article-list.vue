<template>
    <div class="article-list">
        <van-list @load="onLoadArticleList" v-model="loading" :finished="finished" finished-text="没有更多了">
            <van-cell v-for="(item,index) in list" :key="index" :title="item.title"></van-cell>
        </van-list>
    </div>
</template>

<script>
import { getArticleChannels } from '@/api/articles'

export default {
  name: 'articleListPage',
  props: {
    channel: {
      type: Object, // 必须是对象
      required: true// 必须是数据
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      imestamp: null
    }
  },
  methods: {
    async onLoadArticleList () {
      // 1.请求获取数据
      const { data } = await getArticleChannels({
        channel_id: this.channel.id, // 频道ID
        timestamp: this.imestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      console.log(data)

      // 2.把数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3.加载状态结束
      this.loading = false
      // 4.判断数据是否在加载完毕
      if (results.length) {
        this.imestamp = data.data.pre_timestamp
      }
    }
  },
  created () {
    this.onLoadArticleList()
  }
}
</script>

<style>

</style>
