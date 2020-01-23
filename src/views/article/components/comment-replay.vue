<template>
    <div class="comment-replay">
        <van-nav-bar title="0条回复">
            <van-icon slot="left" name="cross" />
        </van-nav-bar>
        <comment-item :comment="comment"/>
        <van-cell title="全部评论" />
        <van-list @load="onLoadComment" v-model="loading" :finished="finished" finished-text="没有更多了">
            <comment-item :comment="comment" v-for="(comment,index) in list" :key="index"/>
        </van-list>
    </div>
</template>

<script>
import commentItem from './comment-item'
import { getComments } from '@/api/comment'
export default {
  name: 'CommentReplay',
  components: {
    commentItem
  },
  props: {
    comment: {
      type: Object,
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
    async onLoadComment () {
      // 1.请求获取数据
      const { data } = await getComments({
        type: 'c', // a-对文章(article)的评论 c-对评论(comment)的回复
        source: this.comment.com_id.toString(), // 源id 文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量 值为评论id 表示从此id的数据向后取 不传表示从第一页开始读取数据
        limit: this.limit // 获取的评论数据个数 不传表示采用后端服务设定的默认每页数据量
      })
      // console.log(data)
      const { results } = data.data
      // 2.将数据添加到列表中
      this.list.push(...results)
      // 3.关闭loading
      this.loading = false

      //   this.comment.reply_count++
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
