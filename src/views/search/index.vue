<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在van-search 外层增加form标签且action不为空 即可在ios输入法中显示搜索按钮-->
    <form action="/" slot="left">
      <van-search v-model="value" @search="onSearch"
        @cancel="onCancel"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
      ></van-search>
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isSearchResultShow" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell v-for="item in 3" :key="item" :title="item" icon="search"></van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <span>全部删除</span>
        <span>&nbsp;&nbsp;完成</span>
        <van-icon slot="right-icon" name="delete" color="#969799" />
      </van-cell>
      <van-cell v-for="item in list" :key="item" :title="item">历史记录</van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
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
      list: [],
      isSearchResultShow: 'false', // 搜索结果
      searchContent: 'false' // 历史记录
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
