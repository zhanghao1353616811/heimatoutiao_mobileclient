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
      <van-cell @click="isEditNameShow = true" :value="UserProfile.name" title="昵称" is-link />
      <van-cell @click="isEditGenderShow = true"
      :value="UserProfile.gender === 0 ? '男' : '女'" title="性别" is-link />
      <van-cell @click="isEditBirthdayShow = true" :value="UserProfile.birthday" title="生日" is-link />
    </van-cell-group>
    <!-- 头像预览 -->
    <van-image-preview @close="$refs.file.value=''" v-model="isPreviewShow" :images="images"/>
    <!-- /头像预览 -->
    <!-- 修改用户昵称 -->
    <van-popup v-model="isEditNameShow" position="bottom" :style="{ height: '22%' }">
      <van-nav-bar @click-left="isEditNameShow = false" @click-right="onUpdateName"
      title="昵称" left-text="取消" right-text="完成" />
      <!-- field 组件中有一个 input 事件 输入框内容变化时触发 该事件接收一个回调参数value value:输入框当前值-->
      <van-field @input="inputName = $event" :value="UserProfile.name"
      rows="2" autosize type="textarea" maxlength="20" placeholder="请输入昵称" show-word-limit />
    </van-popup>
    <!-- /修改用户昵称 -->
    <!-- 编辑用户性别 -->
    <van-action-sheet @select="onGenderSelect" @cancel="isEditGenderShow = false"
    v-model="isEditGenderShow" :actions="actions" cancel-text="取消"/>
    <!-- /编辑用户性别 -->
    <!-- 编辑用户生日 -->
    <van-popup v-model="isEditBirthdayShow" position="bottom" >
      <van-datetime-picker @confirm="onUpdateBirthday" @cancel="isEditBirthdayShow = false"
      :value="currentDate" type="date" :min-date="minDate" :max-date="maxDate" />
    </van-popup>
    <!-- /编辑用户生日 -->
  </div>
</template>

<script>
import moment from 'moment'
import { ImagePreview } from 'vant'
import { getUserProfile, updateUserPhoto, updateUserProfile } from '@/api/user'

export default {
  name: 'UserProfile',
  data () {
    return {
      UserProfile: {},
      images: [], // 预览的图片列表
      isPreviewShow: false, // 预览图片
      isEditNameShow: false, // 修改用户昵称
      inputName: '', // 输入框的数据
      isEditGenderShow: false,
      isEditBirthdayShow: false, // 展示 ActionSheet 上拉菜单
      actions: [
        // name 会显示出来 value 是我们自己添加的的
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ],
      minDate: new Date(1970, 1, 1),
      maxDate: new Date()
    }
  },
  methods: {
    async onUpdateBirthday (value) {
      // console.log(value)
      // 使用 moment 把日期对象格式化为指定格式的字符串
      const date = moment(value).format('YYYY-MM-DD')
      // 请求提交
      await this.updateUserProfile('birthday', date)
      // 更新视图
      this.UserProfile.birthday = date
      // 关闭弹层
      this.isEditBirthdayShow = false
    },
    async onGenderSelect (data) {
      // console.log(data)
      // 请求提交
      await this.updateUserProfile('gender', data.value)
      // 更新视图展示
      this.UserProfile.gender = data.value
      // 关闭上拉菜单
      this.isEditGenderShow = false
    },
    async onUpdateName () {
      // 请求提交表单
      await this.updateUserProfile('name', this.inputName)
      // 更新视图
      this.UserProfile.name = this.inputName
      // 关闭用户昵称
      this.isEditNameShow = false
    },
    // field 要修改的数据字段
    // value:数据值
    async updateUserProfile (field, value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        await updateUserProfile({
          [field]: value // 注意属性名使用中括号包裹 否则会当做字符串来使用而不是变量
        })
        this.$toast.success('修改成功')
      } catch (error) {
        // console.log(error)
        this.$toast.fail('修改失败')
      }
    },
    onFileChange () {
      // 预览图片
      // 2. 使用 window.URL.createObjectURL(file) 得到文件数据
      const fileData = URL.createObjectURL(this.file.files[0])
      this.images = [fileData] // 这里直接重置数组，防止出现多个预览图片
      this.isPreviewShow = true
      ImagePreview({
        images: [fileData], // 预览的图片列表
        onClose: this.updateAvatar
      })
    },
    async updateAvatar () {
      try {
        await this.$dialog.confirm({
          title: '头像选择',
          message: '是否使用该图片作为头像'
        })
        // 如果 Content-Type 要求是 application/json 则 data 传普通对象 {}
        // 如果 Content-Type 要求是 multipart/form-data 则 data 传 FormData 对象
        // 纵观所有数据接口，你会发现大多数的接口都要求 Content-Type 要求是 application/json
        // 一般只有涉及到文件上传的数据接口才要求Content-Type 要求是 multipart/form-data
        // 这个时候传递一个 FormData 对象
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          message: '保存中...',
          forbidClick: true // 是否禁止背景点击
        })
        // 1. 拿到 file 类型 input 选择的文件对象
        const fileObj = this.file.files[0]
        // 构造包含文件的表单对象
        const fd = new FormData()
        // formData.append('名字', 数据)
        fd.append('photo', fileObj)
        // 请求提交
        const { data } = await updateUserPhoto(fd)
        // 更新视图
        this.UserProfile.photo = data.data.photo
        // 关闭图片预览
        this.isPreviewShow = false
        // 提示成功
        this.$toast.success('上传成功')
      } catch (error) {
        // console.log(error)
        this.isPreviewShow = false
        this.$toast.fail('上传失败')
      }
    },
    onSelectFile () {
      // 手动触发 input 的点击事件
      this.file.click()
    },
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        // console.log(data)
        this.UserProfile = data.data
      } catch (error) {
        // console.log(error)
        this.$toast.fail('加载数据失败')
      }
    }
  },
  computed: {
    // 这里目的主要是为了访问方便
    // 每次访问 ref 成员都需要 this.$refs['file]
    // 因为多次访问到了该成员 所以我可以使用计算属性封装简化对成员的访问
    file () {
      return this.$refs['file']
    },
    currentDate () {
      // 把字符串格式的日期转化为js日期对象 设置给 vant 日期选择器
      return new Date(this.UserProfile.birthday)
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
  .van-popup{
    background-color: #333;
    /deep/.van-nav-bar{
      background: #fff;
      .van-nav-bar__title{
        color: #333
      }
    }
     .van-cell{
        padding: 10px;
        background-color: #ededed;
        /deep/.van-cell__value{
        background-color: #fff;
        }
      }
  }
}
</style>
