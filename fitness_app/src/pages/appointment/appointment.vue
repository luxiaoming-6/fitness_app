<template>
  <view class="appointment-container">
    <view class="page-header">
      <text class="page-title">线下预约</text>
    </view>
    <view class="page-content">
      <text class="content-text">线下预约页面内容</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'AppointmentPage',
  setup() {
    return {
      // 页面逻辑
    };
  }
};
</script>

<style scoped>
.appointment-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.page-header {
  padding: 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.page-title {
  font-size: 36rpx;
  font-weight: 500;
  color: #333;
}

.page-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  /* 为底部导航栏预留空间 */
  padding-bottom: 120rpx;
}

.content-text {
  font-size: 32rpx;
  color: #666;
}
</style>