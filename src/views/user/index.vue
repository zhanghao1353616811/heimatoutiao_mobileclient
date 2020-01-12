<template>
  <div class="user-Container">
    <van-nav-bar>
      <van-icon @click="history.back()" slot="left" name="arrow-left" class="van-icon-arrow-left"></van-icon>
      <span slot="title">{{userInfo.name}}</span>
    </van-nav-bar>
    <van-row class="user-info-container">
      <van-col class="user-info">
        <van-col>
          <van-image :src="userInfo.photo" class="user-infoImage" round fit="fill"></van-image>
        </van-col>
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
            <van-button type="info" size="small">
              <van-icon slot="button" name="plus"></van-icon>关注</van-button>
          </div>
        </van-row>
      </van-col>
      <van-col class="user-intro">
        <van-col>
          <span>认证:</span><span>{{userInfo.certi}}</span>
        </van-col>
        <van-col class="user-intro-item">
          <span>简介:</span><span>{{userInfo.intro}}</span>
        </van-col>
      </van-col>
    </van-row>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
      <van-cell v-for="item in list" :key="item" :title="item"></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getUserById } from '@/api/user'
import { getUserArticles } from '@/api/articles'

export default {
  name: 'userPage',
  data () {
    return {
      list: [],
      page: 1,
      loading: false,
      finished: false,
      userInfo: {}
    }
  },
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserById(this.$route.params.userId)
        this.userInfo = data.data
        // console.log(data)
      } catch (error) {
        console.log(error)
        this.$toast('获取数据失败')
      }
    },
    async onLoad () {
      // 请求获取数据
      const { data } = await getUserArticles(this.$route.params.userId, {
        page: this.page,
        per_page: 20
      })
      // 把数据添加到列表中
      console.log(data)
      data.data.results.forEach(element => {

      })
      // 加载状态结束
      this.loading = false
      // 判断数据是否全部加载完毕
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
    }
  },
  created () {
    this.loadUserInfo()
    this.onLoad()
  }
}
</script>

<style lang='less' scoped>
.user-Container {
  .van-icon-arrow-left {
    color: #ffffff;
    font-size: 22px;
  }
  .user-info-container {
    font-size: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    .user-info {
      .user-infoImage {
        width: 80px;
        height: 80px;
        // background: url("./mobile.png");
      }
      display: flex;
      align-items: center;
      .user-info-row {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
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
    .user-intro{
      margin-top: 4px;
      display: flex;
      flex-direction: column;
      .user-intro-item{
        margin-top: 5px;
      }
    }
  }
}
</style>
