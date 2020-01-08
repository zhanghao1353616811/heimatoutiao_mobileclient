<template>
    <div class="login-Container">
        <van-nav-bar title="登录"></van-nav-bar>
        <van-row style="padding: 0 16px">
            <van-cell-group class="search-mobile">
            <van-icon class-prefix="icon" name="yidongmobile216"></van-icon>
            <van-field v-model="userInfo.mobile" placeholder="请输入手机号"></van-field>
        </van-cell-group>
        <van-cell-group class="verification-code">
            <van-icon class-prefix="icon" name="icon--"></van-icon>
            <van-field v-model="userInfo.code" placeholder="请输入验证码">
                <van-button v-if="!isCountDown" round slot="button" size="small" type="primary">获取验证码</van-button>
                <van-count-down v-else slot="button" format="SS s" :time="1000*60"></van-count-down>
            </van-field>
        </van-cell-group>
        <van-button type="info" @click="userLogin">登录</van-button>
        </van-row>
    </div>
</template>

<script>
import { userLogin } from '@/api/user.js'
export default {
  name: 'loginPage',
  data () {
    return {
      isCountDown: false,
      userInfo: {
        mobile: '', // 手机号
        code: '' // 短信验证码
      }
    }
  },
  methods: {
    async userLogin () {
      const userInfo = this.userInfo
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '登陆中...'
      })
      try {
        const res = await userLogin(userInfo)
        console.log('登陆成功', res)
        this.$toast.success('登录成功')
      } catch (error) {
        console.log('登录失败', error)
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-Container {
    .icon{
       font-size: 22px;
    }
    .search-mobile {
       display: flex;
       align-items: center;
       border-top:1px solid #a7a3a3;
   }
   .verification-code{
       display: flex;
       align-items: center;
       border-top:1px solid #cccccc;
       border-bottom:1px solid #a7a3a3;
   }
   .van-button--normal{
       width: 100%;
       background-color: #6DB4FA;
       margin-top: 27px;
       border-radius: 6px;
   }
}
</style>
