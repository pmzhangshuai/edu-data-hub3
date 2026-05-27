import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { ChartData } from '../types';

interface ResourceDistributionChartProps {
  data: ChartData[];
}

const ResourceDistributionChart: React.FC<ResourceDistributionChartProps> = ({ data }) => {
  const option = {
    title: {
      text: '医疗资源分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '资源数量',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}: {c}',
        },
        data: data,
      },
    ],
  };

  return (
    <Card>
      <ReactECharts option={option} style={{ height: '400px' }} />
    </Card>
  );
};

export default ResourceDistributionChart;
