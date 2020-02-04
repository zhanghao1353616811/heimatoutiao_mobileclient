<template>
  <div class="article">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoadUserArticleCollect">
      <van-cell @click="$router.push({
        name:'article',
        params:{
          articleId:article.art_id.toString()
        }
      })"
      v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getUserArticleCollect } from '@/api/article'

export default {
  name: 'userCollect',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 当前页码
      per_page: 10 // 每页大小
    }
  },
  methods: {
    async onLoadUserArticleCollect () {
      // 1.请求获取数据
      const { data } = await getUserArticleCollect({
        page: this.page, // 页数，不传默认为1
        per_page: this.per_page // 每页数量，不传每页数量由后端决定
      })
      //   console.log(data)
      // 2.将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3.关闭loading
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        this.page++ // 更新获取下一页数据
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
