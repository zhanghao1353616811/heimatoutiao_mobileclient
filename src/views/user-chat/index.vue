<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed @click-left="$router.back()" title="小智同学" left-arrow />
    <!-- /导航栏 -->
    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <!-- :class="{ class类名:布尔值 }"
      true:作用类名 false：不作用类名-->
      <div class="message-item" :class="{ reverse:item.isMe}" v-for="(item,index) in messages" :key="index">
        <van-image class="avatar" slot="icon" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <van-row class="title">
          <span>{{item.msg}}</span>
        </van-row>
      </div>
    </div>
    <!-- /消息列表 -->
    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field v-model.trim="message" center clearable>
        <van-button @click="onSendMessage" slot="button" size="small" type="primary">发送</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: null, // WebSocket 通信对象
      messages: getItem('chat-messages') || [] // 存储所有的消息列表
    }
  },
  methods: {
    onSendMessage () {
      const message = this.message
      if (!message.length) {
        return
      }
      // 消息类型和数据格式 都有要求
      const data = {
        msg: message, // 聊天输入内容
        timestamp: Date.now(), // 聊天发送时间戳
        isMe: true // 自定义一个isMe字段名 表示我发的消息
      }
      // 发送消息
      // socket.emit('消息类型',数据) 数据可以是任何类型
      this.socket.emit('message', data)
      // 将消息存储到列表中
      this.messages.push(data)
      // 清空文本框
      this.message = ''
    },
    toBottom () {
      const messageList = this.$refs['message-list']
      messageList.scrollTop = messageList.scrollHeight
    }
  },
  watch: {
    // 监视函数有两个参数
    // 参数1：最新值
    // 参数2：变化之前的旧值
    messages (value) {
      // 当消息列表发生变化 持久化存储到本地存储
      setItem('chat-messages', value)
      // 让消息列表滚动到底部
      // $nextTick()根据代码执行顺序 数据更新 但是dom还没有加载 这个方法就是等dom更新完才执行
      // 修改完数据之后 马上操作数据影响的这个Dom
      // 什么场景下才需要使用这个 Api ?当你想要在修改数据之后马上操作数据影响的Dom
      // 为了解决这个问题 Vue提供了 一个特殊的Api: $nextTick
      this.$nextTick(() => {
        this.toBottom()
      })
    }
  },
  created () {
    // 建立WebSocket连接 得到 socket 通信对象
    // 这里的请求是 WebSocket 请求 和项目中的axios没任何关系
    const socket = io('http://ttapi.research.itcast.cn') // const socket = io("连接地址")
    // 把 socket 存储到 data 中，然后就可以在 methods 中访问到了
    this.socket = socket
    // 当客户端与服务器建立连接成功，触发 connect 事件
    socket.on('connect', function () {
      console.log('建立连接成功')
    })

    // 测试小技巧 手动将数据成员暴露到全局 就可以在控制台中直接访问了 测试完毕 删除代码、
    // window.socket = socket

    // 接收消息
    // socket.on('消息类型'，data=>console.log(data)) 回调函数参数获取消息数据
    // 监听接收服务端消息
    socket.on('message', message => {
      // console.log('message=>', message)
      this.messages.push(message)
    })
  }
}
</script>

<style scoped lang="less">
.chat-container {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 46px 0 50px 0;
  box-sizing: border-box;
  background: #f5f5f6;
  .message-list {
    height: 100%;
    overflow-y: scroll;
    .message-item {
      display: flex;
      align-items: center;
      padding: 10px;
      .title {
        background: #fff;
        padding: 5px;
        border-radius: 6px;
      }
      .avatar {
        margin-right: 5px;
        width: 30px;
        height: 30px;
      }
    }
    .reverse {
      flex-direction: row-reverse; //设置弹性盒元素的方向为相反的顺序
      .title {
        margin-right: 5px;
      }
    }
  }
  .send-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f5f5f6 !important;
  }
}
</style>
