<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息">
      <van-icon @click="$router.back()" slot="left" name="arrow-left" />
    </van-nav-bar>
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image @click="onSelectFile" :src="UserProfile.photo" class="avatar" round fit="cover" />
        <input @change="onFileChange" ref="file" hidden type="file" />
      </van-cell>
      <van-cell :value="UserProfile.name" title="昵称" is-link></van-cell>
      <van-cell :value="UserProfile.gender===0?'男':'女'" title="性别" is-link>
        <!-- <van-action-sheet slot="right-icon" @select="onSelect" @cancel="onCancel"
        v-model="isActionSheetShow" :actions="actions" cancel-text="取消"/>-->
      </van-cell>
      <van-cell :value="UserProfile.birthday" title="生日" is-link>
        <!-- <van-datetime-picker slot="right-icon" v-model="currentDate"
        :visible-item-count="3" type="datetime" :min-date="minDate" :max-date="maxDate"></van-datetime-picker>-->
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// import { Toast } from 'vant'
import { ImagePreview } from 'vant'
import { getUserProfile, updateUserPhoto } from '@/api/user'

export default {
  name: 'UserProfile',
  data () {
    return {
      UserProfile: {}
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
    onFileChange () {
      // 预览图片
      const fileData = URL.createObjectURL(this.file.files[0])
      ImagePreview({
        images: [fileData],
        onClose: this.savePhoto
      })
    },
    async savePhoto () {
      try {
        await this.$dialog.confirm({
          title: '头像选择',
          message: '是否使用该图片作为头像'
        })
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          message: '保存中...',
          forbidClick: true // 是否禁止背景点击
        })
        // 通过file-input 获取文件对象
        const fileObj = this.file.files[0]
        const fileData = URL.createObjectURL(fileObj)
        // 构造包含文件的表单对象
        const fd = new FormData()
        fd.append('photo', fileObj)
        // 请求提交
        await updateUserPhoto(fd)
        // 更新视图
        this.UserProfile.photo = fileData
        // 提示成功
        this.$toast.success('上传成功')
      } catch (error) {
        console.log(error)
        this.$dialog.close()
        this.$toast.fail('上传失败')
      }
    },
    onSelectFile () {
      this.file.click()
    },
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        //  console.log(data)
        this.UserProfile = data.data
      } catch (error) {
        console.log(error)
        this.$toast.fail('加载数据失败')
      }
    }
    // onCancel () {
    //   Toast('cancel')
    //   this.isActionSheetShow = false
    // },
    // // item: 选项对应的对象, index: 选择对应的索引
    // onSelect (item) {
    //   Toast(item.name)
    //   this.isActionSheetShow = false
    // }
  },
  computed: {
    file () {
      return this.$refs['file']
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 30px;
    height: 30px;
  }
}
</style>
