<template>
  <div class="user-container">
    <van-nav-bar @click-left="$router.back()" :title="userInfo.name" left-arrow fixed/>
    <van-row class="user-info-container">
      <van-col class="user-info">
        <van-image @click="imagePreview" ref="image" :src="userInfo.photo" class="user-infoImage" round fit="fill" />
        <van-row class="user-info-row">
          <van-col class="user-info-col">
            <van-row class="item">
              <van-col class="count">{{userInfo.art_count}}</van-col>
              <van-col class="text">发布</van-col>
            </van-row>
            <van-row class="item">
              <van-col class="count">{{userInfo.follow_count}}</van-col>
              <van-col class="text">关注</van-col>
            </van-row>
            <van-row class="item">
              <van-col class="count">{{userInfo.fans_count}}</van-col>
              <van-col class="text">粉丝</van-col>
            </van-row>
            <van-row class="item">
              <van-col class="count">{{userInfo.like_count}}</van-col>
              <van-col class="text">获赞</van-col>
            </van-row>
          </van-col>
          <div class="action">
            <van-button type="primary" size="small">私信</van-button>
            <van-button type="info" size="small" icon="plus">关注</van-button>
            <!-- <van-button type="info" size="small">编辑资料</van-button> -->
          </div>
        </van-row>
      </van-col>
      <van-row class="user-intro">
        <van-col>
          <span>认证:</span>
          <span>{{userInfo.certi}}</span>
        </van-col>
        <van-col class="user-intro-item">
          <span>简介:</span>
          <span>{{userInfo.intro}}</span>
        </van-col>
      </van-row>
    </van-row>
    <van-list @load="onLoadUser" v-model="loading" :finished="finished" finished-text="没有更多了" loading-text="加载中...">
      <van-cell @click="$router.push(`/article/${article.art_id}`)"
      v-for="(article,index) in list" :key="index" :title="article.title"></van-cell>
    </van-list>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { getUserById } from '@/api/user'
import { getUserArticles } from '@/api/article'

export default {
  name: 'UserPage',
  data () {
    return {
      list: [], // 列表数据
      page: 1, // 获取下一页数据的页码
      loading: false, // 控制上拉加载更多的 loading
      finished: false, // 控制是否加载结束了
      userInfo: {} // 用户信息
    }
  },
  methods: {
    // 图片预览
    imagePreview  () {
      const fileData = this.userInfo.photo
      ImagePreview({
        images: [fileData]
      })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserById(this.$route.params.userId)
        this.userInfo = data.data
        // console.log(data)
      } catch (error) {
        // console.log(error)
        this.$toast.fail('加载数据失败')
      }
    },
    async onLoadUser () {
      // 1.请求获取数据
      const { data } = await getUserArticles(this.$route.params.userId, {
        page: this.page, // 可选的 默认是第 1 页
        per_page: 20 // 可选的 默认每页 20 条
      })
      // 2.把数据添加到列表中
      // console.log(data)
      const { results } = data.data
      // console.log(results)
      this.list.push(...results)
      // results.forEach(item => {
      //   this.list.push(item)
      // })
      // 3.加载状态结束
      this.loading = false
      // 4.判断数据是否全部加载完毕
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  },
  created () {
    this.loadUserInfo()
  }
}
</script>

<style scoped lang='less'>
.user-container {
  font-size: 18px;
  .user-info-container {
    font-size: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    padding: 60px 10px 10px;
    .user-info {
      .user-infoImage {
        width: 80px;
        height: 80px;
      }
      display: flex;
      align-items: center;
      .user-info-row {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 71%;
        height: 80px;
        padding: 0 12px;
        .user-info-col {
          display: flex;
          justify-content: space-between;
          .item {
            display: flex;
            flex-direction: column;
            text-align: center;
            .text {
              font-size: 12px;
            }
          }
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
    .user-intro {
      margin-top: 4px;
      display: flex;
      flex-direction: column;
      .user-intro-item {
        margin-top: 5px;
      }
    }
  }
}
</style>
