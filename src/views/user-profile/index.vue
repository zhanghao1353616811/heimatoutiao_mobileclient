<template>
    <div class="user-profile">
        <van-nav-bar title="个人信息">
            <van-icon slot="left" name="arrow-left" />
        </van-nav-bar>
        <van-cell-group>
            <van-cell title="头像" value="vue">
                <van-image class="avatar" />
            </van-cell>
            <van-cell title="昵称" value="vue"></van-cell>
            <van-cell title="性别" value="女" @click="isActionSheetShow = true">
              <!-- <van-action-sheet slot="right-icon" @select="onSelect" @cancel="onCancel"
              v-model="isActionSheetShow" :actions="actions" cancel-text="取消"/> -->
            </van-cell>
            <van-cell title="生日" is-link>
                <!-- <van-datetime-picker slot="right-icon" v-model="currentDate"
                :visible-item-count="3" type="datetime" :min-date="minDate" :max-date="maxDate"></van-datetime-picker> -->
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'UserProfile',
  data () {
    return {
    //   isActionSheetShow: false, // 展示 ActionSheet 上拉菜单
    //   actions: [
    //     { name: '男' },
    //     { name: '女' }
    //   ],
    //   minDate: new Date(2020, 1, 25),
    //   maxDate: new Date(2025, 10, 25),
    //   currentDate: new Date()
    }
  },
  methods: {
    // onCancel () {
    //   Toast('cancel')
    //   this.isActionSheetShow = false
    // },
    // // item: 选项对应的对象, index: 选择对应的索引
    // onSelect (item) {
    //   Toast(item.name)
    //   this.isActionSheetShow = false
    // }
  }
}
</script>

<style scoped lang="less">
.user-profile{
    .avatar{

    }
}
</style>
