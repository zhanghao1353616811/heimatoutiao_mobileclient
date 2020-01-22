<template>
  <van-cell class="comment-item">
      <!-- 评论作者头像 -->
      <van-image :src="comment.aut_photo" class="avatar" slot="icon" round fit="cover"/>
      <!-- /评论作者头像 -->
      <!-- 评论作者名字 -->
      <span slot="title" style="color: #466b9d;">{{comment.aut_name}}</span>
      <!-- /评论作者名字 -->
      <van-row class="info" slot="label">
      <!-- 评论内容 -->
          <span style="color: #363636;">{{comment.content}}</span>
      <!-- /评论内容 -->
          <van-col>
              <!-- 发布日期 -->
              <span class="date">{{comment.pubdate|relativeTime}}</span>
              <!-- /发布日期 -->
              <!-- 回复 -->
              <van-button type="default" size="mini">回复</van-button>
              <!-- 回复 -->
          </van-col>
      </van-row>
      <van-row class="like-container" slot="right-icon">
          <van-icon name="good-job-o" />
          <span>赞</span>
      </van-row>
  </van-cell>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.comment-item{
   display: flex;
   align-items: flex-start;
   .avatar{
       width: 30px;
       height: 30px;
       margin-right: 10px;
   }
   .info{
      display: flex;
      flex-direction: column;
      .date{
        margin-right: 10px;
      }
    }
    .like-container{
        width: 30px;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
}
</style>
