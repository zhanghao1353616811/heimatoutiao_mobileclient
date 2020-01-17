<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.back()" title="文章详情" left-arrow fixed />
    <!-- /导航栏 -->
    <van-row class="article-box">
      <!-- 加载中 -->
      <van-loading v-if="loading" class="article-loading" color="#1989fa" vertical>
        <slot>加载中...</slot>
      </van-loading>
      <!-- /加载中 -->
      <!-- 文章详情 -->
      <van-row v-else-if="ArticleDetails.title" class="article-details">
        <h3 class="article-title">{{ArticleDetails.title}}</h3>
        <van-row class="article-author" type="flex" justify="space-between" align="center">
          <van-col class="author-info">
            <van-image :src="ArticleDetails.aut_photo" class="avatar" round fit="cover"/>
            <van-row class="info-text">
              <van-col class="info-name">{{ArticleDetails.aut_name}}</van-col>
              <van-col class="info-time">{{ArticleDetails.pubdate}}</van-col>
            </van-row>
          </van-col>
          <!-- v-if=如果用户没登录||文章作者不是当前登录用户 -->
          <van-button @click="clickFollowOrCancel"
            v-if="!$store.state.user||ArticleDetails.aut_id !==$store.state.user.id"
            :type="ArticleDetails.is_followed?'default':'info'" :icon="ArticleDetails.is_followed?'':'plus'"
            class="follow-btn" round size="mini">{{ArticleDetails.is_followed?'已关注':'关注'}}
          </van-button>
        </van-row>
        <Van-row v-html="ArticleDetails.content" class="markdown-body"></Van-row>
      </van-row>
      <!-- /文章详情 -->
      <!-- 加载失败提示 -->
      <van-row v-else class="article-error">
        <img src="../../assets/images/no-network.png" alt="no-network"/>
        <p class="error-text">网络不给力哦</p>
        <van-button @click="loadArticleDetails" class="error-btn" round type="default" size="small" color="#ccc">点击重试</van-button>
      </van-row>
      <!-- /加载失败提示 -->
    </van-row>
    <!-- 底部区域 -->
    <van-row class="article-footer">
      <van-button class="write-btn" type="default" round size="small">写评论</van-button>
      <van-icon class="comment-icon" name="comment-o" />
      <van-icon @click="clickCollectOrCancel" :name="ArticleDetails.is_collected?'star':'star-o'" color="orange" />
      <van-icon @click="clickLikeOrCancel" :name="ArticleDetails.attitude===1?'good-job':'good-job-o'" color="#e5645f" />
      <van-icon class="share-icon" name="share" />
    </van-row>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
import { getArticleDetails, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'

export default {
  name: 'ArticlePage',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      ArticleDetails: {} // 文章详情
    }
  },
  methods: {
    async clickFollowOrCancel () {
      // 两个作用：1、交互提示 2、防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示toast
        message: '加载中...', // 文本提示内容
        forbidClick: true //  是否禁止背景点击
      })
      try {
        const authorId = this.ArticleDetails.aut_id
        // 如果已关注 则取消关注
        if (this.ArticleDetails.is_followed) {
          await deleteFollow(authorId)
          this.ArticleDetails.is_followed = false
          this.$toast.success('取消关注')
        } else {
        // 否则添加关注
          await addFollow(authorId)
          this.ArticleDetails.is_followed = true
          this.$toast.success('关注成功')
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    async clickLikeOrCancel () {
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      try {
        // 如果已点赞 则取消点赞
        if (this.ArticleDetails.attitude === 1) {
          await deleteLike(this.articleId)
          this.ArticleDetails.attitude = -1
          this.$toast.success('取消点赞')
        } else {
        // 否则添加点赞
          await addLike(this.articleId)
          this.ArticleDetails.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    async clickCollectOrCancel () {
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      try {
        // 如果已收藏 则取消收藏
        if (this.ArticleDetails.is_collected) {
          await deleteCollect(this.articleId)
          this.ArticleDetails.is_collected = false
          this.$toast.success('取消收藏')
        } else {
        // 添加收藏
          await addCollect(this.articleId)
          this.ArticleDetails.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    async  loadArticleDetails () {
      this.loading = true
      try {
        // 第一种方式获取id: this.$route.params.articleId
        // 第二种方式获取id：props:true 将动态路由参数映射到组件props中 在通过this.articleId调用
        const { data } = await getArticleDetails(this.articleId)
        // JSON.parse('abcdefg')  用json.parse测试数据加载失败
        console.log(data)
        this.ArticleDetails = data.data
      } catch (error) {
        console.log(error)
        this.$toast.fail('加载数据失败')
      }
      this.loading = false
    }
  },
  created () {
    this.loadArticleDetails()
  }
}
</script>
<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  background: #fff;
  .article-box {
    padding: 46px 20px 80px;
    .article-loading {
      margin-top: 100px;
      text-align: center;
    }
    .article-title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3a3a3a;
    }
    .article-author {
      padding: 20px 0;
      height: 40px;
      .author-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .info-text {
          display: flex;
          flex-direction: column;
          .info-name {
            margin: 0;
            font-size: 14px;
          }
          .info-time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 100px;
        height: 30px;
      }
    }
    .article-error {
      padding-top: 100px;
      text-align: center;
      background-color: #fff;
      .error-text {
        font-size: 15px;
      }
      .error-btn {
        width: 30%;
      }
    }
  }
  .article-footer {
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
      width: 160px;
      height: 30px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
