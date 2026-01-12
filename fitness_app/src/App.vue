<template>
  <view class="app-container">
    <!-- 页面内容渲染区域 -->
    <view class="app-content">
      <!-- uni-app 路由出口 -->
      <router-view />
    </view>
    <!-- 自定义底部导航栏 -->
    <tab-bar />
  </view>
</template>

<script>
import { ref } from 'vue';
import TabBar from './components/TabBar.vue';

export default {
  name: 'App',
  components: {
    TabBar
  },
  setup() {
    return {};
  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/* 每个页面公共css */
view, text, image, button, input, textarea, navigator {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
}

.app-content {
  flex: 1;
  /* 为底部导航栏预留空间 */
  padding-bottom: 100rpx;
  overflow-y: auto;
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
