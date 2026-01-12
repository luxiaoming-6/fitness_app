<template>
  <view class="challenge-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="nav-center">
        <image class="brand-icon" src="/static/logo.png" mode="aspectFit"></image>
        <view class="brand-info">
          <text class="brand-name">BOOMTANG</text>
          <text class="brand-slogan">Rise to the Challenge</text>
        </view>
      </view>
    </view>
    
    <!-- 标题区域 -->
    <view class="title-section">
      <text class="main-title">挑战赛</text>
      <text class="sub-title">选择你想参加的挑战吧！</text>
    </view>
    
    <!-- 挑战赛列表 -->
    <view class="challenge-list">
      <view class="challenge-item">
        <image class="challenge-image" src="/static/36-80.jpg" mode="aspectCover"></image>
        <view class="challenge-info">
          <text class="challenge-name">攀岩挑战赛</text>
          <text class="challenge-date">一月30日</text>
        </view>
      </view>
      
      <view class="challenge-item">
        <image class="challenge-image" src="/static/35-80.jpg" mode="aspectCover"></image>
        <view class="challenge-info">
          <text class="challenge-name">障碍越野赛</text>
          <text class="challenge-date">二月05日</text>
        </view>
      </view>
      
      <view class="challenge-item">
        <image class="challenge-image" src="/static/37-80.jpg" mode="aspectCover"></image>
        <view class="challenge-info">
          <text class="challenge-name">攀爬架挑战赛</text>
          <text class="challenge-date">二月10日</text>
        </view>
      </view>
    </view>
    
    <!-- 底部信息 -->
    <view class="footer-section">
      <view class="footer-text">
        <text class="competition-info">Competition of the season!</text>
        <text class="competition-period">Jan.01-Apr.31</text>
        <text class="competition-price">256/人</text>
      </view>
      <view class="register-button" @click="handleRegister">
        <text class="register-text">报名</text>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'ChallengePage',
  setup() {
    // 返回上一页
    const goBack = () => {
      uni.navigateBack();
    };
    
    // 报名按钮点击事件
    const handleRegister = () => {
      // 这里可以添加报名逻辑
      uni.showToast({
        title: '报名功能开发中',
        icon: 'none'
      });
    };
    
    onMounted(() => {
      // 页面加载时的初始化逻辑
    });
    
    return {
      goBack,
      handleRegister
    };
  }
};
</script>

<style scoped>
/* 全局样式 */
.challenge-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 40rpx;
}

/* 顶部导航栏 */
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100rpx;
  padding: 0 30rpx;
  background-color: #ff6600;
  color: #ffffff;
  position: relative;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
  position: absolute;
  left: 30rpx;
  top: 50%;
  transform: translateY(-50%);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20rpx;
  position: absolute;
  right: 30rpx;
  top: 50%;
  transform: translateY(-50%);
}

.nav-center {
  display: flex;
  align-items: center;
  gap: 10rpx;
  z-index: 1;
}

.nav-icon {
  width: 40rpx;
  height: 40rpx;
}

.nav-center {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.brand-icon {
  width: 60rpx;
  height: 60rpx;
}

.brand-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.brand-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #ffffff;
}

.brand-slogan {
  font-size: 16rpx;
  color: #ffffff;
  opacity: 0.9;
}

/* 标题区域 */
.title-section {
  padding: 40rpx 30rpx 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: hsl(0deg 0% 94.9%);
}

.main-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333333;
  display: inline-block;
}

.sub-title {
  font-size: 28rpx;
  color: #666666;
  display: inline-block;
}

/* 挑战赛列表 */
.challenge-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  padding: 0 30rpx;
  margin-bottom: 40rpx;
  background: hsl(0deg 0% 94.9%);
  padding-bottom: 20rpx;
}

.challenge-item {
  position: relative;
  width: 100%;
  height: 280rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.1);
}

.challenge-image {
  width: 100%;
  height: 100%;
}

.challenge-info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 30rpx;
  color: #ffffff;
  text-shadow: 1rpx 1rpx 2rpx rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(to right, rgb(241 90 36) 0%, rgba(0, 0, 0, 0) 100%);
}

.challenge-name {
  font-size: 60rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.challenge-date {
  font-size: 32rpx;
  display: block;
}

/* 底部信息 */
.footer-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx;
  margin-bottom: 40rpx;
}

.footer-text {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.competition-info {
  font-size: 32rpx;
  color: #333333;
  font-weight: bold;
  display: block;
}

.competition-period {
  font-size: 28rpx;
  color: #666666;
  display: block;
}

.competition-price {
  font-size: 32rpx;
  color: #ff6600;
  font-weight: bold;
  display: block;
}

.register-button {
  width: 200rpx;
  height: 80rpx;
  background-color: #ff6600;
  border-radius: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-text {
  font-size: 36rpx;
  font-weight: bold;
  color: #ffffff;
}
</style>