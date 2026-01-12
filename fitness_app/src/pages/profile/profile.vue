<template>
  <view class="profile-container">
    <!-- 顶部导航栏 -->
    <top-navbar></top-navbar>

    <!-- 用户信息区域 -->
    <view class="user-info-section">
      <view class="user-avatar-container">
        <image class="user-avatar" src="/static/7989b5.png" mode="aspectFill"></image>
      </view>
      <view class="user-details">
        <text class="user-name">Chris Y</text>
        <text class="user-campus">学员(北京校区)</text>
        <view class="member-validity">会员至01/05/2026</view>
      </view>
      <view class="user-more">
        <text class="icon-more-text">•••</text>
      </view>
    </view>

    <!-- 功能图标区域 -->
    <view class="function-icons-section">
      <view class="icon-grid">
        <view class="icon-item">
          <image class="icon" src="/static/icons/43@2x.png" mode="aspectFit"></image>
          <!-- <text class="icon-label">网课</text> -->
        </view>
        <view class="icon-item">
          <image class="icon" src="/static/icons/44@2x.png" mode="aspectFit"></image>
          <!-- <text class="icon-label">书签</text> -->
        </view>
        <view class="icon-item">
          <image class="icon" src="/static/icons/45@2x.png" mode="aspectFit"></image>
          <!-- <text class="icon-label">预约</text> -->
        </view>
        <view class="icon-item">
          <image class="icon" src="/static/icons/46@2x.png" mode="aspectFit"></image>
          <!-- <text class="icon-label">计划</text> -->
        </view>
        <view class="icon-item">
          <image class="icon" src="/static/icons/47@2x.png" mode="aspectFit"></image>
          <!-- <text class="icon-label">活动</text> -->
        </view>
      </view>
      <view class="icon-grid">
        <view class="icon-item">
          <image class="icon" src="/static/icons/48@2x.png" mode="aspectFit"></image>
          <!-- <text class="icon-label">收藏</text> -->
        </view>
        <view class="icon-item">
          <image class="icon" src="/static/icons/49@2x.png" mode="aspectFit"></image>
          <!-- <text class="icon-label">订单</text> -->
        </view>
        <view class="icon-item">
          <image class="icon" src="/static/icons/50@2x.png" mode="aspectFit"></image>
          <!-- <text class="icon-label">物流</text> -->
        </view>
        <view class="icon-item">
          <image class="icon" src="/static/icons/51@2x.png" mode="aspectFit"></image>
          <!-- <text class="icon-label">信息</text> -->
        </view>
        <view class="icon-item">
          <image class="icon" src="/static/icons/52@2x.png" mode="aspectFit"></image>
          <!-- <text class="icon-label">会员</text> -->
        </view>
      </view>
    </view>

    <!-- 进度条区域 -->
    <view class="progress-section">
      <view class="progress-item">
        <text class="progress-label">网络课程</text>
        <text class="progress-percentage">30%</text>
        <view class="progress-bar-container">
          <view class="progress-bar">
          <view class="progress-fill" style="--progress-width: 30%"></view>
        </view>
        </view>
        <text class="progress-sub-label">观看完成度</text>
      </view>
      <view class="progress-item">
        <text class="progress-label">锻炼计划</text>
        <text class="progress-percentage">30%</text>
        <view class="progress-bar-container">
          <view class="progress-bar">
            <view class="progress-fill" style="--progress-width: 30%"></view>
          </view>
        </view>
        <text class="progress-sub-label">完成度</text>
      </view>
    </view>

    <!-- 成就区域 -->
    <view class="achievements-section">
      <text class="section-title">我的成就</text>
      <view class="achievement-list">
        <view class="achievement-item gold">
          <text class="achievement-title">2025春季挑战 攀岩项目</text>
          <text class="achievement-rank">冠军</text>
        </view>
        <view class="achievement-item silver">
          <text class="achievement-title">2025春季挑战 单车项目</text>
          <text class="achievement-rank">亚军</text>
        </view>
        <view class="achievement-item bronze">
          <text class="achievement-title">2025春季挑战 体操项目</text>
          <text class="achievement-rank">季军</text>
        </view>
      </view>
    </view>

    <!-- 自定义底部导航栏 -->
    <tab-bar />
  </view>
</template>

<script>
import TabBar from '../../components/TabBar.vue';
import TopNavbar from '../../components/TopNavbar.vue';

export default {
  name: 'ProfilePage',
  components: {
    TabBar,
    TopNavbar
  },
  setup() {
    return {
      // 页面逻辑
    };
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 顶部导航栏 */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background-color: #ff6600;
  color: #fff;
  height: 120rpx;
}

.nav-left {
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-center {
  display: flex;
  align-items: center;
  gap: 20rpx;
  flex: 1;
  justify-content: center;
}

.monkey-logo {
  width: 300rpx;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
}

.slogan-1 {
  font-size: 20rpx;
  color: #fff;
  line-height: 1.2;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 10rpx;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50rpx;
}

.icon-back, .icon-more, .icon-settings {
  width: 40rpx;
  height: 40rpx;
}

.more-button {
  margin-right: 20rpx;
}

/* 用户信息区域 */
.user-info-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
}

.user-avatar-container {
  margin-right: 20rpx;
}

.user-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  border: 2rpx solid #e0e0e0;
}

.user-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.user-name {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.user-campus {
  display: block;
  font-size: 28rpx;
  color: #666;
}

.member-validity {
  display: inline-block;
  font-size: 24rpx;
  font-weight: bold;
  color: #fff;
  background-color: #ff6600;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
}

.user-more {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-more-text {
  font-size: 40rpx;
  color: #999;
  font-weight: bold;
  line-height: 1;
}

/* 功能图标区域 */
.function-icons-section {
  background-color: #fff;
  padding: 20rpx 0;
  margin-bottom: 20rpx;
}

.icon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10rpx 0;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  padding: 20rpx 0;
}

.icon {
  width: 85rpx;
  height: 85rpx;
  margin-bottom: 0;
}

.icon-label {
  font-size: 24rpx;
  color: #333;
}

/* 进度条区域 */
.progress-section {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.progress-item {
  margin-bottom: 30rpx;
}

.progress-item:last-child {
  margin-bottom: 0;
}

.progress-label {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.progress-percentage {
  display: block;
  font-size: 28rpx;
  color: #ff6600;
  margin-bottom: 15rpx;
}

.progress-bar-container {
  margin-bottom: 10rpx;
}

.progress-bar {
  height: 10rpx;
  background-color: #e0e0e0;
  border-radius: 5rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #ff6600;
  border-radius: 5rpx;
  animation: progressAnimation 1.5s ease-out forwards;
}

@keyframes progressAnimation {
  from {
    width: 0;
  }
  to {
    width: var(--progress-width, 30%);
  }
}

.progress-sub-label {
  display: block;
  font-size: 24rpx;
  color: #666;
}

/* 成就区域 */
.achievements-section {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 100rpx; /* 为底部导航栏预留空间 */
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.achievement-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.achievement-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25rpx 30rpx;
  border-radius: 10rpx;
}

.achievement-item.gold {
  background-color: #ffd700;
}

.achievement-item.silver {
  background-color: #c0c0c0;
}

.achievement-item.bronze {
  background-color: #cd7f32;
}

.achievement-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
}

.achievement-rank {
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
}
</style>