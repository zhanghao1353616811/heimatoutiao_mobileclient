<template>
  <div class="article-comment">
      <!-- 评论列表 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了..." @load="onLoadArticleComments">
          <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.content">

          </van-cell> -->
          <comment-item v-for="(item,index) in list" :key="index" :comment="item"/>
      </van-list>
      <!-- /评论列表 -->
  </div>
</template>

<script>
import commentItem from './comment-item'
import { getArticleComments } from '@/api/comment'

export default {
  name: 'ArticleComment',
  components: {
    commentItem
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20
    }
  },
  methods: {
    // 1.请求获取数据
    async onLoadArticleComments () {
      const { data } = await getArticleComments({
        type: 'a', // a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId, // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      })
      console.log(data)
      const { results } = data.data
      // 2.将数据添加到列表中
      this.list.push(...results)
      // 3.关闭loading
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
