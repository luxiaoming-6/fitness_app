<template>
  <view class="detail-container">
    <!-- 商品图片轮播 -->
    <view class="image-slider">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
        <swiper-item v-for="(image, index) in product.images" :key="index">
          <image :src="image" class="slider-image" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
    </view>

    <!-- 商品信息 -->
    <view class="product-info">
      <text class="product-title">{{ product.title }}</text>
      <text class="product-price">¥{{ product.price }}</text>
      <text class="product-sales">销量 {{ product.sales }}</text>
    </view>

    <!-- 商品详情 -->
    <view class="product-detail">
      <view class="detail-section">
        <text class="section-title">商品详情</text>
        <text class="detail-content">{{ product.description }}</text>
      </view>

      <view class="detail-section">
        <text class="section-title">规格参数</text>
        <view class="specs-list">
          <view class="spec-item" v-for="(spec, index) in product.specs" :key="index">
            <text class="spec-label">{{ spec.label }}:</text>
            <text class="spec-value">{{ spec.value }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部购买栏 -->
    <view class="buy-bar">
      <view class="buy-button" @click="addToCart">加入购物车</view>
      <view class="buy-button primary" @click="buyNow">立即购买</view>
    </view>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'GoodsDetail',
  setup() {
    // 商品数据
    const product = ref({
      id: 1,
      title: '多功能健身器材套装',
      price: 999,
      sales: 123,
      images: [
        '/static/tabbar/icons-05.png',
        '/static/tabbar/icons-05.png',
        '/static/tabbar/icons-05.png'
      ],
      description: '这是一款多功能健身器材套装，包含多种训练器材，适合家庭使用。质量优良，价格实惠，是您健身的好帮手。',
      specs: [
        { label: '品牌', value: 'BOOMTANG' },
        { label: '材质', value: '钢材' },
        { label: '尺寸', value: '120x60x180cm' },
        { label: '颜色', value: '黑色' }
      ]
    });

    // 加入购物车
    const addToCart = () => {
      uni.showToast({
        title: '已加入购物车',
        icon: 'success'
      });
      // 这里可以添加加入购物车的逻辑
    };

    // 立即购买
    const buyNow = () => {
      uni.showToast({
        title: '立即购买功能开发中',
        icon: 'none'
      });
      // 这里可以添加立即购买的逻辑
    };

    return {
      product,
      addToCart,
      buyNow
    };
  },
  // 页面加载时获取商品详情
  onLoad(options) {
    const productId = options.id;
    console.log('商品ID:', productId);
    // 这里可以添加从后端获取商品详情的逻辑
  }
};
</script>

<style scoped>
.detail-container {
  padding: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 图片轮播 */
.image-slider {
  width: 100%;
  height: 600rpx;
  background-color: #ffffff;
}

.slider-image {
  width: 100%;
  height: 100%;
}

/* 商品信息 */
.product-info {
  padding: 30rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.product-title {
  font-size: 36rpx;
  color: #333333;
  margin-bottom: 20rpx;
  display: block;
  line-height: 1.4;
}

.product-price {
  font-size: 48rpx;
  color: #ff6b35;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
}

.product-sales {
  font-size: 28rpx;
  color: #999999;
  display: block;
}

/* 商品详情 */
.product-detail {
  padding: 30rpx;
  background-color: #ffffff;
  margin-bottom: 120rpx;
}

.detail-section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  color: #333333;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.detail-content {
  font-size: 28rpx;
  color: #666666;
  line-height: 1.6;
  display: block;
}

.specs-list {
  border: 1rpx solid #e9e9e9;
  border-radius: 10rpx;
  overflow: hidden;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  border-bottom: 1rpx solid #e9e9e9;
}

.spec-item:last-child {
  border-bottom: none;
}

.spec-label {
  font-size: 28rpx;
  color: #666666;
}

.spec-value {
  font-size: 28rpx;
  color: #333333;
}

/* 底部购买栏 */
.buy-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.buy-button {
  flex: 1;
  padding: 25rpx;
  background-color: #f5f5f5;
  color: #333333;
  text-align: center;
  border-radius: 50rpx;
  margin: 0 10rpx;
  font-size: 32rpx;
  transition: all 0.3s ease;
}

.buy-button:active {
  transform: scale(0.98);
}

.buy-button.primary {
  background-color: #ff6b35;
  color: #ffffff;
}
</style>