<template>
  <div class="search-container">
      <!-- 在van-search 外层增加form标签且action不为空 即可在ios输入法中显示搜索按钮-->
    <form action="/" slot="left">
      <van-search v-model="value" @search="onSearch" @cancel="onCancel"
      placeholder="请输入搜索关键词" show-action background="#3296fa" ></van-search>
    </form>
    <van-list>
        <van-cell title="历史记录">
            <van-icon slot="right-icon" name="delete" color="#969799"/>
            <span>全部删除</span>
            <span>&nbsp;&nbsp;完成</span>
        </van-cell>
        <van-cell v-for="item in list" :key="item" :title="item">{{历史记录}}</van-cell>
    </van-list>
    <van-list>
        <van-cell v-for="item in 3" :key="item" :title="item" icon="search"></van-cell>
    </van-list>
    <!-- 搜索结果 -->
    <search-result/>
    <!-- /搜索结果 -->
  </div>
</template>
<script>
import searchResult from './components/search-result'

export default {
  name: 'searchPage',
  components: {
    searchResult
  },
  data () {
    return {
      value: '',
      list: []
    }
  },
  methods: {
    onSearch () {},
    onCancel () {}
  }
}
</script>

<style lang="less" scoped>

</style>
