<template>
  <van-cell class="comment-item">
    <!-- 评论作者头像 -->
    <van-image :src="comment.aut_photo" class="avatar" slot="icon" round fit="cover" />
    <!-- /评论作者头像 -->
    <!-- 评论作者名字 -->
    <span slot="title" style="color: #466b9d;">{{comment.aut_name}}</span>
    <!-- /评论作者名字 -->
    <van-row class="info" slot="label">
      <!-- 评论内容 -->
      <span class="content" style="color: #363636;">{{comment.content}}</span>
      <!-- /评论内容 -->
      <van-col>
        <!-- 发布日期 -->
        <span class="date">{{comment.pubdate|relativeTime}}</span>
        <!-- /发布日期 -->
        <!-- 回复 -->
        <van-button type="default" size="mini">回复&nbsp;{{comment.reply_count}}</van-button>
        <!-- 回复 -->
      </van-col>
    </van-row>
    <van-row class="like-container" slot="right-icon">
      <van-icon :name="comment.is_liking?'good-job':'good-job-o'"
        :color="comment.is_liking?'rgb(229, 100, 95)':''"/>
      <span>{{comment.like_count?comment.like_count:'赞'}}</span>
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
.comment-item {
  display: flex;
  align-items: flex-start;
  padding: 5px 0;
  .avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .info {
    display: flex;
    flex-direction: column;
    .content {
      padding: 4px 0 10px;
    }
    .date {
      margin-right: 10px;
    }
  }
  .like-container {
    width: 30px;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
