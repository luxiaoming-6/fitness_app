<template>
  <view class="tab-bar">
    <view 
      v-for="(item, index) in tabList" 
      :key="index"
      class="tab-item"
      
      @click="switchTab(index)"
    >
    <!-- :class="{ 'floating-item': index === 2 }" -->
      <view class="tab-icon">
        <image 
          :src="activeIndex === index ? item.selectedIcon : item.icon" 
          mode="aspectFit"
        ></image>
      </view>
      <!-- <view class="tab-text">{{ item.text }}</view> -->
    </view>
  </view>
</template>

<script>
import { ref, onMounted, watch } from 'vue';

export default {
  name: 'TabBar',
  // 使用UniApp的生命周期钩子
  onShow() {
    // 页面显示时更新选中状态
    this.updateActiveIndex();
  },
  setup() {
    // 底部导航栏数据
    const tabList = ref([
      {
        text: '在线课程',
        icon: '/static/tabbar/icons-02.png',
        selectedIcon: '/static/tabbar/icons-02.png',
        path: '/pages/index/shouye'
      },
      {
        text: '线下预约',
        icon: '/static/tabbar/icons-03.png',
        selectedIcon: '/static/tabbar/icons-03.png',
        path: '/pages/exercise/exercise'
      },
      {
        text: '线下课程',
        icon: '/static/tabbar/icons-04.png',
        selectedIcon: '/static/tabbar/icons-04.png',
        path: '/pages/exercise/exercise'
      },
      {
        text: '电子商城',
        icon: '/static/tabbar/icons-05.png',
        selectedIcon: '/static/tabbar/icons-05.png',
        path: '/pages/mall/index'
      },
      {
        text: '我的',
        icon: '/static/tabbar/icons-06.png',
        selectedIcon: '/static/tabbar/icons-06.png',
        path: '/pages/profile/profile'
      }
    ]);
    
    // 当前选中的索引
    const activeIndex = ref(0);
    
    // 安全区域底部距离
    const safeAreaBottom = ref(0);
    
    // 根据当前路由获取选中索引
    const getActiveIndex = () => {
      // 使用uni的API获取当前页面路径
      const pages = getCurrentPages();
      if (pages.length > 0) {
        const currentPage = pages[pages.length - 1];
        const currentPath = `/${currentPage.route}`;
        const index = tabList.value.findIndex(item => item.path === currentPath);
        return index >= 0 ? index : 0;
      }
      return 0;
    };
    
    // 切换tab
    const switchTab = (index) => {
      const item = tabList.value[index];
      if (item) {
        // 使用uni的API进行页面跳转
        uni.navigateTo({
          url: item.path
        });
        activeIndex.value = index;
      }
    };
    
    // 监听页面显示，更新选中状态
    const updateActiveIndex = () => {
      activeIndex.value = getActiveIndex();
    };
    
    // 获取设备安全区域
    const getSafeArea = () => {
      try {
        const systemInfo = uni.getSystemInfoSync();
        // 获取底部安全区域高度（px）
        const bottomPx = systemInfo.safeAreaInsets?.bottom || 0;
        // 将px转换为rpx（1px = 2rpx）
        safeAreaBottom.value = bottomPx * 2;
      } catch (error) {
        console.error('获取安全区域失败:', error);
        safeAreaBottom.value = 0;
      }
    };
    
    // 初始化时获取选中索引和安全区域
    onMounted(() => {
      getSafeArea();
      updateActiveIndex();
    });
    
    return {
      tabList,
      activeIndex,
      switchTab,
      updateActiveIndex,
      safeAreaBottom
    };
  }
};
</script>

<style scoped>
/* CSS变量定义 */
:root {
  --tab-bar-height: 100rpx;
  --tab-bar-padding: 10rpx;
  --tab-icon-size: 48rpx;
  --tab-icon-large-size: 64rpx;
  --tab-text-size: 24rpx;
  --tab-bar-bg-color: #fff;
  --tab-bar-active-color: #007aff;
  --tab-bar-inactive-color: #666;
  --floating-offset: -25rpx;
  --safe-area-inset-bottom: 0rpx;
  --tab-bar-safe-padding: 30rpx;
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* 不设置固定高度，让内容决定高度 */
  height: auto;
  background-color: rgb(228 89 40);
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 999;
  /* 确保导航栏有足够的高度 */
  min-height: var(--tab-bar-height);
  /* 添加顶部内边距，确保内容不紧贴顶部 */
  /* padding-top: var(--tab-bar-safe-padding); */
  /* 底部安全区域处理 - 使用padding确保背景色覆盖安全区域 */
  padding-bottom: var(--safe-area-inset-bottom);
  /* 确保背景覆盖整个区域 */
  background-clip: padding-box;
  box-sizing: border-box;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
  position: relative;
  transition: all 0.3s ease;
  z-index: 999;
}

.tab-icon {
  padding-top: 8rpx;
  height: 48px;
  width: 48px;
  margin-bottom: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.tab-icon image {
  width: 100%;
  height: 100%;
}

.tab-text {
  font-size: var(--tab-text-size);
  color: var(--tab-bar-inactive-color);
  transition: all 0.3s ease;
}

.tab-item.active .tab-text {
  color: var(--tab-bar-active-color);
  font-weight: 500;
}

/* 超出底部导航栏的图标样式 */
.tab-item.floating-item {
  /* 向下偏移，超出导航栏 */
  margin-bottom: var(--floating-offset);
  z-index: 1000;
  /* 确保图标显示在最上层 */
}

.tab-item.floating-item .tab-icon {
  width: var(--tab-icon-large-size);
  height: var(--tab-icon-large-size);
  background-color: var(--tab-bar-active-color);
  border-radius: 50%;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);
  /* 添加阴影效果 */
  border: 8rpx solid var(--tab-bar-bg-color);
  /* 添加边框，与背景色一致，形成悬浮效果 */
  margin-bottom: 4rpx;
  animation: bounceIn 0.5s ease-out;
}

/* 悬浮图标选中时的样式 */
.tab-item.floating-item.active .tab-icon {
  background-color: #0051d4;
  /* 选中时颜色加深 */
  transform: scale(1.05);
  /* 轻微放大效果 */
}

/* 页面内容区域需要添加的样式（在页面组件中使用） */
/* .page-content {
  padding-bottom: calc(var(--tab-bar-height) + var(--safe-area-inset-bottom) * 2rpx);
} */

/* 简单的动画效果 */
@keyframes bounceIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
</style>