<template>
  <van-row class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <!--
    表单验证：
    1.使用 ValidationObserver 组件把需要验证的整个表单包起来
    2.使用 ValidationProvider 组件把具体的表单元素包起来 例如input
        name 配置字段的提示名称
        rules 配置校验规则
      自定义规则:
      单个验证规则： rules="required"
      多个验证规则: rules="requires|mobile" 加管道
      v-slot="{errors}"获取校验失败的错误提示消息
    -->
    <ValidationObserver ref="myForm">
      <!-- 在ValidationObserver中最初不验证 但你可以使用immediate来立即验证你的字段 -->
      <ValidationProvider immediate name="手机号" rules="required|mobile">
        <van-field v-model="userInfo.mobile" placeholder="请输入手机号">
          <van-icon slot="left-icon" class-prefix="icon" name="yidongmobile216" />
        </van-field>
      </ValidationProvider>
      <ValidationProvider immediate name="验证码" rules="required|code">
        <van-field v-model="userInfo.code" placeholder="请输入验证码" class="verification-code">
          <van-icon slot="left-icon" class-prefix="icon" name="icon--" />
          <van-button @click="sendSmsCode" v-if="!isCountDownShow" round size="small" type="primary" slot="button">
            获取验证码
          </van-button>
          <van-count-down @finish="isCountDownShow=false" v-else format="ss s" :time="1000*60" slot="button"/>
        </van-field>
      </ValidationProvider>
    </ValidationObserver>
    <!-- /登录表单 -->
    <van-row class="loginBtn">
      <van-button type="info" @click="userLogin">登录</van-button>
    </van-row>
  </van-row>
</template>

<script>
import { userLogin, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'

export default {
  name: 'LoginPage',
  data () {
    return {
      isCountDownShow: false, // 是否显示倒计时
      userInfo: {
        mobile: '13911111111', // 手机号
        code: '246810' // 短信验证码
      }
    }
  },
  methods: {
    async sendSmsCode () {
      const { mobile } = this.userInfo
      // 1.验证手机号是否有效
      // 参数1 验证的数据 参数2 验证规则 参数3 一个可选的配置对象 例如配置错误消息字段名称 name
      // 返回值 { valid,errors,... } valid 验证是否成功  成功 true 失败 false errors 一个数组 错误提示消息
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      try {
        // 2.请求发送短信验证码
        // res是then中成功后接收的结果
        const res = await getSmsCode(mobile)
        console.log(res)
        // 3.显示倒计时
        this.isCountDownShow = true
      } catch (error) {
        console.log(error)
        if (error.response.status === 429) {
          this.$toast.fail('请勿重复操作')
          return
        }
        this.$toast.fail('发送失败')
        // 发送失败关闭倒计时
        this.isCountDownShow = false
      }
    },
    async userLogin () {
      // 1.获取表单数据
      const userInfo = this.userInfo
      // 2.表单验证
      const success = await this.$refs.myForm.validate()
      if (!success) {
        // 表单验证失败处理
        console.log('表单验证失败')
        const errors = this.$refs.myForm.errors
        console.log(errors)
        for (let key in errors) {
          const item = errors[key]
          console.log(item)
          if (item[0]) {
            this.$toast(item[0])
            // 找到第一个有错误的消息 给出提示 停止遍历
            return // 中断
          }
        }
        return // 中断
      }
      // 表单验证成功处理

      // 开启登陆中 loading
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 是否禁止背景点击
        message: '登陆中...'
      })
      // 手动停止提示
      // 提示对象.clear()
      try {
        // 3.请求登录
        const res = await userLogin(userInfo)
        // 将登陆成功获取到的用户 token 相关数据存储到 Vuex 容器
        this.$store.commit('setUser', res.data.data)
        console.log('登陆成功', res)
        // 提示成功
        this.$toast.success('登录成功')
        // 跳转到首页
        this.$router.push('/')
      } catch (error) {
        console.log('登录失败', error)
        this.$toast.fail('登录失败,手机号或验证码不对')
      }
      // 4.根据后端返回结果执行后续业务处理
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .verification-code {
    height: 47px;
    display: flex;
    align-items: center;
    border-top: 1px solid rgb(133, 129, 129);
    border-bottom: 1px solid rgb(133, 129, 129);
  }
  .loginBtn {
    padding: 27px 16px;
    .van-button--normal {
      width: 100%;
      border-radius: 5px;
      background-color: #6db4fa;
    }
  }
}
</style>
