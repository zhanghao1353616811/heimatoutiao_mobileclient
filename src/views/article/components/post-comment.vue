<template>
  <div class="post-comment">
    <!-- :value 是vant组件中属性 当前文本域输入的值 来接收父组件传给子组件的value -->
    <van-field class="post-field" :value="value" @input="$emit('input',$event)"
      autosize type="textarea" maxlength="50" show-word-limit placeholder="优质评论将会被优先展示">
    </van-field>
    <van-button class="post-btn" size="small" @click="$emit('click-post')">发布</van-button>
  </div>
</template>

<script>
export default {
  name: 'PostComment',
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.post-comment{
  padding: 16px;
  display: flex;
  align-items:center;
  .post-field{
    background: #f5f7f9;
  }
  .post-btn{
    border: none;
  }
}
</style>
