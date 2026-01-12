<template>
  <view class="schedule-container">
    <!-- 顶部导航栏 -->
    <TopNavbar></TopNavbar>
    
    <!-- 页面标题和日期 -->
    <view class="page-header">
      <text class="page-title">我的课表</text>
      <view class="date-info">
        <view class="date-tag date-year">{{ currentYear }}</view>
        <text class="date-separator">/</text>
        <view class="date-tag date-month">{{ currentMonth }}</view>
        <text class="date-separator">/</text>
        <view class="date-tag date-day">{{ currentDay }}</view>
      </view>
    </view>
    
    <!-- 星期几标题行 -->
    <view class="weekdays">
      <view class="weekday-item">
        <text class="weekday-text">SUN</text>
      </view>
      <view class="weekday-item">
        <text class="weekday-text">MON</text>
      </view>
      <view class="weekday-item">
        <text class="weekday-text">TUE</text>
      </view>
      <view class="weekday-item">
        <text class="weekday-text">WED</text>
      </view>
      <view class="weekday-item">
        <text class="weekday-text">THU</text>
      </view>
      <view class="weekday-item">
        <text class="weekday-text">FRI</text>
      </view>
      <view class="weekday-item">
        <text class="weekday-text">SAT</text>
      </view>
    </view>
    
    <!-- 课程时间表 -->
    <view class="schedule-grid">
      <!-- 时间列 -->
      <view class="time-column">
        <view class="time-slot" v-for="time in timeSlots" :key="time">
          <text class="time-text">{{ time }}</text>
        </view>
      </view>
      
      <!-- 课程列（7天） -->
      <view class="course-column" v-for="(day, index) in 7" :key="index">
        <view class="time-slot" v-for="(timeSlot, slotIndex) in timeSlots" :key="slotIndex">
          <!-- 根据时间和日期显示课程卡片 -->
          <view 
            v-if="hasCourse(index, slotIndex)" 
            class="course-card" 
            :class="{ 
              'active': isActiveDay(index) || isEnrolled(index, slotIndex)
            }"
            @click="handleCourseClick(index, slotIndex)"
          >
            <text class="course-time">{{ timeSlot }}</text>
            <image class="icon" src="/static/icons/44@2x.png" mode="aspectFit"></image>
            <text class="course-name">Monkey Bar</text>
            <!-- <text class="course-coach">John Smith</text> -->
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部课程信息和报名按钮 -->
    <view class="bottom-section">
      <view class="coach-info">
        <image class="coach-avatar" src="/static/ee403.png" mode="aspectFit"></image>
        <view class="coach-details">
          <text class="coach-name">John Smith教练的</text>
          <text class="course-name">Monkey Bar课程</text>
        </view>
      </view>
      <view class="register-button">
        <text class="button-text">报名</text>
      </view>
    </view>
    
    <!-- 底部导航栏 -->
    <tabBar></tabBar>
  </view>
</template>

<script>
import { ref } from 'vue';
import tabBar from '../../components/TabBar.vue'
import TopNavbar from '../../components/TopNavbar.vue';

export default {
  name: 'SchedulePage',
  components: {
    tabBar,
    TopNavbar
  },
  setup() {
    // 当前日期
    const currentYear = ref('2026');
    const currentMonth = ref('01');
    const currentDay = ref('25');
    
    // 时间槽
    const timeSlots = ref(['09:30', '10:30', '11:00', '12:00', '18:00']);
    
    // 已报名的课程（使用二维数组记录，day和slot的组合）
    const enrolledCourses = ref([]);
    
    // 模拟课程数据
    const hasCourse = (day, slot) => {
      // 根据日期和时间槽返回是否有课程
      const courseData = [
        [false, false, true, false, true],    // 周日
        [false, true, true, true, false],      // 周一
        [true, true, true, true, false],       // 周二
        [false, false, true, true, false],     // 周三
        [false, false, true, true, false],     // 周四
        [false, true, false, false, true],     // 周五
        [true, false, false, false, true]      // 周六
      ];
      return courseData[day][slot];
    };
    
    // 判断是否是当前激活的日期
    const isActiveDay = (day) => {
      // 假设当前是周一（索引1）
      return day === 1;
    };
    
    // 判断课程是否已报名
    const isEnrolled = (day, slot) => {
      return enrolledCourses.value.some(course => course.day === day && course.slot === slot);
    };
    
    // 处理课程卡片点击事件
    const handleCourseClick = (day, slot) => {
      // 显示是否报名的弹窗
      uni.showModal({
        title: '报名确认',
        content: '是否要报名这个课程？',
        success: (res) => {
          if (res.confirm) {
            // 用户点击了确认，添加到已报名课程
            enrolledCourses.value.push({ day, slot });
            uni.showToast({
              title: '报名成功',
              icon: 'success'
            });
          } else if (res.cancel) {
            // 用户点击了取消，给出提示
            uni.showToast({
              title: '已取消报名',
              icon: 'none'
            });
          }
        }
      });
    };
    
    // 返回上一页
    const navigateBack = () => {
      uni.navigateBack();
    };
    
    return {
      currentYear,
      currentMonth,
      currentDay,
      timeSlots,
      hasCourse,
      isActiveDay,
      isEnrolled,
      handleCourseClick,
      navigateBack
    };
  }
};
</script>

