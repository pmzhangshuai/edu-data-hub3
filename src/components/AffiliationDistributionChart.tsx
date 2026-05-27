import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { ChartData } from '../types';

interface AffiliationDistributionChartProps {
  data: ChartData[];
}

const AffiliationDistributionChart: React.FC<AffiliationDistributionChartProps> = ({ data }) => {
  const option = {
    title: {
      text: '隶属关系分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
    },
    yAxis: {
      type: 'value',
      name: '医院数量',
    },
    series: [
      {
        name: '医院数量',
        type: 'bar',
        data: data.map(item => item.value),
        itemStyle: {
          color: '#1890ff',
        },
      },
    ],
  };

  return (
    <Card>
      <ReactECharts option={option} style={{ height: '400px' }} />
    </Card>
  );
};

export default AffiliationDistributionChart;
