<template>
  <view class="exercise-container">
    <!-- 顶部导航栏 -->
    <top-navbar></top-navbar>
    
    <!-- 页面标题区域 -->
    <view class="page-title-section">
      <view class="title-content">
        <text class="main-title">课程表</text>
        <text class="subtitle">选择日期和你想参加的课程吧！</text>
      </view>
      <view class="view-schedule-button" @click="navigateToSchedule">
        <text class="button-text">查看课表</text>
      </view>
    </view>
    
    <!-- 日期选择器 -->
    <view class="date-picker">
      <view class="date-column">
        <!-- UniApp日期选择弹窗 -->
        <picker 
          mode="date" 
          :value="dateValue" 
          @change="onDateChange" 
          start="2026-01-01" 
          end="2026-12-31"
        >
          <view class="date-button">
            <text class="date-number">{{ year }}</text>
          </view>
        </picker>
        <text class="date-label">年</text>
      </view>
      <text class="date-separator">/</text>
      <view class="date-column">
        <!-- UniApp日期选择弹窗 -->
        <picker 
          mode="date" 
          :value="dateValue" 
          @change="onDateChange" 
          start="2026-01-01" 
          end="2026-12-31"
        >
          <view class="date-button">
            <text class="date-number">{{ month }}</text>
          </view>
        </picker>
        <text class="date-label">月</text>
      </view>
      <text class="date-separator">/</text>
      <view class="date-column">
        <!-- UniApp日期选择弹窗 -->
        <picker 
          mode="date" 
          :value="dateValue" 
          @change="onDateChange" 
          start="2026-01-01" 
          end="2026-12-31"
        >
          <view class="date-button">
            <text class="date-number">{{ day }}</text>
          </view>
        </picker>
        <text class="date-label">日</text>
      </view>
    </view>
    
    <!-- 课程列表 -->
    <view class="course-list">
      <template v-for="(course, index) in courses" :key="course.id">
        <!-- 课程条目 -->
        <view 
          class="course-item" 
          @click="toggleCourse(index)" 
          :class="{ 'active': activeCourse === index }"
        >
          <view class="course-info">
            <image class="course-icon" src="/static/course-icon.png" mode="aspectFit"></image>
            <text class="course-name">{{ course.name }}</text>
          </view>
          <text class="course-time">{{ course.time }}</text>
        </view>
        
        <!-- 展开后的教练信息卡片 -->
        <view v-if="activeCourse === index" class="coach-card">
          <view class="coach-header">
            <view class="coach-avatar-container">
              <image class="coach-avatar" src="/static/ee403.png" mode="aspectFit"></image>
            </view>
            <view class="coach-header-info">
              <text class="coach-name">{{ course.coach }}</text>
              <text class="coach-title">Coach</text>
            </view>
            <view class="reserve-button">
              <text class="reserve-text">预约</text>
            </view>
          </view>
          <text class="coach-description">{{ course.description }}</text>
        </view>
      </template>
    </view>
    
    <!-- 底部提交按钮 -->
    <view class="submit-button">
      <text class="submit-text">提交</text>
    </view>
    
    <!-- 自定义底部导航栏 -->
    <tab-bar />
  </view>
</template>

<script>
import { ref, reactive } from 'vue';
import TabBar from '../../components/TabBar.vue';
import TopNavbar from '../../components/TopNavbar.vue';

