<template>
  <div class="search-result">
      <van-list>
        <van-cell v-for="item in 3" :key="item" :title="item">
            <van-icon slot="right-icon" name="close" color="#969799"/>
        </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
