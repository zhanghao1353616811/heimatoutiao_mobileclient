<template>
    <div class="login-Container">
        <van-nav-bar title="登录"></van-nav-bar>
        <ValidationObserver>
            <ValidationProvider name="手机号" rules="required" v-slot="{errors}" class="search-mobile">
                <van-field v-model="userInfo.mobile" placeholder="请输入手机号">
                    <van-icon slot="left-icon" class-prefix="icon" name="yidongmobile216"></van-icon>
                </van-field>
            </ValidationProvider>
            <ValidationProvider class="verification-code">
                <van-field v-model="userInfo.code" placeholder="请输入验证码">
                    <van-icon slot="left-icon" class-prefix="icon" name="icon--"></van-icon>
                    <van-button @click="sendSmsCode" v-if="!isCountDownShow" round slot="button" size="small" type="primary">获取验证码</van-button>
                    <van-count-down @finish="isCountDownShow=false" v-else slot="button" format="SS s" :time="1000*60"></van-count-down>
                </van-field>
            </ValidationProvider>
        </ValidationObserver>
        <van-button type="info" @click="userLogin">登录</van-button>
    </div>
</template>

<script>
import { userLogin, getSmsCode } from '@/api/user.js'
export default {
  name: 'loginPage',
  data () {
    return {
      isCountDownShow: false,
      userInfo: {
        mobile: '', // 手机号
        code: '' // 短信验证码
      }
    }
  },
  methods: {
    async sendSmsCode () {
      const { mobile } = this.userInfo
      try {
        this.isCountDownShow = true
        const res = await getSmsCode(mobile)
        console.log(res)
      } catch (error) {
        console.log(error)
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('请勿重复操作')
          return
        }
        this.$toast('发送失败')
      }
    },
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
   }
   .verification-code{
       border-top:1px solid #ccc;
       border-bottom:1px solid #ccc;
   }
   .van-button--normal{
       width: 100%;
       background-color: #6DB4FA;
       margin-top: 27px;
       border-radius: 6px;
   }
}
</style>
