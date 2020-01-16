<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar @click-left="$router.back()" title="文章详情" left-arrow />
    <!-- /导航栏 -->
    <van-row class="article-box">
      <!-- 加载中 -->
      <van-loading class="article-loading" color="#1989fa" vertical>
        <slot>加载中...</slot>
      </van-loading>
      <!-- /加载中 -->
      <!-- 文章详情 -->
      <van-row class="article-detail">
        <h3 class="article-title">Ajax用户注册验证 验证合格才能提</h3>
        <van-row class="article-author" type="flex" justify="space-between" align="center">
          <van-col class="article-info">
            <img class="avatar" src="../../assets/images/mobile.png" alt />
            <van-row class="info-text">
              <van-col class="info-name">18811179159</van-col>
              <van-col class="info-time">1 年前</van-col>
            </van-row>
          </van-col>
          <van-button class="follow-btn" round size="mini" type="info">+关注</van-button>
        </van-row>
        <Van-row class="markdown-body">
          <p>作为战斗在业务一线的前端，要想少加班，就要想办法提高工作效率。这里提一个小点，我们在业务开发过程中，经常会重复用到日期格式化、url参数转对象、浏览器类型判断、节流函数等一类函数，这些工具类函数，基本上在每个项目都会用到，为避免不同项目多次复制粘贴的麻烦，我们可以统一封装，发布到npm，以提高开发效率。</p>
          <p>使用 Object.prototype.toString 配合闭包，通过传入不同的判断类型来返回不同的判断函数，一行代码，简洁优雅灵活（注意传入 type 参数时首字母大写）</p>
          <p>使用 Object.prototype.toString 配合闭包，通过传入不同的判断类型来返回不同的判断函数，一行代码，简洁优雅灵活（注意传入 type 参数时首字母大写）</p>
          <p>使用 Object.prototype.toString 配合闭包，通过传入不同的判断类型来返回不同的判断函数，一行代码，简洁优雅灵活（注意传入 type 参数时首字母大写）</p>
          <p>使用 Object.prototype.toString 配合闭包，通过传入不同的判断类型来返回不同的判断函数，一行代码，简洁优雅灵活（注意传入 type 参数时首字母大写）</p>
        </Van-row>
      </van-row>
      <!-- /文章详情 -->
      <!-- 加载失败提示 -->
      <van-col class="article-error">
        <img src="../../assets/images/no-network.png" alt />
        <p class="error-text">网络不给力哦</p>
        <van-button class="error-btn" type="default" size="small" color="#ccc">点击重试</van-button>
      </van-col>
      <!-- /加载失败提示 -->
    </van-row>
    <!-- 底部区域 -->
    <van-row class="article-footer">
      <van-button class="write-btn" type="default" round size="small">写评论</van-button>
      <van-icon class="comment-icon" name="comment-o" />
      <van-icon color="orange" name="star-o" />
      <van-icon color="#e5645f" name="good-job-o" />
      <van-icon class="share-icon" name="share" />
    </van-row>
    <!-- /底部区域 -->
  </div>
</template>

<script>
export default {
  name: 'articlePage'
}
</script>
<style lang="less" scoped>
@import "./github-markdown.css";
.article-container {
  background: #fff;
  .article-box {
    padding: 0 20px 50px;
    .article-loading {
      padding-top: 100px;
      text-align: center;
    }
    .article-detail {
      .article-title {
        margin: 0;
        padding-top: 24px;
        font-size: 20px;
        color: #3a3a3a;
      }
      .article-author {
        padding: 20px 0;
        height: 40px;
        .article-info {
          display: flex;
          align-items: center;
          .avatar {
            width: 40px;
            height: 40px;
            margin-right: 8px;
          }
          .info-text {
            display: flex;
            flex-direction: column;
            .info-name {
              margin: 0;
              font-size: 14px;
            }
            .info-time {
              margin: 0;
              font-size: 12px;
              color: #999;
            }
          }
        }
        .follow-btn {
          width: 100px;
          height: 30px;
        }
      }
    }
    .article-error {
      padding-top: 100px;
      text-align: center;
      .error-text {
        font-size: 15px;
      }
      .error-btn {
        width: 30%;
      }
    }
  }
  .article-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
