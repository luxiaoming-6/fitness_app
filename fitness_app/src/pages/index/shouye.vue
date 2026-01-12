<template>
  <view class="index-container">
    <!-- 1. 顶部导航栏 -->
    <top-navbar></top-navbar>
    
    <!-- 2. 课程分类选项卡 -->
    <view class="course-tabs">
      <view class="tab-item active">
        <text class="tab-text">攀爬架课程</text>
      </view>
      <view class="tab-item">
        <text class="tab-text">攀岩课程</text>
      </view>
      <view class="tab-item">
        <text class="tab-text">跑酷课程</text>
      </view>
    </view>
    
    <!-- 3. 课程推荐区域 -->
    <view class="recommendation">
      <view class="coach-info">
        <image class="coach-image" src="/static/29-80.jpg" mode="aspectCover"></image>
        <view class="coach-details">
          <text class="coach-name">John Smith</text>
          <text class="coach-title">综合体操教学</text>
          <text class="coach-description">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</text>
        </view>
      </view>
    </view>
    
    <!-- 4. 课程列表网格布局 -->
    <view class="course-grid">
      <view class="course-item" v-for="(course, index) in courses" :key="index">
        <view class="course-image-container">
          <image class="course-image" :src="course.image" mode="aspectCover"></image>
          <view class="course-time">{{ course.time }}</view>
        </view>
        <view class="course-info">
          <text class="course-name">{{ course.name }}</text>
          <view class="play-button">
            <text class="play-arrow">▶</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部导航栏 -->
    <tab-bar />
  </view>
</template>

<script>
import { ref, reactive } from 'vue';
import tabBar from '../../components/TabBar.vue';
import TopNavbar from '../../components/TopNavbar.vue';
export default {
  name: 'IndexPage',
  components: {
    tabBar,
    TopNavbar
  },
  setup() {
    // 课程数据
    const courses = reactive([
      {
        id: 1,
        name: '攀爬架课程 01',
        price: '¥780',
        time: '7:00',
        image: '/static/c@2x.png',
        isNew: true
      },
      {
        id: 2,
        name: '攀爬架课程 01',
        price: '¥780',
        time: '7:00',
        image: '/static/c@2x.png',
        isNew: false
      },
      {
        id: 3,
        name: '攀爬架课程 01',
        price: '¥780',
        time: '7:00',
        image: '/static/c@2x.png',
        isNew: false
      },
      {
        id: 4,
        name: '攀爬架课程 01',
        price: '¥780',
        time: '7:00',
        image: '/static/c@2x.png',
        isNew: true
      },
      {
        id: 5,
        name: '攀爬架课程 01',
        price: '¥780',
        time: '7:00',
        image: '/static/c@2x.png',
        isNew: false
      },
      {
        id: 6,
        name: '攀爬架课程 01',
        price: '¥780',
        time: '7:00',
        image: '/static/c@2x.png',
        isNew: false
      }
    ]);
    

    
    return {
      courses
    };
  }
};
</script>

<style scoped>
/* 全局样式 */
.index-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  overflow-x: hidden;
}

/* 1. 顶部导航栏样式 */
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

.nav-left {
  width: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-icon {
  width: 40rpx;
  height: 40rpx;
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
  /* height: 100rpx; */
}

.brand-info {
  text-align: center;
  line-height: 6px;
}

.brand-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #ffffff;
  display: block;
  margin-bottom: 1rpx;
}

.brand-slogan {
  font-size: 12rpx;
  color: #ffffff;
  line-height: 10rpx;
  opacity: 0.9;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 30rpx;
}

.more-icon, .user-icon {
  width: 40rpx;
  height: 40rpx;
}

/* 2. 课程分类选项卡样式 */
.course-tabs {
  display: flex;
  width: 100%;
  height: 80rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #e0e0e0;
}

.tab-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.tab-item.active {
  border-bottom: 4rpx solid #ff6600;
}

.tab-text {
  font-size: 28rpx;
  color: #333333;
}

.tab-item.active .tab-text {
  color: #ff6600;
  font-weight: bold;
}

/* 3. 课程推荐区域样式 */
.recommendation {
  padding: 20rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.coach-info {
  display: flex;
  gap: 20rpx;
}

.coach-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
}

.coach-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.coach-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 5rpx;
}

.coach-title {
  font-size: 24rpx;
  color: #666666;
  margin-bottom: 10rpx;
}

.coach-description {
  font-size: 20rpx;
  color: #999999;
  line-height: 30rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

/* 4. 课程列表网格布局样式 */
.course-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  padding: 0 20rpx 20rpx 20rpx;
}

.course-item {
  background-color: #ffffff;
  border-radius: 10rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.course-image-container {
  position: relative;
  width: 100%;
  height: 240rpx;
}

.course-image {
  width: 100%;
  height: 100%;
}

.course-time {
  position: absolute;
  bottom: 15rpx;
  right: 15rpx;
  color: #ffffff;
  font-size: 24rpx;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5rpx 10rpx;
  border-radius: 5rpx;
}

.play-button {
  width: 50rpx;
  height: 50rpx;
  background-color: #ff6600;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
}

.play-arrow {
  color: #ffffff;
  font-size: 28rpx;
  font-weight: bold;
  transform: translateX(2rpx);
}

.course-info {
  padding: 15rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-name {
  font-size: 28rpx;
  color: #333333;
}

.course-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #ff6600;
  display: none;
}
</style>
