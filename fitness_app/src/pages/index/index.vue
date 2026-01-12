<template>
  <view class="index-container">
    <!-- 1. 顶部横幅部分 -->
    <view class="banner">
      <image class="banner-bg" src="/static/29-80.jpg" mode="aspectCover"></image>
      <!-- <image class="menu-icon" src="/static/355.png" mode="aspectFit"></image> -->
      <view class="banner-content">
        <text class="banner-title">Let's Workout!</text>
        <text class="banner-subtitle">Makes exercise more fun.</text>
        <view class="banner-logo">
          <image class="logo-image" src="/static/355.png" mode="aspectFit"></image>
          <!-- <text class="logo-text">BOOMTANG</text> -->
        </view>
      </view>
    </view>
    
    <!-- 2. 品牌选项卡部分 -->
    <view class="brand-tabs">
      <view class="tab-item" @click="navigateToChallenge">
        <image class="tab-image" src="/static/29-80.jpg" mode="aspectCover"></image>
        <view class="tab-content">
          <text class="tab-text">Online\nCourse</text>
        </view>
      </view>
      <view class="tab-item" @click="navigateToChallenge">
        <image class="tab-image" src="/static/35-80.jpg" mode="aspectCover"></image>
        <view class="tab-content">
          <text class="tab-text">Offline\nSchool</text>
        </view>
      </view>
      <view class="tab-item" @click="navigateToChallenge">
        <image class="tab-image" src="/static/37-80.jpg" mode="aspectCover"></image>
        <view class="tab-content">
          <text class="tab-text">About\nBoomtang</text>
        </view>
      </view>
    </view>
    
    <!-- 3. 激励文字和线下校区部分 -->
    <view class="motivation-campuses">
      <text class="motivation-title">Every drop of sweat builds strength for tomorrow.</text>
      <text class="campuses-title">线下校区</text>
      <view class="campus-list">
        <view class="campus-card">
          <image class="campus-bg" src="/static/32.png" mode="aspectCover"></image>
          <view class="campus-content">
            <text class="campus-city">北京</text>
            <text class="campus-address">朝阳区建国路88号</text>
          </view>
        </view>
        <view class="campus-card">
          <image class="campus-bg" src="/static/33.png" mode="aspectCover"></image>
          <view class="campus-content">
            <text class="campus-city">上海</text>
            <text class="campus-address">浦东新区世纪大道100号</text>
          </view>
        </view>
        <view class="campus-card">
          <image class="campus-bg" src="/static/34.png" mode="aspectCover"></image>
          <view class="campus-content">
            <text class="campus-city">深圳</text>
            <text class="campus-address">南山区科技园路1号</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 5. 春季挑战赛活动部分 -->
    <view class="challenge">
      <image class="challenge-image" src="/static/35-80.jpg" mode="aspectCover"></image>
      <view class="challenge-content">
        <view class="challenge-logo">
          <image class="logo-image" src="/static/99b7.png" mode="aspectFit"></image>
          <!-- <view class="logo-text-container">
            <text class="logo-text">BOOMTANG</text>
            <text class="logo-subtext">Race to the challenge</text>
            <text class="logo-subtext-2">Join the fun! Share the joy.</text>
          </view> -->
        </view>
        <text class="challenge-title">春季挑战赛</text>
        <text class="challenge-subtitle">Competition of the season!</text>
        <text class="challenge-period">Jan.01 - Apr.31</text>
        <view class="join-button">
          <text class="join-text">JOIN</text>
        </view>
        <text class="challenge-description">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</text>
      </view>
    </view>
    
    <!-- 6. 课程分类部分 -->
    <view class="courses">
      <text class="section-title">特色课程</text>
      <scroll-view class="course-scroll" scroll-x="false">
        <view class="course-list">
          <view class="course-card">
            <image class="course-image" src="/static/38-80.jpg" mode="aspectCover"></image>
            <view class="course-content">
              <text class="course-name">Biking</text>
              <text class="course-period">Jan.01-Apr.31</text>
            </view>
          </view>
          <view class="course-card">
            <image class="course-image" src="/static/37-80.jpg" mode="aspectCover"></image>
            <view class="course-content">
              <text class="course-name" style="font-size: 32rpx;">Monkey Bar</text>
              <text class="course-period">Jan.01-Apr.31</text>
            </view>
          </view>
          <view class="course-card">
            <image class="course-image" src="/static/36-80.jpg" mode="aspectCover"></image>
            <view class="course-content">
              <text class="course-name">Climbing</text>
              <text class="course-period">Jan.01-Apr.37</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 7. 课程特色部分 -->
    <!-- <view class="course-features">
      <text class="section-title">课程特色</text>
      <view class="features-container">
        <view class="feature-item">
          <image class="feature-icon" src="/static/icons/feature-1.png" mode="aspectFit"></image>
          <view class="feature-content">
            <text class="feature-title">科学训练体系</text>
            <text class="feature-text">基于最新的运动科学研究，为不同水平的学员量身定制训练计划，确保高效安全的训练效果。</text>
          </view>
        </view>
        <view class="feature-item">
          <image class="feature-icon" src="/static/icons/feature-2.png" mode="aspectFit"></image>
          <view class="feature-content">
            <text class="feature-title">专业教练团队</text>
            <text class="feature-text">我们的教练都经过严格的专业培训和认证，拥有丰富的教学经验，能够提供个性化的指导和支持。</text>
          </view>
        </view>
      </view>
    </view> -->
    
    <!-- 8. 器材商城部分 -->
    <view class="equipment-store">
      <!-- <text class="section-title orange">器材商城</text>
      <text class="store-description">
        一种结构组合体能架由两种类型的空中障碍综合体连接结构，一种由铝制析架打造，另一种由高强度钢材构成。两种结构均采用模块化设计，灵活易用，支持随时升级，并可向任意方向扩展以适应不同场地需求。
      </text> -->
      
      <view class="equipment-diagram">
        <!-- <image class="main-equipment" src="/static/logo.png" mode="aspectFit"></image> -->
        
        <!-- 特性点 -->
        <view class="feature-item top-left">
          <!-- <image class="feature-icon" src="/static/logo.png" mode="aspectFit"></image> -->
          <text class="feature-text">模块化结构</text>
        </view>
        
        <view class="feature-item top-right">
          <!-- <image class="feature-icon" src="/static/logo.png" mode="aspectFit"></image> -->
          <text class="feature-text">进口泡沫缓冲平台</text>
        </view>
        
        <view class="feature-item middle-right">
          <!-- <image class="feature-icon" src="/static/logo.png" mode="aspectFit"></image> -->
          <text class="feature-text">原创悬挂障碍</text>
        </view>
        
        <view class="feature-item bottom-right">
          <!-- <image class="feature-icon" src="/static/logo.png" mode="aspectFit"></image> -->
          <text class="feature-text">专业地面障碍</text>
        </view>
        
        <view class="feature-item bottom">
          <!-- <image class="feature-icon" src="/static/logo.png" mode="aspectFit"></image> -->
          <text class="feature-text">可靠安全网</text>
        </view>
        
        <view class="feature-item bottom-left">
          <!-- <image class="feature-icon" src="/static/logo.png" mode="aspectFit"></image> -->
          <text class="feature-text orange">地面材料可选</text>
        </view>
      </view>
      
      <!-- <text class="store-description">
        一种健康空中障碍综合体能量架提供多种地面材料选择，以满足不同场地和安全要求。常见的选项包括结地结合泡沫垫和渗透垫，安全且适用面广泛。此外，还可选用充气气垫或波速垫，为学员提供更加柔软的保护体验。
      </text> -->
    </view>
    
    <!-- 9. 底部联系部分 -->
    <view class="contact">
      <view class="contact-left">
        <image class="contact-logo" src="/static/logo.png" mode="aspectFit"></image>
        <text class="contact-brand">BOOMTANG</text>
        <text class="contact-slogan">Rise to the Challenge</text>
        <text class="contact-slogan">Power in Every Step</text>
      </view>
      <view class="contact-center">
        <text class="contact-info">咨询电话：</text>
        <text class="contact-info">15810842182(王老师)</text>
        <text class="contact-info">400-825-1211</text>
        <text class="contact-copyright">版权所有:北京一棒棒唐教育咨询有限公司</text>
        <text class="contact-copyright">京ICP备2024055863号</text>
      </view>
      <view class="contact-right">
        <image class="contact-qrcode" src="/static/41@2x.png" mode="aspectFit"></image>
      </view>
    </view>
    
    <!-- 10. 底部版权信息 -->
    <!-- <view class="footer">
      <text class="footer-text">© 2026 BOOMTANG Fitness. All rights reserved.</text>
    </view> -->
    
    <!-- 底部导航栏 -->
    <tab-bar></tab-bar>
  </view>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import tabBar from '../../components/TabBar.vue';
