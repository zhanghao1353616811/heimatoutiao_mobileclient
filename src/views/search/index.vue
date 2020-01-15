<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在van-search 外层增加form标签且action不为空 即可在ios输入法中显示搜索按钮-->
    <form action="/">
      <van-search v-model="searchContent" @search="onSearch(searchContent)"
        @cancel="onCancel" @focus="isSearchResultShow=false" @input="onSearchInput"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
      ></van-search>
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isSearchResultShow" :q="searchContent"/>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell @click="onSearch(search)" v-for="(search,index) in searchSuggestions" :key="index" icon="search">
        <div slot="title" v-html="highlight(search)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <span>全部删除</span>
        <span>&nbsp;&nbsp;完成</span>
        <van-icon slot="right-icon" name="delete" color="#969799" />
      </van-cell>
      <van-cell v-for="item in 3" :key="item" :title="item">
        <van-icon slot="right-icon" name="close" color="#969799"/>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>
<script>
import searchResult from './components/search-result'
import { getSuggestions } from '@/api/search'

export default {
  name: 'searchPage',
  components: {
    searchResult
  },
  data () {
    return {
      searchSuggestions: [], // 联想建议
      isSearchResultShow: false, // 搜索结果
      searchContent: '' // 搜索内容 联想建议
    }
  },
  methods: {
    highlight (str) {
      const searchContent = this.searchContent
      const reg = RegExp(searchContent, 'gi') // g全局匹配 i忽略大小写
      // 返回值 替换之后的高亮字符串  第一个参数是变量 则用正则表达式
      return str.replace(reg, `<span style="color:red">${searchContent}</span>`)
    },
    async onSearchInput () {
      const searchContent = this.searchContent
      // 1.请求获取数据
      if (!searchContent) {
        return
      }
      const { data } = await getSuggestions(searchContent)
      // 2.将数据添加到组件实例中
      this.searchSuggestions = data.data.options
      console.log(data)
      // 3.模板绑定
    },
    onSearch (q) {
      this.searchContent = q
      this.isSearchResultShow = true// 显示搜索结果
    },
    onCancel () {}
  }
}
</script>

<style lang="less" scoped>
</style>
