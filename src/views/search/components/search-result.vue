<template>
  <div class="search-result">
      <van-list @load="onloadSearchResult" v-model="loading" :finished="finished" finished-text="没有更多了">
        <van-cell @click="$router.push(`/article/${search.art_id}`)"
        v-for="(search,index) in searchResult" :key="index" :title="search.title"/>
      </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'search-result',
  props: {
    searchContent: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      searchResult: [], // 搜索结果
      loading: false,
      finished: false,
      page: 1, // 页数 不传默认为1
      per_page: null // 每页数量，不传每页数量由后端决定
    }
  },
  methods: {
    async onloadSearchResult () {
      // 1.请求获取列表数据
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.searchContent // 搜索关键词
      })
      // 2.将数据添加到列表中
      console.log(data)
      const { results } = data.data
      this.searchResult.push(...results)
      // 3.加载状态结束
      this.loading = false
      // 4.判断数据是否全部加载完毕
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
      // 5.绑定模板
    },
    onLoad () {
      console.log('onload')
    }
  },
  created () {
  }
}
</script>

<style>

</style>