<style scoped>
.schedule-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 120rpx;
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

.nav-left, .nav-right {
  width: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-icon, .more-icon, .settings-icon {
  width: 40rpx;
  height: 40rpx;
}

.more-icon {
  margin-right: 20rpx;
}

.nav-center {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 15rpx;
  justify-content: center;
}

.monkey-logo {
  width: 300rpx;
}

.brand-text {
  text-align: center;
  line-height: 1.2;
}

.brand-name {
  display: block;
  font-size: 24rpx;
  font-weight: bold;
  color: #fff;
}

.slogan {
  display: block;
  font-size: 16rpx;
  color: #fff;
}

/* 页面标题和日期 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #e0e0e0;
}

.page-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}

.date-info {
  display: flex;
  align-items: center;
  gap: 15rpx;
}

.date-tag {
  background-color: #ff6600;
  color: #fff;
  font-size: 30rpx;
  font-weight: bold;
  padding: 12rpx 20rpx;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.date-separator {
  font-size: 30rpx;
  color: #666;
  font-weight: bold;
}

/* 星期几标题行 */
.weekdays {
  display: flex;
  border-bottom: 1rpx solid #e0e0e0;
}

.weekday-item {
  flex: 1;
  padding: 20rpx;
  text-align: center;
}

.weekday-text {
  font-size: 24rpx;
  font-weight: 500;
  color: #666;
}

/* 课程时间表 */
.schedule-grid {
  display: flex;
  flex: 1;
  overflow: auto;
}

/* 时间列 */
.time-column {
  width: 100rpx;
  border-right: 1rpx solid #e0e0e0;
}

/* 课程列 */
.course-column {
  flex: 1;
  border-right: 1rpx solid #e0e0e0;
}

.time-slot {
  height: 150rpx;
  border-bottom: 1rpx solid #e0e0e0;
  position: relative;
}

.time-text {
  font-size: 20rpx;
  color: #999;
  padding: 10rpx;
  display: block;
}

/* 课程卡片 */
.course-card {
  position: absolute;
  top: 10rpx;
  left: 10rpx;
  right: 10rpx;
  bottom: 10rpx;
  background-color: #e0e0e0;
  border-radius: 10rpx;
  padding: 10rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.course-card.active {
  background-color: #ff6600;
  color: #fff;
}

.course-time {
  font-size: 20rpx;
  font-weight: bold;
  margin-bottom: 5rpx;
}

.icon {
  width: 40rpx;
  height: 40rpx;
  margin-bottom: 5rpx;
}

.course-name {
  font-size: 12rpx;
  font-weight: bold;
  margin-bottom: 5rpx;
}

.course-coach {
  font-size: 18rpx;
}

/* 底部课程信息和报名按钮 */
.bottom-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  border-top: 1rpx solid #e0e0e0;
}

.coach-info {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.coach-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}

.coach-details {
  display: flex;
  flex-direction: column;
}

.coach-name {
  font-size: 28rpx;
  color: #333;
}

.bottom-section .course-name {
  font-size: 28rpx;
}

.register-button {
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
</style>