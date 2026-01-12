<template>
  <view class="top-navbar">
    <view class="nav-center" @click="navigateToShouye">
      <image class="brand-icon" src="/static/99b7.png" mode="aspectFit"></image>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TopNavbar',
  setup() {
    // 跳转到首页
    const navigateToShouye = () => {
      uni.navigateTo({
        url: '/pages/index/index'
      });
    };

    return {
      navigateToShouye
    };
  }
};
</script>

<style scoped>
/* 顶部导航栏样式 */
.top-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 160rpx;
  background-color: #ff6600;
  padding: 0 30rpx;
  box-sizing: border-box;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15rpx;
}

.brand-icon {
  width: 300rpx;
  height: 100rpx;
  margin-top: 25px;
}
</style>