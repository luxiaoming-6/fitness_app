<template>
  <div class="dashboard-container">
    <h2 class="page-title">仪表盘</h2>
    
    <!-- 数据统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card shadow="hover" class="stats-card">
          <div class="stats-content">
            <div class="stats-info">
              <div class="stats-value">{{ stats.totalUsers }}</div>
              <div class="stats-label">总用户数</div>
            </div>
            <div class="stats-icon users-icon">
              <el-icon size="32"><User /></el-icon>
            </div>
          </div>
          <div class="stats-footer">
            <span class="stats-trend positive">
              <el-icon><ArrowUp /></el-icon>
              {{ stats.userGrowth }}% 较上月
            </span>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card shadow="hover" class="stats-card">
          <div class="stats-content">
            <div class="stats-info">
              <div class="stats-value">{{ stats.activeUsers }}</div>
              <div class="stats-label">活跃用户</div>
            </div>
            <div class="stats-icon active-icon">
              <el-icon size="32"><UserFilled /></el-icon>
            </div>
          </div>
          <div class="stats-footer">
            <span class="stats-trend positive">
              <el-icon><ArrowUp /></el-icon>
              {{ stats.activeGrowth }}% 较上周
            </span>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card shadow="hover" class="stats-card">
          <div class="stats-content">
            <div class="stats-info">
              <div class="stats-value">{{ stats.totalOrders }}</div>
              <div class="stats-label">总订单数</div>
            </div>
            <div class="stats-icon orders-icon">
              <el-icon size="32"><Document /></el-icon>
            </div>
          </div>
          <div class="stats-footer">
            <span class="stats-trend negative">
              <el-icon><ArrowDown /></el-icon>
              {{ stats.orderGrowth }}% 较上月
            </span>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card shadow="hover" class="stats-card">
          <div class="stats-content">
            <div class="stats-info">
              <div class="stats-value">¥{{ stats.totalRevenue }}</div>
              <div class="stats-label">总营收</div>
            </div>
            <div class="stats-icon revenue-icon">
              <el-icon size="32"><Money /></el-icon>
            </div>
          </div>
          <div class="stats-footer">
            <span class="stats-trend positive">
              <el-icon><ArrowUp /></el-icon>
              {{ stats.revenueGrowth }}% 较上月
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 图表区域 -->
    <el-row :gutter="20" class="charts-row">
      <!-- 用户增长趋势图 -->
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="chart-header">
              <span>用户增长趋势</span>
              <el-select v-model="timeRange" size="small" @change="handleTimeRangeChange">
                <el-option label="近7天" value="7d" />
                <el-option label="近30天" value="30d" />
                <el-option label="近90天" value="90d" />
              </el-select>
            </div>
          </template>
          <div ref="userChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      
      <!-- 用户性别分布 -->
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="chart-header">
              <span>用户性别分布</span>
            </div>
          </template>
          <div ref="genderChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 底部数据区域 -->
    <el-row :gutter="20" class="bottom-row">
      <!-- 最新用户列表 -->
      <el-col :span="12">
        <el-card shadow="hover" class="data-card">
          <template #header>
            <div class="card-header">
              <span>最新注册用户</span>
              <el-link type="primary" :underline="false" @click="viewAllUsers">
                查看全部
              </el-link>
            </div>
          </template>
          <el-table :data="latestUsers" stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="gender" label="性别" width="80">
              <template #default="scope">
                <el-tag :type="scope.row.gender === 1 ? 'primary' : 'success'">
                  {{ scope.row.gender === 1 ? '男' : '女' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="注册时间" width="180">
              <template #default="scope">
                {{ formatDate(scope.row.createTime) }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      
      <!-- 系统信息 -->
      <el-col :span="12">
        <el-card shadow="hover" class="data-card">
          <template #header>
            <div class="card-header">
              <span>系统信息</span>
            </div>
          </template>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="系统版本">v1.0.0</el-descriptions-item>
            <el-descriptions-item label="运行环境">Production</el-descriptions-item>
            <el-descriptions-item label="服务器IP">192.168.1.100</el-descriptions-item>
            <el-descriptions-item label="运行时间">{{ systemUptime }}</el-descriptions-item>
            <el-descriptions-item label="CPU使用率">{{ systemInfo.cpuUsage }}%</el-descriptions-item>
            <el-descriptions-item label="内存使用率">{{ systemInfo.memoryUsage }}%</el-descriptions-item>
            <el-descriptions-item label="磁盘使用率">{{ systemInfo.diskUsage }}%</el-descriptions-item>
            <el-descriptions-item label="在线状态">
              <el-tag type="success">正常</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';

const router = useRouter();

// 数据统计
const stats = reactive({
  totalUsers: 1256,
  activeUsers: 456,
  totalOrders: 2341,
  totalRevenue: 125600,
  userGrowth: 12.5,
  activeGrowth: 8.3,
  orderGrowth: -2.1,
  revenueGrowth: 15.7
});

// 时间范围
const timeRange = ref('7d');

// 图表引用
const userChartRef = ref(null);
const genderChartRef = ref(null);

// 图表实例
let userChart = null;
let genderChart = null;

// 最新用户列表
const latestUsers = ref([
  { id: 1, name: '张三', phone: '138****1234', gender: 1, createTime: '2026-01-08 10:30:25' },
  { id: 2, name: '李四', phone: '139****5678', gender: 2, createTime: '2026-01-08 09:15:42' },
  { id: 3, name: '王五', phone: '137****9012', gender: 1, createTime: '2026-01-07 16:45:18' },
  { id: 4, name: '赵六', phone: '136****3456', gender: 2, createTime: '2026-01-07 14:20:33' },
  { id: 5, name: '孙七', phone: '135****7890', gender: 1, createTime: '2026-01-06 11:50:05' }
]);

// 系统信息
const systemInfo = reactive({
  cpuUsage: 35.2,
  memoryUsage: 68.5,
  diskUsage: 42.8
});

// 系统运行时间
const systemUptime = ref('12天 8小时 35分钟');

// 初始化用户增长趋势图
const initUserChart = () => {
  if (!userChartRef.value) return;
  
  userChart = echarts.init(userChartRef.value);
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['新增用户', '活跃用户']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月2日', '1月3日', '1月4日', '1月5日', '1月6日', '1月7日', '1月8日'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '新增用户',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: '{value} 人'
        }
      },
      {
        type: 'value',
        name: '活跃用户',
        min: 0,
        max: 200,
        interval: 40,
        axisLabel: {
          formatter: '{value} 人'
        }
      }
    ],
    series: [
      {
        name: '新增用户',
        type: 'bar',
        data: [23, 45, 32, 56, 42, 67, 54],
        itemStyle: {
          color: '#409eff'
        }
      },
      {
        name: '活跃用户',
        type: 'line',
        yAxisIndex: 1,
        data: [89, 102, 95, 120, 105, 135, 128],
        itemStyle: {
          color: '#67c23a'
        },
        smooth: true
      }
    ]
  };
  
  userChart.setOption(option);
};

