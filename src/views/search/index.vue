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
    <search-result v-if="isSearchResultShow" :searchContent="searchContent"/>
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
        <template v-if="isDeleteShow">
          <span @click="searchHistories=[]">全部删除</span>
          <span @click="isDeleteShow=false">&nbsp;&nbsp;完成</span>
        </template>
        <van-icon v-else @click="isDeleteShow=true" slot="right-icon" name="delete" color="#969799" />
      </van-cell>
      <van-cell @click="onHistoriesClick(search,index)" v-for="(search,index) in searchHistories" :key="index" :title="search">
        <!-- v-show是否显示关闭图标 -->
        <van-icon v-show="isDeleteShow" slot="right-icon" name="close" color="#969799"/>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>
<script>
import { debounce } from 'lodash'
import { getSuggestions } from '@/api/search'
import { setItem, getItem } from '@/utils/storage'
import searchResult from './components/search-result'

export default {
  name: 'searchPage',
  components: {
    searchResult
  },
  data () {
    return {
      searchContent: '', // 搜索内容 联想建议
      searchHistories: getItem('search-histories') || [], // 从本地获取存储数据 有数据就用第一个 没有为null 则v-for循环会报错 所以第二个用[]
      searchSuggestions: [], // 联想记忆
      isSearchResultShow: false, // 是否展示搜索结果
      isDeleteShow: false // 删除历史记录的显示状态
    }
  },
  watch: {
    // 监听 参数1: 改变后的数据 参数2: 变化之前的数据
    searchHistories (val) {
      // console.log(val)
      setItem('search-histories', val) // 将搜索历史记录存储在本地
    }
  },
  methods: {
    // 取消搜索
    onCancel () {
      this.searchContent = ''
    },
    onHistoriesClick (search, index) {
      // 如果是删除状态 则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 否则执行搜索操作
        this.onSearch(search)
      }
    },
    onSearch (searchContent) {
      // 1.更新搜索文本框的数据
      this.searchContent = searchContent
      // 2.记录搜索历史记录
      const searchHistories = this.searchHistories
      const index = searchHistories.indexOf(searchContent)
      if (index !== -1) {
        searchHistories.splice(index)
      }
      this.searchHistories.unshift(searchContent)
      // 3.展示搜索结果
      this.isSearchResultShow = true// 显示搜索结果
    },
    // 高亮显示搜索文字
    highlight (str) {
      const searchContent = this.searchContent
      const reg = RegExp(searchContent, 'gi') // g全局匹配 i忽略大小写
      // 返回值 替换之后的高亮字符串  第一个参数是变量 则用正则表达式
      return str.replace(reg, `<span style="color:red">${searchContent}</span>`)
    },
    // 联想记忆
    // onSearchInput: async function (){} Es6完整写法
    // debounce 函数 参数1: 函数 参数2: 防抖时间 返回值:防抖之后的函数 和参数1功能一样
    onSearchInput: debounce(async function () {
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
    }, 200)
  }
}
</script>

<style lang="less" scoped>
.van-search__action{
  background-color: #3296fa;
}
</style>