export default {
  name: 'IndexPage',
  components: {
    tabBar
  },
  setup() {
    const fontsLoaded = ref(false);
    const observers = [];
    
    // 字体加载完成后添加类名
    const loadFonts = () => {
      if (!fontsLoaded.value) {
        fontsLoaded.value = true;
        // 为需要应用动态字体的元素添加类
        const elements = document.querySelectorAll(
          '.banner-title, .banner-subtitle, .logo-text, .tab-text, .motivation-title, .campuses-title, .campus-city, .campus-address, .challenge-title, .challenge-subtitle, .challenge-period, .course-name, .course-period'
        );
        elements.forEach(el => el.classList.add('dynamic-font'));
      }
    };
    
    // 为元素添加飞进来动画
    const animateElement = (element, animationType) => {
      element.classList.add(animationType);
      // 添加动态字体
      loadFonts();
    };
    
    // 创建并启动多个Intersection Observer
    const createObservers = () => {
      // 观察激励文字和校区部分
      const motivationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const target = entry.target;
              if (target.classList.contains('motivation-title')) {
                animateElement(target, 'fly-in-down');
              } else if (target.classList.contains('campuses-title')) {
                animateElement(target, 'fly-in-up');
              } else {
                animateElement(target, 'fly-in-left');
              }
              motivationObserver.unobserve(target);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      // 观察校区卡片
      const campusObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateElement(entry.target, 'fly-in-right');
              campusObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      
      // 观察挑战赛部分
      const challengeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateElement(entry.target, 'fly-in-up');
              challengeObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      // 观察课程部分
      const courseObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateElement(entry.target, 'fly-in-left');
              courseObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      
      // 开始观察各个元素
      document.querySelectorAll('.motivation-title, .campuses-title, .campus-card').forEach(el => {
        if (el.classList.contains('campus-card')) {
          campusObserver.observe(el);
        } else {
          motivationObserver.observe(el);
        }
      });
      
      document.querySelectorAll('.challenge').forEach(el => challengeObserver.observe(el));
      document.querySelectorAll('.course-card').forEach(el => courseObserver.observe(el));
      
      // 存储observers以便清理
      observers.push(motivationObserver, campusObserver, challengeObserver, courseObserver);
    };
    
    onMounted(() => {
      // 添加初始隐藏类
      document.querySelectorAll('.motivation-title, .campuses-title, .campus-card, .challenge, .course-card').forEach(el => {
        el.classList.add('fade-element');
      });
      
      // 创建并启动observers
      createObservers();
    });
    
    onUnmounted(() => {
      // 清理所有observers
      observers.forEach(obs => obs.disconnect());
    });
    
    // 导航到挑战赛页面
    const navigateToChallenge = () => {
      uni.navigateTo({
        url: '/pages/index/challenge'
      });
    };
    
    return {
      fontsLoaded,
      navigateToChallenge
    };
  }
};
</script>

