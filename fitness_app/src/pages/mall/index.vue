<template>
  <view class="mall-container">
    <!-- 顶部导航栏 -->
    <top-navbar></top-navbar>

    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <view class="search-input">
        <image src="/static/tabbar/icons-05.png" class="search-icon" mode="aspectFit"></image>
        <text class="search-placeholder">搜索商品</text>
      </view>
    </view>

    <!-- 分类导航 -->
    <view class="category-nav">
      <view 
        v-for="(category, index) in categories" 
        :key="index" 
        class="category-item"
        @click="selectCategory(index)"
      >
        <image :src="category.icon" class="category-icon" mode="aspectFit"></image>
        <text class="category-text">{{ category.name }}</text>
      </view>
    </view>

    <!-- 商品列表 -->
    <view class="goods-list">
      <view 
        v-for="(good, index) in goods" 
        :key="index" 
        class="goods-item"
        @click="goToDetail(good.id)"
      >
        <image :src="good.image" class="goods-image" mode="aspectFill"></image>
        <view class="goods-info">
          <text class="goods-title">{{ good.title }}</text>
          <text class="goods-price">¥{{ good.price }}</text>
          <view class="goods-sales">
            <text>销量{{ good.sales }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- 自定义底部导航栏 -->
  <tab-bar></tab-bar>
</template>

<script>
import { ref, onMounted } from 'vue';
import TabBar from '../../components/TabBar.vue';
import TopNavbar from '../../components/TopNavbar.vue';

export default {
  name: 'MallIndex',
  components: {
    TabBar,
    TopNavbar
  },
  setup() {
    // 分类数据
    const categories = ref([
      { id: 1, name: '器材', icon: '/static/tabbar/icons-05.png' },
      { id: 2, name: '服装', icon: '/static/tabbar/icons-05.png' },
      { id: 3, name: '配件', icon: '/static/tabbar/icons-05.png' },
      { id: 4, name: '营养', icon: '/static/tabbar/icons-05.png' },
      { id: 5, name: '更多', icon: '/static/tabbar/icons-05.png' }
    ]);

    // 商品数据
    const goods = ref([
      {
        id: 1,
        title: '越野课程',
        price: 68,
        sales: 123,
        image: '/static/b369.png'
      },
      {
        id: 2,
        title: '体能课程',
        price: 68,
        sales: 456,
        image: '/static/c03.png'
      },
      {
        id: 3,
        title: '体能课程',
        price: 68,
        sales: 789,
        image: '/static/c03.png'
      },
      {
        id: 4,
        title: '越野课程',
        price: 68,
        sales: 321,
        image: '/static/b369.png'
      }
    ]);

    // 选择分类
    const selectCategory = (index) => {
      console.log('选择分类:', categories.value[index].name);
      // 这里可以添加分类筛选逻辑
    };

    // 跳转到商品详情
    const goToDetail = (id) => {
      uni.navigateTo({
        url: `/pages/mall/detail?id=${id}`
      });
    };

    // 页面加载时获取数据
    onMounted(() => {
      // 这里可以添加从后端获取商品数据的逻辑
      console.log('商城首页加载');
    });

    return {
      categories,
      goods,
      selectCategory,
      goToDetail
    };
  }
};
</script>

<style scoped>
.mall-container {
  padding: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 顶部搜索栏 */
.search-bar {
  padding: 20rpx;
  background-color: #ffffff;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.search-input {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 40rpx;
  padding: 20rpx 30rpx;
}

.search-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 20rpx;
  opacity: 0.5;
}

.search-placeholder {
  font-size: 28rpx;
  color: #999999;
}

/* 分类导航 */
.category-nav {
  display: flex;
  justify-content: space-around;
  padding: 30rpx 0;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
}

.category-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
}

.category-text {
  font-size: 24rpx;
  color: #333333;
}

/* 商品列表 */
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20rpx;
  gap: 20rpx;
  padding-bottom: 120rpx;
}

.goods-item {
  width: calc(50% - 10rpx);
  background-color: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.goods-item:active {
  transform: scale(0.98);
}

.goods-image {
  width: 100%;
  height: 400rpx;
}

.goods-info {
  padding: 20rpx;
}

.goods-title {
  font-size: 32rpx;
  color: #333333;
  margin-bottom: 10rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.goods-price {
  font-size: 36rpx;
  color: #ff6b35;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
}

.goods-sales {
  font-size: 24rpx;
  color: #999999;
}
</style>