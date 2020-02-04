<template>
  <div class="user-articles">
    <!-- 导航栏 -->
    <van-nav-bar fixed @click-left="$router.back()" title="收藏/历史/作品" left-arrow />
    <!-- /导航栏 -->
    <!-- 标签列表 -->
    <van-tabs v-model="active">
      <van-tab title="收藏">
        <user-collect />
      </van-tab>
      <van-tab title="历史">
        <user-history />
      </van-tab>
      <van-tab title="作品">
        <user-article />
      </van-tab>
    </van-tabs>
    <!-- /标签列表 -->
  </div>
</template>

<script>
import userArticle from './components/article'
import userCollect from './components/collect'
import userHistory from './components/history'

export default {
  name: 'UserArticles',
  components: {
    userArticle,
    userCollect,
    userHistory
  },
  props: {
    type: {
      type: String
      // required:true 非必须 有的话展示对应的数据 没有的话就是我的作品
    }
  },
  data () {
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2 // 作品
    }
    return {
      active // 控制激活的标签选项
    }
  }
}
</script>

<style scoped lang="less">
.user-articles{
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/.van-tabs__wrap{
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}

</style>