<style scoped>
/* 动态字体 */
@font-face {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2) format(woff2);
}

@font-face {
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.woff2) format(woff2);
}

/* 动画效果 */
@keyframes flyInLeft {
  from {
    transform: translateX(-100rpx);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes flyInRight {
  from {
    transform: translateX(100rpx);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes flyInUp {
  from {
    transform: translateY(100rpx);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes flyInDown {
  from {
    transform: translateY(-100rpx);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 样式类 */
.dynamic-font {
  font-family: Roboto, Arial, sans-serif;
}

.fade-element {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.fly-in-left {
  animation: flyInLeft 0.8s ease-out forwards;
}

.fly-in-right {
  animation: flyInRight 0.8s ease-out forwards;
}

.fly-in-up {
  animation: flyInUp 0.8s ease-out forwards;
}

.fly-in-down {
  animation: flyInDown 0.8s ease-out forwards;
}

/* 全局样式 */
.index-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  overflow-x: hidden;
}

/* 1. 顶部横幅样式 */
.banner {
  position: relative;
  width: 100%;
  height: 900rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 100rpx;
  overflow: hidden;
}

.banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.menu-icon {
  position: absolute;
  top: 40rpx;
  right: 40rpx;
  width: 60rpx;
  height: 60rpx;
  z-index: 10;
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #ffffff;
}

.banner-title {
  font-size: 96rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
  text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
  font-family: Arial, sans-serif;
}

.banner-subtitle {
  font-size: 36rpx;
  opacity: 0.9;
  margin-bottom: 80rpx;
  display: block;
  text-shadow: 1rpx 1rpx 2rpx rgba(0, 0, 0, 0.5);
  font-family: Arial, sans-serif;
}

.banner-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
}

.logo-image {
  width: 170rpx;
  height: 100rpx;
  margin-bottom: 10rpx;
}

.logo-text {
  font-size: 48rpx;
  font-weight: bold;
  color: #ffffff;
  font-family: Arial, sans-serif;
}

/* 2. 品牌选项卡样式 */
.brand-tabs {
  display: flex;
  width: 100%;
  height: 300rpx;
  overflow: hidden;
}

.tab-item {
  flex: 1;
  position: relative;
  height: 100%;
  overflow: hidden;
}

.tab-image {
  width: 100%;
  height: 100%;
}

.tab-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.tab-text {
  font-size: 36rpx;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  font-family: Arial, sans-serif;
}

/* 3. 激励文字和线下校区样式 */
.motivation-campuses {
  position: relative;
  width: 100%;
  height: 1050rpx;
  background-image: url('/static/31-80.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 40rpx;
  color: #ffffff;
}

.motivation-title {
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 60rpx;
  display: block;
  text-align: center;
  font-family: Arial, sans-serif;
  text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

.campuses-title {
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 80rpx;
  display: block;
  text-align: center;
  font-family: Arial, sans-serif;
  text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

.campus-list {
  display: flex;
  flex-direction: column;
  gap: 40rpx;
  width: 100%;
}

.campus-card {
  position: relative;
  width: 100%;
  height: 180rpx;
  border-radius: 70rpx;
  /* background: linear-gradient(90deg, rgba(255, 107, 53, 0.8) 0%, rgba(255, 107, 53, 0.6) 100%); */
  overflow: hidden;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40rpx;
}

.campus-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.campus-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.campus-city {
  font-size: 40rpx;
  font-weight: bold;
  color: #ffffff;
  display: block;
  flex: 0 0 120rpx;
}

.campus-address {
  font-size: 28rpx;
  color: #ffffff;
  opacity: 0.9;
  display: block;
  flex: 1;
  text-align: right;
  line-height: 1.4;
}

/* 5. 春季挑战赛样式 */
.challenge {
  position: relative;
  width: 100%;
  height: 1050rpx;
  margin: 0;
  border-radius: 0;
  overflow: hidden;
}

.challenge-image {
  width: 100%;
  height: 100%;
}

.challenge-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 40rpx;
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.challenge-logo {
  position: absolute;
  top: 40rpx;
  left: 40rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.challenge-logo .logo-image {
  width: 320rpx;
  height: 180rpx;
}

.logo-text-container {
  display: flex;
  flex-direction: column;
}

.challenge-logo .logo-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5rpx;
}

.challenge-logo .logo-subtext {
  font-size: 24rpx;
  color: #ffffff;
  opacity: 0.9;
  margin-bottom: 5rpx;
}

.challenge-logo .logo-subtext-2 {
  font-size: 24rpx;
  color: #ffffff;
  opacity: 0.9;
}

.challenge-title {
  font-size: 64rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
  color: #ffffff;
}

.challenge-subtitle {
  font-size: 32rpx;
  margin-bottom: 20rpx;
  display: block;
  color: #ffffff;
  opacity: 0.9;
}

.challenge-period {
  font-size: 32rpx;
  margin-bottom: 40rpx;
  display: block;
  color: #ffffff;
  opacity: 0.9;
}

.join-button {
  background-color: #ff6b35;
  padding: 20rpx 40rpx;
  border-radius: 50rpx;
  margin-bottom: 40rpx;
  align-self: flex-start;
}

.join-text {
  font-size: 36rpx;
  font-weight: bold;
  color: #ffffff;
}

.challenge-description {
  font-size: 28rpx;
  line-height: 1.6;
  display: block;
  color: #ffffff;
  opacity: 0.9;
}

/* 6. 课程分类样式 */
.courses {
  /* padding: 60rpx 40rpx; */
  background-color: #ffffff;
}

.course-scroll {
  width: 100%;
  white-space: nowrap;
}

.course-list {
  display: flex;
  /* gap: 30rpx; */
  padding-bottom: 20rpx;
}

.course-card {
  width: 400rpx;
  /* border-radius: 20rpx; */
  overflow: hidden;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  position: relative;
  /* margin-right: 30rpx; */
}

.course-image {
  width: 100%;
  height: 300rpx;
}

.course-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  text-align: center;
}

.course-name {
  font-size: 40rpx;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10rpx;
  display: block;
  text-shadow: 1rpx 1rpx 2rpx rgba(0, 0, 0, 0.5);
}

.course-period {
  font-size: 28rpx;
  color: #ffffff;
  display: block;
  text-shadow: 1rpx 1rpx 2rpx rgba(0, 0, 0, 0.5);
}

/* 7. 课程特色样式 */
.course-features {
  padding: 60rpx 40rpx;
  background-color: #f8f8f8;
}

.features-container {
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 30rpx;
  /* padding: 30rpx; */
  background-color: #ffffff;
  border-radius: 20rpx;
  /* box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.05); */
}

.feature-icon {
  width: 100rpx;
  height: 100rpx;
  margin-top: 10rpx;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 15rpx;
  display: block;
}

.feature-text {
  font-size: 32rpx;
  color: #666666;
  line-height: 1.6;
  text-align: justify;
}

/* 8. 器材商城样式 */
.equipment-store {
  height: 450rpx;
  padding: 60rpx 40rpx;
  background-color: #ffffff;
  background-image: url('/static/39-80.jpg');
  background-size: 100% 100%;
}

.orange {
  color: #ff6b35;
}

.store-description {
  font-size: 13rpx;
  color: #666666;
  line-height: 1.6;
  text-align: justify;
  margin-bottom: 40rpx;
  display: block;
}

.equipment-diagram {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
}

.main-equipment {
  width: 500rpx;
  height: 500rpx;
  margin-bottom: 20rpx;
}

.feature-item {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.feature-item.top-left {
  top: 20rpx;
  left: 150rpx;
}

.feature-item.top-right {
  top: -5rpx;
  right: -110rpx;
  flex-direction: row-reverse;
}

.feature-item.middle-right {
  top: 185rpx;
  right: -50rpx;
  flex-direction: row-reverse;
}

.feature-item.bottom-right {
  top: 290rpx;
  right: -50rpx;
  flex-direction: row-reverse;
}

.feature-item.bottom {
  bottom: -130rpx;
  right: -20rpx;
}

.feature-item.bottom-left {
  bottom: -350rpx;
  left: -20rpx;
}

.feature-icon {
  width: 80rpx;
  height: 80rpx;
}

.feature-text {
  font-size: 30rpx;
  color: #333333;
  font-weight: 500;
}

.feature-item.top-right .feature-text,
.feature-item.middle-right .feature-text,
.feature-item.bottom-right .feature-text {
  text-align: right;
}

/* 9. 底部联系样式 */
.contact {
  padding: 60rpx 40rpx;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e9e9e9;
}

.contact-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-logo {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 20rpx;
}

.contact-brand {
  font-size: 28rpx;
  font-weight: bold;
  color: #ff6b35;
  margin-bottom: 10rpx;
  display: block;
}

.contact-slogan {
  font-size: 16rpx;
  color: #333333;
  margin-bottom: 5rpx;
  display: block;
  text-align: center;
}

.contact-center {
  flex: 1;
  margin: 0 60rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.contact-info {
  font-size: 20rpx;
  color: #333333;
  display: block;
}

.contact-copyright {
  font-size: 14rpx;
  color: #666666;
  display: block;
  margin-top: 6rpx;
}

.contact-right {
  display: flex;
  justify-content: center;
}

.contact-qrcode {
  width: 200rpx;
  height: 200rpx;
}

/* 10. 底部版权样式 */
.footer {
  padding: 30rpx;
  background-color: #333333;
  text-align: center;
}

.footer-text {
  font-size: 28rpx;
  color: #999999;
  display: block;
}

/* 为底部导航栏预留空间 */
.index-container {
  padding-bottom: 120rpx;
}
</style>