export default {
  name: 'ExercisePage',
  components: {
    TabBar,
    TopNavbar
  },
  setup() {
    // 当前激活的课程索引，-1表示没有激活
    const activeCourse = ref(-1);
    
    // 课程列表数据
    const courses = reactive([
      { id: 0, name: 'Monkey Bar', time: '09:00-11:01', coach: 'John Smith', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.' },
      { id: 1, name: 'Monkey Bar', time: '09:00-11:02', coach: 'John Smith', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.' },
      { id: 2, name: 'Monkey Bar', time: '09:00-11:03', coach: 'John Smith', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.' },
      { id: 3, name: 'Monkey Bar', time: '09:00-11:04', coach: 'John Smith', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.' },
      { id: 4, name: 'Monkey Bar', time: '09:00-11:05', coach: 'John Smith', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.' },
      { id: 5, name: 'Monkey Bar', time: '09:00-11:05', coach: 'John Smith', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.' },
      { id: 6, name: 'Monkey Bar', time: '09:00-11:05', coach: 'John Smith', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.' },
      { id: 7, name: 'Monkey Bar', time: '09:00-11:05', coach: 'John Smith', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.' },
      { id: 8, name: 'Monkey Bar', time: '09:00-11:05', coach: 'John Smith', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.' },
      { id: 9, name: 'Monkey Bar', time: '09:00-11:05', coach: 'John Smith', description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s.' },
    ]);
    
    // 日期选择相关
    const dateValue = ref('2026-01-25');
    const year = ref('2026');
    const month = ref('01');
    const day = ref('25');
    
    // 处理日期选择
    const onDateChange = (e) => {
      const value = e.detail.value;
      dateValue.value = value;
      
      // 解析日期并更新年、月、日
      const dateParts = value.split('-');
      year.value = dateParts[0];
      month.value = dateParts[1];
      day.value = dateParts[2];
    };
    
    // 跳转到课表页面
    const navigateToSchedule = () => {
      uni.navigateTo({
        url: '/pages/exercise/schedule'
      });
    };
    
    // 切换课程展开/收起状态
    const toggleCourse = (index) => {
      activeCourse.value = activeCourse.value === index ? -1 : index;
    };
    

    
    return {
      activeCourse,
      toggleCourse,
      courses,
      year,
      month,
      day,
      dateValue,
      onDateChange,
      navigateToSchedule
    };
  }
};
</script>

<style scoped>
.exercise-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 180rpx;
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

/* 左侧返回按钮 */
.nav-left {
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button {
  width: 40rpx;
  height: 40rpx;
}

/* 中央品牌区域 */
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

.slogan-1, .slogan-2 {
  font-size: 20rpx;
  color: #fff;
  line-height: 1.2;
}

/* 右侧按钮区域 */
.nav-right {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 10rpx;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50rpx;
}

.more-button, .settings-button {
  width: 40rpx;
  height: 40rpx;
}

.more-button {
  margin-right: 20rpx;
}

/* 页面标题区域 */
.page-title-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40rpx 30rpx 20rpx;
  background-color: #fff;
}

.title-content {
  display: flex;
  flex-direction: column;
}

.main-title {
  font-size: 60rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.subtitle {
  display: block;
  font-size: 28rpx;
  color: #666;
  line-height: 1.4;
}

.view-schedule-button {
  background-color: #ff6600;
  color: #fff;
  padding: 18rpx 40rpx;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-text {
  font-size: 30rpx;
  font-weight: bold;
  color: #fff;
}

/* 日期选择器 */
.date-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30rpx;
  padding: 40rpx 20rpx;
  background-color: #fff;
}

.date-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date-button {
  width: 180rpx;
  height: 100rpx;
  background-color: #ff6600;
  color: #fff;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15rpx;
}

.date-number {
  font-size: 48rpx;
  font-weight: bold;
  color: #fff;
}

.date-label {
  font-size: 28rpx;
  color: #666;
  margin-top: 5rpx;
}

.date-separator {
  font-size: 48rpx;
  color: #999;
  font-weight: bold;
}

/* 课程列表 */
.course-list {
  height: 540rpx; /* 4个课程条目的高度：每个约135rpx */
  padding: 0 30rpx 30rpx;
  overflow-y: auto;
  /* 添加滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: #ff6600 #f0f0f0;
}

/* 为WebKit浏览器添加滚动条样式 */
.course-list::-webkit-scrollbar {
  width: 6rpx;
}

.course-list::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 3rpx;
}

.course-list::-webkit-scrollbar-thumb {
  background: #ff6600;
  border-radius: 3rpx;
}

.course-list::-webkit-scrollbar-thumb:hover {
  background: #e65c00;
}

.course-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  background-color: #e0e0e0;
  border-radius: 10rpx;
  margin-bottom: 15rpx;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.course-item.active {
  background-color: #ff6600;
  color: #fff;
  padding-bottom: 30rpx;
}



.course-info {
  display: flex;
  align-items: center;
  gap: 20rpx;
  flex: 1;
}

.course-icon {
  width: 40rpx;
  height: 40rpx;
}

.course-name {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.course-item.active .course-name {
  color: #fff;
}

.course-time {
  font-size: 28rpx;
  color: #666;
  font-weight: 500;
}

.course-item.active .course-time {
  color: #fff;
}

/* 展开后的教练信息卡片 */
.coach-card {
  margin-top: -10px;
  background-color: #fff;
  border-radius: 10rpx;
  padding: 30rpx;
  margin-bottom: 15rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.coach-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  width: 100%;
}

.coach-avatar-container {
  margin-right: 20rpx;
}

.coach-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}

.coach-header-info {
  flex: 1;
}

.coach-name {
  display: inline-block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-right: 15rpx;
}

.coach-title {
  display: inline-block;
  font-size: 24rpx;
  color: #666;
}

.reserve-button {
  background-color: #ff6600;
  color: #fff;
  padding: 15rpx 30rpx;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reserve-text {
  font-size: 24rpx;
  font-weight: bold;
  color: #fff;
}

.coach-description {
  display: block;
  font-size: 20rpx;
  color: #666;
  line-height: 1.5;
  width: 100%;
}

/* 底部提交按钮 */
.submit-button {
  background-color: #ff6600;
  color: #fff;
  padding: 25rpx;
  text-align: center;
  font-size: 36rpx;
  font-weight: bold;
  margin: 30rpx;
  border-radius: 10rpx;
}
</style>