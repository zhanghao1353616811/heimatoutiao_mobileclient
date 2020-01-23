<template>
  <div class="comment-reply">
    <van-nav-bar title="0条回复">
      <van-icon @click="$emit('click-close')" slot="left" name="cross" />
    </van-nav-bar>
    <comment-item :comment="comment" />
    <van-cell title="全部评论" />
    <van-list @load="onLoadComment" v-model="loading" :finished="finished" finished-text="没有更多了">
      <comment-item :comment="comment" v-for="(comment,index) in list" :key="index" />
    </van-list>
    <van-row class="reply-footer">
      <van-button @click="isPostReplyShow=true" class="write-btn" type="default" round size="small">写评论</van-button>
      <van-icon name="good-job" color="#e5645f"/>
    </van-row>
    <van-popup v-model="isPostReplyShow" position="bottom" :style="{height:'18%'}">
      <post-comment @click-post="onPostReplyComment" v-model="postMessage" />
    </van-popup>
  </div>
</template>

<script>
import postComment from './post-comment'
import commentItem from './comment-item'
import { getComments, addComments } from '@/api/comment'
export default {
  name: 'CommentReplay',
  components: {
    commentItem,
    postComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
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
      limit: 20,
      isPostReplyShow: false,
      postMessage: ''
    }
  },
  methods: {
    async onPostReplyComment () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await addComments({
          target: this.comment.com_id.toString(), // 评论的目标id（评论文章即为文章id 对评论进行回复则为评论id）
          content: this.postMessage, // 评论内容
          art_id: this.articleId // 文章id 对评论内容发表回复时 需要传递此参数 表明所属文章id 对文章进行评论 不要传此参数
        })
        // console.log(data)
        // 将数据添加到列表中
        this.list.unshift(data.data.new_obj)
        this.$toast.success('发布成功')
        // 清空文本框
        this.postMessage = ''
        // 关闭弹层
        this.isPostReplyShow = false
      } catch (error) {
        console.log(error)
        this.$toast.fail('发布失败')
        this.postMessage = ''
      }
    },
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

<style scoped lang="less">
.reply-footer {
  height: 44px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .write-btn {
    width: 60%;
    height: 30px;
  }
}
</style>
