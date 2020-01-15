<template>
  <div class="search-result">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item">历史记录</van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'search-result',
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      console.log('onload')
    }
  }
}
</script>

<style>

</style>