// 初始化用户性别分布图
const initGenderChart = () => {
  if (!genderChartRef.value) return;
  
  genderChart = echarts.init(genderChartRef.value);
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['男', '女', '未知']
    },
    series: [
      {
        name: '性别分布',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 650, name: '男', itemStyle: { color: '#409eff' } },
          { value: 480, name: '女', itemStyle: { color: '#f56c6c' } },
          { value: 126, name: '未知', itemStyle: { color: '#909399' } }
        ]
      }
    ]
  };
  
  genderChart.setOption(option);
};

// 处理时间范围变化
const handleTimeRangeChange = (value) => {
  console.log('Time range changed to:', value);
  // 这里可以根据时间范围重新加载数据
};

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString();
};

// 查看全部用户
const viewAllUsers = () => {
  router.push('/user/list');
};

// 处理窗口大小变化
const handleResize = () => {
  userChart?.resize();
  genderChart?.resize();
};

// 组件挂载时初始化
onMounted(() => {
  initUserChart();
  initGenderChart();
  window.addEventListener('resize', handleResize);
});

// 组件卸载时清理
onUnmounted(() => {
  userChart?.dispose();
  genderChart?.dispose();
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.dashboard-container {
  padding: 0;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 20px;
}

.stats-row {
  margin-bottom: 20px;
}

.stats-card {
  transition: all 0.3s;
  height: 100%;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stats-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-info {
  flex: 1;
}

.stats-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}

.stats-label {
  font-size: 14px;
  color: #909399;
}

.stats-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.users-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.active-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.orders-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.revenue-icon {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stats-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ebedf0;
  display: flex;
  justify-content: flex-end;
}

.stats-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
}

.stats-trend.positive {
  color: #67c23a;
}

.stats-trend.negative {
  color: #f56c6c;
}

.charts-row {
  margin-bottom: 20px;
}

.chart-card {
  height: 100%;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  width: 100%;
  height: 300px;
}

.bottom-row {
  margin-bottom: 0;
}

.data-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .stats-row :deep(.el-col),
  .charts-row :deep(.el-col),
  .bottom-row :deep(.el-col) {
    margin-bottom: 20px;
  }
  
  .stats-row :deep(.el-col),
  .charts-row :deep(.el-col),
  .bottom-row :deep(.el-col) {
    flex: 0 0 100%;
    max-width: 100%;
  }
  
  .chart-container {
    height: 250px;
  }
}
</style>
